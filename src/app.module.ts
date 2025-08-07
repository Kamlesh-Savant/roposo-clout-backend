import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropshipperModule } from './dropshipper/dropshipper.module';

@Module({
  imports: [DropshipperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
