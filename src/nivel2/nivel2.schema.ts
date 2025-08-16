import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Nivel2Document = Nivel2 & Document;

@Schema({ collection: 'nivel2' }) // 👈 Cambia el nombre de la colección si es distinto
export class Nivel2 {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Date, default: null })
  fecha_creacion: Date | null;

  @Prop({ type: Date, default: null })
  fecha_modificacion: Date | null;
}

export const Nivel2Schema = SchemaFactory.createForClass(Nivel2);