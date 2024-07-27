// address.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './schemas/address.schema';
import { CreateAddressDto } from './schemas/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  async getAddressByStudentId(studentId: string): Promise<Address> {
    const address = await this.addressModel.findOne({ studentId }).exec();
    if (!address) {
      throw new NotFoundException(
        `Address not found for student ID ${studentId}`
      );
    }
    return address;
  }
}
