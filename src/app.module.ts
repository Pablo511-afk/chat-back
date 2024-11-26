import { Module } from '@nestjs/common';
import { GatewayModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GatewayModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
