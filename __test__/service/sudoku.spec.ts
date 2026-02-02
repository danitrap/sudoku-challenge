/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { SudokuService } from '../../src/infrastructure/services/sudoku.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TEST_GRID_0, TEST_GRID_1, TEST_GRID_2, TEST_GRID_3 } from '../fcatory';

import { ISudokuService } from '../../src/domain/interfaces';

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('sudoku service', () => {
  let service: ISudokuService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: 'IHttpResponseService',
          useValue: {
            generate: jest.fn().mockImplementation((status: number, data: any) => ({ status, data })),
          },
        },
        {
          provide: 'ILoggerService',
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
        {
          provide: 'ISudokuService',
          useClass: SudokuService,
        },
        {
          provide: 'IConfigService',
          useValue: {
            get: jest.fn().mockReturnValue({ dimenstion: 9 }),
          },
        },
      ],
    }).compile();
    service = module.get<ISudokuService>('ISudokuService');
  });

  describe('sudoku calculation tests', () => {
    it('should return a solved grid', async () => {
      const result = await service.handleSudokuRequest({ grid: TEST_GRID_0 });
      expect(result.data.grid).toBeDefined();
    });

    it('should return not solvable', async () => {
      await expect(service.handleSudokuRequest({ grid: TEST_GRID_1 })).rejects.toThrow();
    });

    it('should return a solved grid', async () => {
      const result = await service.handleSudokuRequest({ grid: TEST_GRID_2 });
      expect(result.data.grid).toEqual([
        [1, 4, 6, 5, 2, 8, 7, 3, 9],
        [2, 3, 8, 4, 7, 9, 6, 5, 1],
        [7, 5, 9, 1, 3, 6, 2, 4, 8],
        [6, 8, 2, 7, 9, 5, 4, 1, 3],
        [4, 7, 1, 2, 8, 3, 9, 6, 5],
        [5, 9, 3, 6, 1, 4, 8, 7, 2],
        [9, 1, 4, 8, 5, 7, 3, 2, 6],
        [8, 2, 7, 3, 6, 1, 5, 9, 4],
        [3, 6, 5, 9, 4, 2, 1, 8, 7],
      ]);
    });

    it('should return a solved grid', async () => {
      const result = await service.handleSudokuRequest({ grid: TEST_GRID_3 });
      expect(result.data.grid).toBeDefined();
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
