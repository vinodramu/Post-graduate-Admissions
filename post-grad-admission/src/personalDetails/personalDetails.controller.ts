// personal-details.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PersonalDetailsService } from './personalDetails.service';
import { CreatePersonalDetailsDto } from './schemas/create-personal-details.dto';
import { PersonalDetails } from './schemas/personalDetails.schema';


@Controller('personalDetails')
export class PersonalDetailsController {
  constructor(private readonly personalDetailsService: PersonalDetailsService) {}

  @Post()
  async create(@Body() createPersonalDetailsDto: CreatePersonalDetailsDto): Promise<PersonalDetails> {
    return this.personalDetailsService.create(createPersonalDetailsDto);
  }
}
