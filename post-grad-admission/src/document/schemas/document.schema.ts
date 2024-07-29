import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DocumentEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  studentId: Types.ObjectId;

  @Prop({ required: true })
  aadharPhoto: string;

  @Prop({ required: true })
  studentPhoto: string;

  @Prop({ required: true })
  signature: string;

  @Prop({ required: true })
  graduationCertificate: string;

  @Prop({ required: true })
  twelthCertificate: string;

  @Prop({ required: true })
  tenthCertificate: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
