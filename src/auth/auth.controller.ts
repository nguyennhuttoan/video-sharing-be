import { Controller, Body, Post, Delete } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userInfo: UserDto): Promise<{ token: string }> {
    return this.authService.signIn(userInfo);
  }
}
