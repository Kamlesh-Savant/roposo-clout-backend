// src/dropshipper/dropshipper.module.ts
import { Module } from '@nestjs/common';
import { DropshipperService } from './dropshipper.service';
import { DropshipperController } from './dropshipper.controller';
import { PrismaModule } from '../prisma/prisma.module'; // import this

@Module({
  imports: [PrismaModule], // add this
  controllers: [DropshipperController],
  providers: [DropshipperService],
})
export class DropshipperModule {}
