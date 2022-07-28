import {
  Controller,
  Post,
  Body,
  Delete,
  Req,
  Logger,
  Param,
  Patch,
  Get
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './history.entity';
import { CreateHistoryDto } from "./dto/createHistory.dto";
import { UpdateHistoryDto } from "./dto/updateHistory.dto";
@Controller('history')
export class HistoryController {
  private logger = new Logger('HistoryController');
  constructor(private HistoryService: HistoryService) { }
  @Get()
  getHistory(): Promise<History[]> {
    return this.HistoryService.getHistory();
  }

  @Post()
  createHistory(
    @Body() createHistoryDto: CreateHistoryDto,
  ): Promise<History> {
    return this.HistoryService.createHistory(createHistoryDto);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: number,
  ): Promise<void> {
    return this.HistoryService.deleteHistory(id);
  }

  @Patch('/:id')
  updateHistory(
    @Param('id') id: number,
    @Body() updateHistoryDto: UpdateHistoryDto
  ): Promise<History> {
    return this.HistoryService.updateHistory(id, updateHistoryDto);
  }
}
