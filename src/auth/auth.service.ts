import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UpdatePasswordDto } from "./dto/update.dto";
import { Request } from "express"
declare module "express" {
  export interface Request {
    user: any
  }
}
@Injectable()
export class AuthService {

  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(signInDto);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      id: user.id,
      phoneNumber: user.phoneNumber
    }

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Successfully Generated JWT Token with payload ${JSON.stringify(payload)}`);
    console.log(accessToken)
    return { accessToken };
  }
  public async refresh(user: User): Promise<string> {
    this.userRepository.update(user.id, {});

    return this.jwtService.sign(user);
  }
  public async updatePassword(body: UpdatePasswordDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.password = body.password;

    return this.userRepository.save(user);
  }
  public async delete(body: UpdatePasswordDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    if (user.password = body.password) {
      return this.userRepository.remove(user);
    }
  }
  // public async delete(deleteDto: DeleteDto): Promise<User> {
  //   const user = await this.userRepository.validateDeleteUserPassword(deleteDto);
  //   if (user) {
  //     return this.userRepository.remove(user);
  //   }
  // }
}
