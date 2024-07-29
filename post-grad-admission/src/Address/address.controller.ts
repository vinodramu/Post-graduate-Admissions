// address.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';

import { Address } from './schemas/address.schema';
import { CreateAddressDto } from './schemas/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get('/:studentId')
  async getAddressByStudentId(
    @Param('studentId') studentId: string
  ): Promise<Address> {
    try {
      const address =
        await this.addressService.getAddressByStudentId(studentId);
      return address;
    } catch (error) {
      console.log(error);
    }
  }
}
