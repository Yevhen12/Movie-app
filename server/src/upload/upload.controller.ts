import { Controller, Post, Body, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadType } from 'src/contstants/upload';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadObject(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadObject(file.originalname, file.buffer, UploadType.MOVIE_VIDEO)
  }

  @Delete()
  deleteObject(@Body() { filename, folder }) {
    return this.uploadService.deleteObject(filename, folder)
  }

  @Delete('/all')
  async deleteAllMovies(@Body() { folder }: { folder: string }) {
    console.log('folder', folder)
    return this.uploadService.deleteAllObjectsFromSpecifivFolder(UploadType.MOVIE_VIDEO)
  }
}
