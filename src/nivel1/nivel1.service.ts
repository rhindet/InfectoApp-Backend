// src/nivel0/nivel0.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,Types} from 'mongoose';
import { Nivel1 } from './nivel1.schema';
import { Nivel1Document } from './nivel1.schema';
import { Nivel2 } from 'src/nivel2/nivel2.schema';
import { Nivel2Document } from 'src/nivel2/nivel2.schema';


@Injectable()
export class Nivel1Service {
  constructor(
    @InjectModel(Nivel1.name) private readonly nivel1Model: Model<Nivel1Document>,
  ) {}

  async findAll () {

    const res = await this.nivel1Model.find().lean().exec();
    
    return  res;     
  }

}