import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { DeleteDto } from './dto/delete.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { Username, phoneNumber, password } = signUpDto;

    const user = new User();
    user.Username = Username;
    user.phoneNumber = phoneNumber;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email Already Exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(signInDto: SignInDto): Promise<{ id: number, password: string, phoneNumber: Number }> {
    const { phoneNumber, password } = signInDto;
    const user = await this.findOne({ phoneNumber });
    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async validateDeleteUserPassword(deleteDto: DeleteDto): Promise<{ id: number, password: string, phoneNumber: Number }> {
    const { phoneNumber, password } = deleteDto;
    const user = await this.findOne({ phoneNumber, password });
    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  // async deleteUser(signInDto:SignInDto):Promise<void>{
  //   const { email, password } = signInDto;
  //   const user = await this.findOne({ email });
  //   if (user) {
  //     return this.delete(id);
  //   } else {
  //     return null;
  //   }
  // }

}
