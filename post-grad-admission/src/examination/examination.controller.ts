// // src/examination/examination.controller.ts
// import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
// import { ExaminationService } from './examination.service';
// import { CreateExaminationDto } from '../dto/create-examination.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Examination } from '../examination/examination.interface';
// import { multerOptions } from 'src/file-upload/upload';

// @Controller('examination')
// export class ExaminationController {
//   constructor(
//     private readonly examinationService: ExaminationService,
//     @InjectModel('Examination') private readonly examModel: Model<Examination>,
//   ) {}

//   @Post('register')
//   async register(@Body() createExaminationDto: CreateExaminationDto,
//   @UploadedFile() file: Express.Multer.File) {
//     const examination = await this.examinationService.createExamination(createExaminationDto);
//     await this.examinationService.updatePhoto(examination.id, file.filename);
//     const order = await this.examinationService.createOrder(examination.fees);

//     return {
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       name: createExaminationDto.name,
//       email: createExaminationDto.email,
//       phone: createExaminationDto.phone,
//     };
//   }

//   @Post('/upload-photo')
//   @UseInterceptors(FileInterceptor('photo', multerOptions))
//   public async uploadphoto (
//     @Body('id') id: string,
//     @UploadedFile() file: Express.Multer.File): Promise<Express.Multer.File> {
//         try {
//             if (!file) {
//               throw new BadRequestException('No file uploaded');
//             }
      
//             const photofilePath = path.join('uploads',file.filename);
      
//             // Update examination details with file path
//             const result = await this.examModel.findByIdAndUpdate(
//               id,
//               { photo: photofilePath },
//               { new: true },
//             );
      
//             if (!result) {
//               throw new BadRequestException('Examination not found');
//             }
      
//             return file;
//     } catch (e) {
//       throw new HttpException(
//         'Error in <FileControllers.upload>',
//         HttpStatus.INTERNAL_SERVER_ERROR
//       )
//     }
//   }

//   @Post('/upload-sign')
//   @UseInterceptors(FileInterceptor('sign', multerOptions))
//   public async uploadsign (
//     @Body('id') id: string,
//     @UploadedFile() file: Express.Multer.File): Promise<Express.Multer.File> {
//         try {
//             if (!file) {
//               throw new BadRequestException('No file uploaded');
//             }
      
//             const signfilePath = path.join('uploads',file.filename);
      
//             // Update examination details with file path
//             const result = await this.examModel.findByIdAndUpdate(
//               id,
//               { signature: signfilePath },
//               { new: true },
//             );
      
//             if (!result) {
//               throw new BadRequestException('Examination not found');
//             }
      
//             return file;
//     } catch (e) {
//       throw new HttpException(
//         'Error in <FileControllers.upload>',
//         HttpStatus.INTERNAL_SERVER_ERROR
//       )
//     }
//   }

// }
