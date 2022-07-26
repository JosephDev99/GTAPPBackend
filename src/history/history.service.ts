import { Injectable, NotFoundException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';
import { History } from './history.entity';
import { CreateHistoryDto } from "./dto/createHistory.dto";
import { UpdateHistoryDto } from "./dto/updateHistory.dto";
@Injectable()
export class HistoryService {

  private logger = new Logger('HistoryService');
  constructor(
    @InjectRepository(HistoryRepository)
    private historyRepository: HistoryRepository,
  ) { }
  getHistory(): Promise<History[]> {
    return this.historyRepository.find();
  }
  async deleteHistory(id: number): Promise<void> {
    const result = await this.historyRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async createHistory(createTaskDto: CreateHistoryDto): Promise<History> {
    return this.historyRepository.createHistory(createTaskDto);
  }

  updateHistory(
    id: number,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    return this.historyRepository.updateHistory(
      id,
      updateHistoryDto,
    );
  }
}
