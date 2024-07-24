import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Document extends MongooseDocument {
  @Prop({ required: true, unique: true })
  document_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student', required: true })
  student_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  aadhar_no: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  signature: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
