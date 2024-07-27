import { Types } from 'mongoose';
export class CreateAddressDto {
  studentId: Types.ObjectId;
  correspondenseAddress: string;
  permanentAddress: string;
  state: string;
  city: string;
  pincode: string;
  country: string;
}
