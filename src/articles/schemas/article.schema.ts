import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Articulo & Document;

// función helper para todos los refs
const toObjectIdOrNull = (v: any): Types.ObjectId | null => {
  if (v == null) return null;                    // null / undefined → null
  if (v instanceof Types.ObjectId) return v;     // ya es ObjectId
  const s = String(v).trim();
  if (s === '') return null;                     // "" → null
  if (!/^[0-9a-fA-F]{24}$/.test(s)) return null; // si no es un ObjectId válido → null
  return new Types.ObjectId(s);
};

@Schema({
  collection: 'Articulos',
  timestamps: {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  },
})
export class Articulo {
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

  @Prop({
    type: Types.ObjectId,
    ref: 'Nivel0',
    default: null,
    set: toObjectIdOrNull,
  })
  ref_tabla_nivel0: Types.ObjectId | null;

  @Prop({
    type: Types.ObjectId,
    ref: 'Nivel1',
    default: null,
    set: toObjectIdOrNull,
  })
  ref_tabla_nivel1: Types.ObjectId | null;

  @Prop({
    type: Types.ObjectId,
    ref: 'Nivel2',
    default: null,
    set: toObjectIdOrNull,
  })
  ref_tabla_nivel2: Types.ObjectId | null;

  @Prop({
    type: Types.ObjectId,
    ref: 'Nivel3',
    default: null,
    set: toObjectIdOrNull,
  })
  ref_tabla_nivel3: Types.ObjectId | null;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo); 