import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Articulo } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(@InjectModel(Articulo.name) private articuloModel: Model<Articulo>) {}

  async findAll(): Promise<Articulo[]> {
    return this.articuloModel.find().lean().exec();
  }

  async deleteOne(id: string) {
    const res = this.articuloModel.findByIdAndDelete(id).exec();
    return res;
  }

  async findOne(id: string) {
    const ref = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;

    const doc0 = await this.articuloModel.find({ ref_tabla_nivel0: ref }).lean();
    if (doc0.length > 0) return doc0;

    const doc1 = await this.articuloModel.find({ ref_tabla_nivel1: ref }).lean();
    if (doc1.length > 0) return doc1;

    const doc2 = await this.articuloModel.find({ ref_tabla_nivel2: ref }).lean();
    if (doc2.length > 0) return doc2;

    const doc3 = await this.articuloModel.find({ ref_tabla_nivel3: ref }).lean();
    if (doc3.length > 0) return doc3;

    return [];
  }

  async findById(id: string) {
    const ref = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
    const doc = await this.articuloModel.findOne({ _id: ref }).lean();
    if (!doc) throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    return doc;
  }

  // ============================
  // 🔎 SOLO contenidos - Regex
  // ============================
  private escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Busca SOLO en `contenidos` (array de strings)
   * AND entre palabras (todas deben aparecer en algún elemento del array).
   * Insensible a mayúsculas/minúsculas.
   */
  async searchInContenidosRegex(q: string, page = 1, limit = 20) {
    q = (q ?? '').trim();
    if (!q) throw new BadRequestException('El parámetro q es requerido');

    const _page = Math.max(1, Number(page) || 1);
    const _limit = Math.min(100, Math.max(1, Number(limit) || 20));
    const skip = (_page - 1) * _limit;

    const tokens = q.split(/\s+/).filter(Boolean);
    // AND entre tokens
    const andFilters = tokens.map((t) => ({
      contenidos: { $regex: this.escapeRegExp(t), $options: 'i' },
    }));
    const filter = { $and: andFilters };

    const [items, total] = await Promise.all([
      this.articuloModel
        .find(filter, { tema: 1, contenidos: 1 }) // proyección mínima
        .skip(skip)
        .limit(_limit)
        .lean()
        .exec(),
      this.articuloModel.countDocuments(filter).exec(),
    ]);

    return { page: _page, limit: _limit, total, items };
  }

  // =========================================
  // 🔎 SOLO contenidos - Índice de Texto (op.)
  // =========================================
  /**
   * Si creas un índice de texto SOLO en `contenidos`, usa este método
   * para mejor performance + orden por relevancia.
   *
   * Índice sugerido (en el schema):
   *   ArticuloSchema.index({ contenidos: 'text' }, { name: 'ArticuloContenidosTextIndex' });
   */
  async searchInContenidosText(q: string, page = 1, limit = 20) {
    q = (q ?? '').trim();
    if (!q) throw new BadRequestException('El parámetro q es requerido');

    const _page = Math.max(1, Number(page) || 1);
    const _limit = Math.min(100, Math.max(1, Number(limit) || 20));
    const skip = (_page - 1) * _limit;

    const query = { $text: { $search: q } } as any;
    const projection = { score: { $meta: 'textScore' }, tema: 1, contenidos: 1 };

    const [items, total] = await Promise.all([
      this.articuloModel
        .find(query, projection)
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(_limit)
        .lean()
        .exec(),
      this.articuloModel.countDocuments(query).exec(),
    ]);

    return { page: _page, limit: _limit, total, items };
  }
}