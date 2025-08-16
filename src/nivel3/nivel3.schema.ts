import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Nivel3Document = Nivel3 & Document;

@Schema({ collection: 'nivel3' }) // 👈 Cambia el nombre de la colección si es distinto
export class Nivel3 {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Date, default: null })
  fecha_creacion: Date | null;

  @Prop({ type: Date, default: null })
  fecha_modificacion: Date | null;
}

export const Nivel3Schema = SchemaFactory.createForClass(Nivel3);