import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Articulos' })
export class Articulo  {
  @Prop({ required: true })
  tema: string;

  @Prop({ type: [String], default: [] })
  subtemas: string[];

  @Prop({ type: [String], default: [] })
  contenidos: string[];

  @Prop({ type: Date, default: Date.now })
  fecha_creacion: Date;

  @Prop({ type: Date })
  fecha_modificacion: Date;

  @Prop({ type: Boolean, default: false })
  sin_categoria: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Nivel1', default: null })
  ref_tabla_nivel1: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Nivel2', default: null })
  ref_tabla_nivel2: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Nivel3', default: null })
  ref_tabla_nivel3: Types.ObjectId | null;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);