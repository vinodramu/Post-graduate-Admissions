import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuperAdminDocument = SuperAdmin & Document;

@Schema({ collection: 'superadmin' })
export class SuperAdmin {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    role: string;

    @Prop()
    lastLogin: Date;

    @Prop()
    permissions: string[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
