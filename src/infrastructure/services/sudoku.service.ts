import { Injectable } from '@nestjs/common';
import { HttpException } from '../../domain/exceptions';
import { SudokuGrid, HttpResponse, SudokuResult, ISudokuService, IConfigService, IHttpResponseService, ILoggerService } from '../../domain/interfaces';
import { HttpStatus } from '../../domain/enums';
import { SudokuOptions, EnvObjects } from '../config';
import { validateDTO, validateOutputDTO, processHttpError } from '../../domain/helpers';
import { HttpResponseException } from '../exceptions';

@Injectable()
export class SudokuService implements ISudokuService {
  private options: SudokuOptions | undefined = this.configService.get<SudokuOptions>(EnvObjects.SUDOKU_OPTIONS);

  constructor(
    private readonly httpResponseService: IHttpResponseService,
    private readonly configService: IConfigService,
    private readonly logger: ILoggerService
  ) {}

  async handleSudokuRequest(sudokuTable: SudokuGrid): Promise<HttpResponse<SudokuGrid>> {
    try {
      await validateDTO(sudokuTable);
      const calculatedGrid = await this.solve(sudokuTable.grid);
      if (!calculatedGrid.success) {
        throw new Error('Could not solve sudoku');
      }
      const result: SudokuGrid = { grid: calculatedGrid.grid };
      await validateOutputDTO(result, this.logger);
      return this.httpResponseService.generate(HttpStatus.OK, result);
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw new HttpResponseException(this.httpResponseService.generate(error.status, {}, error.message, error.description));
      }
      processHttpError(error, this.logger);
      throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR, {}));
    }
  }

  private searchForEmptyCell(grid: number[][]): number[] {
    const emptyCellCoordinate = [-1, -1];
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[x][y] === 0) {
          emptyCellCoordinate[0] = x;
          emptyCellCoordinate[1] = y;
          return emptyCellCoordinate;
        }
      }
    }
    return emptyCellCoordinate;
  }

  private canBeUsedInRow(grid: number[][], row: number, value: number): boolean {
    for (let x = 0; x < grid.length; x++) {
      if (grid[row][x] === value) {
        return true;
      }
    }

    return false;
  }

  private canBeUsedInColumn(grid: number[][], column: number, value: number): boolean {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][column] === value) {
        return true;
      }
    }

    return false;
  }

  private canBeUsedInSquare(grid: number[][], row: number, column: number, value: number): boolean {
    row -= row % 3;
    column -= column % 3;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (grid[x + row][y + column] === value) {
          return true;
        }
      }
    }
    return false;
  }

  private isPositionValid(grid: number[][], row: number, column: number, value: number): boolean {
    return (
      !this.canBeUsedInColumn(grid, column, value) &&
      !this.canBeUsedInRow(grid, row, value) &&
      !this.canBeUsedInSquare(grid, row, column, value)
    );
  }

  private async solve(grid: number[][]): Promise<SudokuResult> {
    const [row, column] = this.searchForEmptyCell(grid);
    if (row === -1 && column === -1) {
      return { success: true, grid };
    }

    for (let value = 1; value <= grid.length; value++) {
      if (this.isPositionValid(grid, row, column, value)) {
        grid[row][column] = value;
        const result = await this.solve(grid);
        if (result.success) {
          return result;
        }
        grid[row][column] = 0;
      }
    }
    return { success: false };
  }
}
