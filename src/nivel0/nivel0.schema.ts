import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Nivel0Document = Nivel0 & Document;

@Schema({ collection: 'nivel0' }) // 👈 Cambia el nombre de la colección si es distinto
export class Nivel0 {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Date, default: null })
  fecha_creacion: Date | null;

  @Prop({ type: Date, default: null })
  fecha_modificacion: Date | null;
}

export const Nivel0Schema = SchemaFactory.createForClass(Nivel0);