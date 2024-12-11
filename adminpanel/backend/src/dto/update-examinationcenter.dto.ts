import { PartialType } from '@nestjs/mapped-types';
import { CreateExaminationCenterDto } from './create-examination-center.dto';

export class UpdateExaminationCenterDto extends PartialType(CreateExaminationCenterDto) { }
