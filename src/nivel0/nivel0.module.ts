// src/nivel0/nivel0.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nivel0Service } from './nivel0.service';
import { Nivel0Controller } from './nivel0.controller';
import { Nivel0 ,Nivel0Schema} from './nivel0.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel0.name, schema: Nivel0Schema, collection: 'nivel0' },
    ]),
  ],
  controllers: [Nivel0Controller],
  providers: [Nivel0Service],
  exports: [MongooseModule],
})
export class Nivel0Module {}