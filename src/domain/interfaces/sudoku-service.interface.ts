import { HttpResponse } from './http-response.interface';
import { SudokuGrid } from './sudoku-grid.interface';

export interface ISudokuService {
  handleSudokuRequest(sudokuTable: SudokuGrid): Promise<HttpResponse<SudokuGrid>>;
}
