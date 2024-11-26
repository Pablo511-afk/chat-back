import {
  ConflictException,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Auth microservice');

  constructor(private jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();

    this.logger.log('DataBase connected');
  }

  async singJwt(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload);
  }

  /**
   * Verifies a JWT token.
   * @param token The JWT token to be verified
   * @returns An object containing the user and a new token if the verification is successful
   * @throws RpcException if the token is invalid
   */
  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user,
        token: await this.singJwt(user),
      };
    } catch (error) {
      console.log({ error });
      throw new ConflictException('invalid token');
    }
  }

  /**
   * Registers a new user in the system.
   * @param registerUserDto The object containing the new user's data
   * @returns An object containing the user and a new token
   * @throws RpcException if the user already exists
   */
  async register(registerUserDto: RegisterUserDto) {
    const { user: userName, name, password, type } = registerUserDto;

    const user = await this.user.findUnique({
      where: {
        user: userName,
      },
    });

    if (user) {
      throw new ConflictException(
        `user with userName: ${userName} already exists`,
      );
    }

    const newUser = await this.user.create({
      data: {
        user: userName,
        password: bcryptjs.hashSync(password, 10),
        name,
        type,
      },
    });

    const { password: __, ...rest } = newUser;

    return {
      user: rest,
      token: await this.singJwt(rest),
    };
  }

  /**
   * Authenticates a user given a valid email and password
   * @param loginUserDto The user's email and password
   * @returns An object containing the user and a new token
   * @throws RpcException with status 400 if the user does not exist
   * @throws RpcException with status 401 if the password is invalid
   */
  async login(loginUserDto: LoginUserDto) {
    const { user: userName, password } = loginUserDto;

    const user = await this.user.findUnique({
      where: {
        user: userName,
      },
    });

    if (!user) {
      throw new ConflictException(`user with userName: ${userName} not found`);
    }

    const isValidUser = bcryptjs.compareSync(password, user.password);

    if (!isValidUser) {
      throw new UnauthorizedException('User not authorized');
    }

    const { password: __, ...rest } = user;

    return {
      user: rest,
      token: await this.singJwt(rest),
    };
  }
}
