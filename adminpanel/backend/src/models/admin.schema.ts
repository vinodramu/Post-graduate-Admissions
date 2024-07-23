import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    roles: string[];

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);
