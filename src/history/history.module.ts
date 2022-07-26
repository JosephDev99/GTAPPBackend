import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryRepository } from './history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryRepository])
  ],
  controllers: [HistoryController],
  providers: [
    HistoryService,
  ]
})
export class HistoryModule { }
