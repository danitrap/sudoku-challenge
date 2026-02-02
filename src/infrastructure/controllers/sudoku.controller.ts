import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Header,
  CacheInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { SudokuGrid, HttpResponse, ISudokuService } from '../../domain/interfaces';
import { Public } from '../decorators';
import { SudokuDTO } from '../../application/dtos';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../../domain/enums';

@Controller('api/v1/sudoku')
@UseInterceptors(CacheInterceptor)
export class SudokuController {
  constructor(@Inject('ISudokuService') private readonly sudokuService: ISudokuService) {}

  @ApiOperation({ summary: 'Entry point for Sudoku API' })
  @ApiResponse({
    status: 200,
    description: 'Returns back the calculated Sudoku',
    type: String,
  })
  @Get()
  @Public()
  getHello() {
    return 'Welcome to Sudoko solver endpoint';
  }

  @ApiOperation({ summary: 'Calaculates the sudoku table' })
  @ApiResponse({
    status: 200,
    description: 'Returns back the calculated Sudoko',
    type: SudokuDTO,
  })
  @ApiBody({ type: [SudokuDTO] })
  @Header('content-type', 'application/json')
  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  async sudoku(@Body() body: SudokuDTO): Promise<HttpResponse<SudokuGrid>> {
    const response: HttpResponse<SudokuGrid> = await this.sudokuService.handleSudokuRequest(body);
    return response;
  }
}
