// src/nivel0/nivel0.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nivel1, Nivel1Document } from 'src/nivel1/nivel1.schema';
import { Nivel2, Nivel2Document } from 'src/nivel2/nivel2.schema';
import { Nivel3, Nivel3Document } from 'src/nivel3/nivel3.schema';
import { Nivel0, Nivel0Document } from 'src/nivel0/nivel0.schema';
import { Articulo, ArticleDocument } from 'src/articles/schemas/article.schema';
import { throwError } from 'rxjs';

@Injectable()
export class ScrapingNivelesService {
  constructor(
    @InjectModel(Articulo.name) private readonly articulosModel: Model<ArticleDocument>,
    @InjectModel(Nivel0.name) private readonly nivel0Model: Model<Nivel0Document>,
    @InjectModel(Nivel1.name) private readonly nivel1Model: Model<Nivel1Document>,
    @InjectModel(Nivel2.name) private readonly nivel2Model: Model<Nivel2Document>,
    @InjectModel(Nivel3.name) private readonly nivel3Model: Model<Nivel3Document>,
  ) { }

  async findAll(id: string, level: number) {
    const ref = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;

    const filter1 = { ref_nivel0: ref };
    const filter2 = { ref_tabla1: ref };
    const filter3 = { ref_nivel2: ref };

    console.log(level)

    // Buscar en Nivel1
    if (level === 1) {
      const res1 = await this.nivel1Model.find(filter1).lean().exec();
      if (res1.length > 0) {
        return res1;
      }
      // Buscar en Nivel2 si Nivel1 está vacío
      const res2 = await this.nivel2Model.find(filter2).lean().exec();
      if (res2.length > 0) {
        return res2;
      }

      // Buscar en Nivel3 si Nivel2 está vacío
      const res3 = await this.nivel3Model.find(filter3).lean().exec();
      if (res3.length > 0) {
        return res3;
      }
      return [];
    }

    if (level === 2) {

      // Buscar en Nivel2 si Nivel1 está vacío
      const res2 = await this.nivel2Model.find(filter2).lean().exec();
      console.log(res2)
      if (res2.length > 0) {
        return res2;
      }

      // Buscar en Nivel3 si Nivel2 está vacío
      const res3 = await this.nivel3Model.find(filter3).lean().exec();
      console.log(res3)

      if (res3.length > 0) {
        return res3;
      }
      return [];
    }

    if (level === 3) {
      // Buscar en Nivel3 si Nivel2 está vacío
      const res3 = await this.nivel3Model.find(filter3).lean().exec();
      console.log(res3)
      console.log("nada")


      if (res3.length > 0) {
        return res3;
      }
      return [];
    }




    // Si todos están vacíos → devolver array vacío
    return [];
  }


  async findAllTemas() {
    const [nivel0, nivel1, nivel2, nivel3] = await Promise.all([
      this.nivel0Model.find().select('nombre').lean().exec(),
      this.nivel1Model.find().select('nombre').lean().exec(),
      this.nivel2Model.find().select('nombre').lean().exec(),
      this.nivel3Model.find().select('nombre').lean().exec(),
    ]);

    // Un array con 4 arrays adentro
    return [nivel0, nivel1, nivel2, nivel3];
  }


  async createTema(dto) {
    const now = new Date();

    // Buscar en Nivel0
    if (dto.level === 0) {
      const res = await this.nivel0Model.create({
        nombre: dto.name,
        fecha_creacion: now,
        fecha_modificacion: now,

      })
      return res;
    }


    if (dto.level === 1) {
      const res = await this.nivel1Model.create({
        nombre: dto.name,
        fecha_creacion: now,
        fecha_modificacion: now,
        ref_nivel0: new Types.ObjectId(dto.parentId)
      })
      return res;
    }


    if (dto.level === 2) {
      const res = await this.nivel2Model.create({
        nombre: dto.name,
        fecha_creacion: now,
        fecha_modificacion: now,
        ref_tabla1:new Types.ObjectId(dto.parentId)
      })
      return res;
    }

    if (dto.level === 3) {
      const res = await this.nivel3Model.create({
        nombre: dto.name,
        fecha_creacion: now,
        fecha_modificacion: now,
        ref_nivel2:new Types.ObjectId(dto.parentId)

      })
      return res;
    }


    return "Error"
  }



  async createArticle(dto: Articulo) {

    return this.articulosModel.create(dto);
  }

async updateArticle(id: string, dto: Articulo) {
  const updated = await this.articulosModel.findByIdAndUpdate(
    id,
    {
      ...dto,
      fecha_modificacion: new Date(), 
    },
    { new: true, runValidators: true }
  );

  if (!updated) throw new NotFoundException('Article not found');

  return updated;
}
  async updateTheme(id: string, dto: { level: number; name: string }) {
    const now = new Date();

    console.log(id)
    console.log(dto)


    if (dto.level === 0) {
      const updated = await this.nivel0Model.findByIdAndUpdate(
        id,
        {
          nombre: dto.name,
          fecha_modificacion: now,
        },
        { new: true, runValidators: true },
      ).lean();

      return updated;
    }

    if (dto.level === 1) {
      const updated = await this.nivel1Model.findByIdAndUpdate(
        id,
        {
          nombre: dto.name,
          fecha_modificacion: now,
        },
        { new: true, runValidators: true },
      ).lean();

      return updated;
    }

    if (dto.level === 2) {
      const updated = await this.nivel2Model.findByIdAndUpdate(
        id,
        {
          nombre: dto.name,
          fecha_modificacion: now,
        },
        { new: true, runValidators: true },
      ).lean();

      return updated;
    }

    if (dto.level === 3) {
      const updated = await this.nivel3Model.findByIdAndUpdate(
        id,
        {
          nombre: dto.name,
          fecha_modificacion: now,
        },
        { new: true, runValidators: true },
      ).lean();

      return updated;
    }

    console.log("No se encontro ningun nivel")
    return "No se encontro ningun nivel"



    // luego manejas level 1, 2, etc...
  }



}