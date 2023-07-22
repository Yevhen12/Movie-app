import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    const detailedInfo: CreateMovieDto = JSON.parse(body.detailedInfo)
    return this.movieService.createMovie(detailedInfo, files[0], files[1]);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateById(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.removeById(id);
  }

  @Delete()
  removeAll() {
    return this.movieService.removeAll();
  }
}
