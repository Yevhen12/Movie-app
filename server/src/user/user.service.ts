import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './shemas/user.schema';
import { isValidObjectId } from '../utils/isValidObjectId';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (err) {
      throw new HttpException('Something gone wrond :(', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const allUsers = await this.userModel.find({});
    if (!allUsers) {
      throw new HttpException('Something gone wrond :(', HttpStatus.NOT_FOUND);
    }
    return allUsers;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
