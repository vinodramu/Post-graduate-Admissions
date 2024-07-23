// src/examination/examination.interface.ts
import { Document } from 'mongoose';

export interface Examination extends Document {
  name: string;
  age: number;
  aadharno: string;
  dob: Date;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  nationality: string;
  caste: string;
  hallticketno: string;
  degreecertificate: string;
  yop: number;
  cgpaPer: string;
  courses: string;
  city1: string;
  city2: string;
  city3: string;
  photo: string;
  signature: string;
  fees: number;
  paymentStatus: string;
}
