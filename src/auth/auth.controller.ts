import { Controller, Body, Post, Delete } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userInfo: UserDto): Promise<{ token: string }> {
    return this.authService.signIn(userInfo);
  }

  @Delete('/logout')
  logout(@Body() token: TokenDto): Promise<boolean> {
    return this.authService.signOut(token);
  }
}
