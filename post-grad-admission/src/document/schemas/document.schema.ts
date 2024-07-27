import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DocumentEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  studentId: Types.ObjectId;

  @Prop()
  aadharPhoto: string;

  @Prop()
  studentPhoto: string;

  @Prop()
  signature: string;

  @Prop()
  graduationCertificate: string;

  @Prop()
  twelthCertificate: string;

  @Prop()
  tenthCertificate: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
//coment
