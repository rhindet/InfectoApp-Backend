// src/nivel0/nivel0.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nivel1Service } from './nivel1.service';
import { Nivel1Controller } from './nivel1.controller';
import { Nivel1 ,Nivel1Schema} from './nivel1.schema';
import { Nivel2,Nivel2Schema } from 'src/nivel2/nivel2.schema';
import { Nivel2Service } from 'src/nivel2/nivel2.service';
import { Nivel2Controller } from 'src/nivel2/nivel2.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel1.name, schema: Nivel1Schema, collection: 'nivel1' },
            { name: Nivel2.name, schema: Nivel2Schema, collection: 'nivel2' },

    ]),  
  ],
  controllers: [Nivel1Controller,Nivel2Controller],
  providers: [Nivel1Service,Nivel2Service],
  exports: [MongooseModule],
})
export class Nivel1Module {}