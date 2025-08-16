import { Injectable, NotFoundException,Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Articulo, ArticuloSchema } from './schemas/article.schema';
import { Nivel0 } from '../nivel0/nivel0.schema';

@Injectable()
export class ArticlesService {
      private readonly logger = new Logger(ArticlesService.name);
  
      constructor(@InjectModel(Articulo.name) private articuloModel: Model<Articulo>  ) {}

  // Traer TODOS los documentos
 async findAll(): Promise<Articulo[]> {
    return this.articuloModel.find().exec();
  }

  // Traer uno por id
  async findOne(id: string){
        const ref = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
    
    const ref_tabla_nivel0 = { ref_tabla_nivel0: ref };
    const ref_tabla_nivel1 = { ref_tabla_nivel1: ref };
    const ref_tabla_nivel2 = { ref_tabla_nivel2: ref };
    const ref_tabla_nivel3 = { ref_tabla_nivel3: ref };


    const doc = await this.articuloModel.find(ref_tabla_nivel3).lean();
    if (!doc) throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    return doc;
  }
}  