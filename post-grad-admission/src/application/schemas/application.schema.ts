import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema} from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';

@Schema()
export class Application extends Document {
  // @Prop({ required: true, unique: true })
  // application_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student' })
  studentId: MongooseSchema.Types.ObjectId;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  // course_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true ,default: 'pending'})
  status: string;

  @Prop({ type: String, required: true})
  city_preference1: string;

  @Prop({ type: String, required: true })
  city_preference2: string;

  @Prop({ type: String, required: true })
  colleges: string;

  @Prop({ type:String,required: true })
  course_name: string;

  @Prop({ type:Number })
  fee: number;

  @Prop()
  exam_center_allotment: string;

  @Prop()
  room_allotment: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
