import { extname } from 'path'
import { existsSync } from 'fs'
import { diskStorage } from 'multer'
import { HttpException, HttpStatus } from '@nestjs/common'
import * as fs from 'fs'

export const multerConfig = {
  dest: "./uploads"

}

export const multerOptions = {
  fileFilter: (req: any, file: any, cb: any) => {
    if ((file.mimetype as string).match(/\/(jpg|jpeg|png)$/) != null) {
      cb(null, true)
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname as string)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      )
    }
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest
      console.log(uploadPath)

      if (!existsSync(uploadPath)) {
        fs.mkdir(uploadPath, { recursive: false }, () => { })
      }
      cb(null, uploadPath)
    },

    filename: (req: any, file: any, cb: any) => {
      cb(null, file.originalname)
    }
  })
}
