import { UserService } from './../user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: String(user._id) };
    // console.log('payload', payload)
    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }
}
