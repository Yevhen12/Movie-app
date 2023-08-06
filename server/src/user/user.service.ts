import { UserType } from './types';
import { ConflictException, HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { isValidObjectId } from '../utils/isValidObjectId';
import { encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
    ) { }

  async create(createUserDto: CreateUserDto) {
    const isUsernameExist = await this.userModel.findOne({ username: createUserDto.username })
    if (isUsernameExist) {
      throw new ConflictException('This username already exist');
    }

    const isEmailExist = await this.userModel.findOne({ email: createUserDto.email }).exec()
    if (isEmailExist) {
      throw new HttpException('This email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = encodePassword(createUserDto.password)

    const createdUser = new this.userModel({
      ...createUserDto,
      role: 'user',
      password: hashedPassword
    });
    const result = await createdUser.save();
    const { password, ...other } = result.toObject()
    return other
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

  async findOneById(id: string) {
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

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username })
    if (!user) {
      throw new HttpException("This username doesn't exist", HttpStatus.NOT_FOUND);
    }

    return user
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

  async getMe(token: string) {
    const decodedUser = this.jwtService.decode(token)
    if(!decodedUser) {
      throw new HttpException('Bad token', HttpStatus.BAD_REQUEST);
    }
    return decodedUser
  }
}
