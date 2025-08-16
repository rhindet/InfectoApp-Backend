// src/nivel0/nivel0.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nivel3Service } from './nivel3.service';
import { Nivel3Controller } from './nivel3.controller';
import { Nivel3 ,Nivel3Schema} from './nivel3.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel3.name, schema: Nivel3Schema, collection: 'nivel3' },
    ]),
  ],
  controllers: [Nivel3Controller],
  providers: [Nivel3Service],
  exports: [MongooseModule], 
})
export class Nivel3Module {}