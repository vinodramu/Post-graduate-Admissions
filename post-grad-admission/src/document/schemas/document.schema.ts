import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Document extends MongooseDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student' })
  studentId: MongooseSchema.Types.ObjectId;

  @Prop()
  aadhar_photo: string;

  @Prop()
  student_photo: string;

  @Prop()
  signature: string;

  @Prop()
  degree_certificate: string;

  @Prop()
  intermediate_certificate: string;

  @Prop()
  tenth_certificate: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
