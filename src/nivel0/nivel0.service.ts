// src/nivel0/nivel0.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nivel0 } from './nivel0.schema';
import { Nivel0Document } from './nivel0.schema';

@Injectable()
export class Nivel0Service {
  constructor(
    @InjectModel(Nivel0.name) private readonly nivel0Model: Model<Nivel0Document>,
  ) {}

  findAll() {
    return this.nivel0Model.find().lean().exec();
  }

}