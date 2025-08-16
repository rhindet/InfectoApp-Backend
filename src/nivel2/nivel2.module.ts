// src/nivel0/nivel0.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nivel2Service } from './nivel2.service';
import { Nivel2Controller } from './nivel2.controller';
import { Nivel2 ,Nivel2Schema} from './nivel2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel2.name, schema: Nivel2Schema, collection: 'nivel2' },
    ]),
  ],
  controllers: [Nivel2Controller],
  providers: [Nivel2Service],
  exports: [MongooseModule], 
})
export class Nivel2Module {}