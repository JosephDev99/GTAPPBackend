import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { History } from './history.entity';
import { CreateHistoryDto } from "./dto/createHistory.dto";
import { UpdateHistoryDto } from "./dto/updateHistory.dto";

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {

  async createHistory(createHistoryDto: CreateHistoryDto): Promise<History> {
    const { Datetime, price, start, dest } = createHistoryDto;

    const history = new History();
    history.DateTime = Datetime;
    history.price = price;
    history.start = start;
    history.dest = dest;

    try {
      await history.save();
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error! Try Again Later');
    }

    return history;
  }
  async getHistoryById(id: number): Promise<History> {
    const history = await this.findOne({ where: { id } });

    if (!history) {
      throw new NotFoundException(`History by id ${id} not found!`);
    }

    return history;
  }
  async updateHistory(
    id: number,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    const history: History = await this.getHistoryById(id);

    history.DateTime = updateHistoryDto.Datetime;
    history.price = updateHistoryDto.price;
    history.start = updateHistoryDto.start;
    history.dest = updateHistoryDto.dest;
    return await this.save(history);
  }
}

