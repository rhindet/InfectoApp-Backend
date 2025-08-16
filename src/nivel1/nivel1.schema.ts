import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
 
export type Nivel1Document = Nivel1 & Document;

@Schema({ collection: 'nivel1' }) // 👈 Cambia el nombre de la colección si es distinto
export class Nivel1 {
  @Prop({ required: true })
  nombre: string;

  // RELACIÓN hacia nivel0 (elige un nombre y úsalo en toda la app)
  @Prop({ type: Types.ObjectId, ref: 'Nivel0', index: true })
  ref_tabla_nivel0: Types.ObjectId;

  @Prop({ type: Date, default: null })
  fecha_creacion: Date | null;

  @Prop({ type: Date, default: null })
  fecha_modificacion: Date | null;
}

export const Nivel1Schema = SchemaFactory.createForClass(Nivel1);