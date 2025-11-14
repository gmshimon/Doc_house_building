import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { USER_ROLE } from '@prisma/client';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const users = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,

        role: payload.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    });
    if (!users) {
      throw new UnauthorizedException('User not found or token invalid');
    }
    return users;
  }
}
