// src/nivel0/nivel0.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,Types} from 'mongoose';
import { Nivel2 } from './nivel2.schema';
import { Nivel2Document } from './nivel2.schema';

@Injectable()
export class Nivel2Service {
  constructor(
    @InjectModel(Nivel2.name) private readonly nivel2Model: Model<Nivel2Document>,
  ) {}

  findAll() {
    return this.nivel2Model.find().lean().exec();
  }

  findAllFiltered(id:string) {
    const ref = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
    const filter2 = {ref_tabla1: ref };
    return this.nivel2Model.find().lean().exec();
  }
  

}