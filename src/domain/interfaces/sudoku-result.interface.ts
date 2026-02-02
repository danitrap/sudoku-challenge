export type SudokuSolution = {
  success: true;
  grid: number[][];
};

export type SudokuFailure = {
  success: false;
};

export type SudokuResult = SudokuSolution | SudokuFailure;
