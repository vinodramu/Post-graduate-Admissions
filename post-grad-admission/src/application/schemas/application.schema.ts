import { IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Application extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  courseId: string;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

@Schema()
export class ApplicationsDetails extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  studentId: Types.ObjectId;

  @Prop({ type: [ApplicationSchema], required: true })
  application: Application[];
}

export const ApplicationsDetailsSchema =
  SchemaFactory.createForClass(ApplicationsDetails);
