import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Logger,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    this.logger.verbose('Registering!'); // logging status
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    this.logger.verbose('Signing In!');
    return this.authService.signIn(signInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req.user);
  }
  @Post('refresh')
  @UseGuards(AuthGuard())
  refresh(@Req() { user }: Request): Promise<string | never> {
    return this.authService.refresh(<User>user);
  }
  @Put('/update')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req: Request): Promise<User> {
    return this.authService.updatePassword(body, req);
  }
  // @Delete('/delete')
  // @UseGuards(AuthGuard())
  // delete(@Body() deleteDto: DeleteDto): Promise<User> {
  //   return this.authService.delete(deleteDto);
  // }
  // @Delete("delete:id")
  // remove(@Param("id") id: string) {
  //   return this.authService.remove(id);
  // }
  @Delete('/delete')
  @UseGuards(AuthGuard())
  delete(@Body() body: UpdatePasswordDto, @Req() req: Request): Promise<User> {
    return this.authService.delete(body, req);
  }
}
