import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { isValidObjectId } from '../utils/isValidObjectId';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (err) {
      throw new HttpException('Something gone extremely wrond :(', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.userModel.find({});
      if (!allUsers) {
        throw new HttpException('Something gone wrond :(', HttpStatus.NOT_FOUND);
      }
      return allUsers;
    }
    catch (err) {
      throw new HttpException('Something gone wrond :(', HttpStatus.NOT_FOUND);
    }
  }


  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (err) {
      throw new HttpException('Error occurs', HttpStatus.BAD_REQUEST)
    }

  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
      }

      const updatedUser = this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })

      if (!updatedUser) {
        throw new HttpException('Can not find a user with such id', HttpStatus.NOT_FOUND)
      }

      return updatedUser
    } catch (err) {
      throw new HttpException('Error occurs', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (err) {
      throw new HttpException('Error occurs', HttpStatus.BAD_REQUEST)
    }
  }
}
