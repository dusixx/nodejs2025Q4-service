import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggingService } from './logging.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CustomLoggingService],
  exports: [CustomLoggingService],
})
export class LoggingModule {}
