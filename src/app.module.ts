import { Module } from '@nestjs/common';
import { GatewayModule } from './websockets/websocket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GatewayModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
