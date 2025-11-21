import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document ,Types } from 'mongoose';

export type Nivel2Document = Nivel2 & Document;

@Schema({ collection: 'nivel2' }) // 👈 Cambia el nombre de la colección si es distinto
export class Nivel2 {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Date, default: null })
  fecha_creacion: Date | null;

  @Prop({ type: Date, default: null })
  fecha_modificacion: Date | null;

    // RELACIÓN hacia nivel0 (elige un nombre y úsalo en toda la app)
      @Prop({ type: Types.ObjectId, ref: 'Nivel1', index: true })
      ref_tabla1: Types.ObjectId;
  
}

export const Nivel2Schema = SchemaFactory.createForClass(Nivel2);