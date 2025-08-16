// src/nivel0/nivel0.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nivel3 } from './nivel3.schema';
import { Nivel3Document } from './nivel3.schema';

@Injectable()
export class Nivel3Service {
  constructor(
    @InjectModel(Nivel3.name) private readonly nivel3Model: Model<Nivel3Document>,
  ) {}

  findAll() { 
    return this.nivel3Model.find().lean().exec();
  }

}