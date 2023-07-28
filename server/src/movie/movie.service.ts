import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UploadService } from 'src/upload/upload.service';
import { UploadType } from 'src/contstants/upload';
import { generateAwsUrl } from 'src/utils/generateAwsUrl';
import { isValidObjectId } from 'src/utils/isValidObjectId';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private readonly uploadService: UploadService
  ) { }

  async createMovie(createMovieDto: CreateMovieDto, movie: Express.Multer.File, photo: Express.Multer.File) {
    const { status, message } = await this.isMovieExist(createMovieDto.name)
    if(status === HttpStatus.OK) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }
    const uploadMovieResponse = await this.uploadService.uploadObject(movie.originalname, movie.buffer, UploadType.MOVIE_VIDEO)
    if (uploadMovieResponse.status !== 200) {
      throw new HttpException('Something gone wrong with video upload :(', HttpStatus.BAD_REQUEST);
    }
    const newVideoAwsUrl = generateAwsUrl(UploadType.MOVIE_VIDEO, movie.originalname)

    const uploadPhotoResponse = await this.uploadService.uploadObject(photo.originalname, photo.buffer, UploadType.MOVIE_PREVIEW)
    if (uploadPhotoResponse.status !== 200) {
      throw new HttpException('Something gone wrong with photo upload :(', HttpStatus.BAD_REQUEST);
    }
    const newPhotoAwsUrl = generateAwsUrl(UploadType.MOVIE_PREVIEW, photo.originalname)

    const createdMovie = new this.movieModel({
      ...createMovieDto,
      imageUrl: newPhotoAwsUrl,
      videoUrl: newVideoAwsUrl,
      previewFileName: photo.originalname,
      movieFileName: movie.originalname,
      rate: 0,
      reviews: 0,
    });
    return createdMovie.save();
  }

  async findAll() {
    const allMovies = await this.movieModel.find({});
    if (!allMovies) {
      throw new HttpException('Something gone wrond :(', HttpStatus.NOT_FOUND);
    }
    return allMovies;
  }

  async findOneById(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
    }
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  updateById(id: string, updateMovieDto: UpdateMovieDto) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
    }

    const updatedMovie = this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true })
    if (!updatedMovie) {
      throw new HttpException('Can not find a user with such id', HttpStatus.NOT_FOUND)
    }

    return updatedMovie
  }

  async removeById(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
    }
    const movie = await this.movieModel.findByIdAndDelete(id);
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    const deletedMovieResponse = await this.uploadService.deleteObject(movie.movieFileName, UploadType.MOVIE_VIDEO)
    if (deletedMovieResponse.status !== 200) {
      throw new HttpException('Something gone wrong with movie removal :(', HttpStatus.BAD_REQUEST);
    }

    const deletedPreviewResponse = await this.uploadService.deleteObject(movie.previewFileName, UploadType.MOVIE_PREVIEW)
    if (deletedPreviewResponse.status !== 200) {
      throw new HttpException('Something gone wrong with photo removal :(', HttpStatus.BAD_REQUEST);
    }

    return movie;
  }

  async removeAll() {
    const deletedMoviesResponse = await this.uploadService.deleteAllObjectsFromSpecifivFolder(UploadType.MOVIE_VIDEO)
    if (deletedMoviesResponse.status !== 200) {
      throw new HttpException('Something gone wrong with movies removal :(', HttpStatus.BAD_REQUEST);
    }

    const deletedPhotosResponse = await this.uploadService.deleteAllObjectsFromSpecifivFolder(UploadType.MOVIE_PREVIEW)
    if (deletedPhotosResponse.status !== 200) {
      throw new HttpException('Something gone wrong with previews removal :(', HttpStatus.BAD_REQUEST);
    }
    const result = await this.movieModel.deleteMany({})

    console.log('result', result)
    return result.deletedCount
  }

  async isMovieExist(name: string) {
    const isExist = await this.movieModel.exists({ name })
    if (isExist) {
      return {
        status: HttpStatus.OK,
        message: 'Movie with such name already exist'
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: "Not found such movie"
    }
  }
}
