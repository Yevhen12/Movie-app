import { UserService } from './../user/user.service';
import { forwardRef, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const matchedPasswords = comparePassword(pass, user.password)
    if(!matchedPasswords) {
      throw new HttpException('Inccorect password or login', HttpStatus.UNAUTHORIZED)
    }
    if (user && matchedPasswords) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Inccorect password or login', HttpStatus.UNAUTHORIZED)
  }

  async signUp(createUserDto: CreateUserDto) {
    const isUsernameExist = await this.userModel.findOne({ username: createUserDto.username })
    if (isUsernameExist) {
      throw new HttpException('This username already exist', HttpStatus.BAD_REQUEST);
    }

    const isEmailExist = await this.userModel.findOne({ email: createUserDto.email }).exec()
    if (isEmailExist) {
      throw new HttpException('This email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = encodePassword(createUserDto.password)

    const createdUser = new this.userModel({
      ...createUserDto,
      role: 'user',
      password: hashedPassword,
    });
    const result = await createdUser.save();
    const { password, ...other } = result.toObject()
    return other
  }

  async login(user: any) {
    return {
      ...user,
      access_token: this.jwtService.sign({ ...user }, { expiresIn: '30d' }),
      refresh_token: this.jwtService.sign({ ...user }, { expiresIn: '30d' })
    };
  }

  refreshToken(user: any) {
    console.log('user', user)
    return {
      access_token: this.jwtService.sign({ ...user }, { expiresIn: '30d' }),
    }
  }
}
