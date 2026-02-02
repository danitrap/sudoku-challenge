/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { CacheModule, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SudokuController } from '../controllers';
import { SudokuService } from '../services/sudoku.service';
import { ISudokuService } from '../../domain/interfaces';

@Module({
  imports: [CommonModule, CacheModule.register()],
  controllers: [SudokuController],
  providers: [
    {
      provide: 'ISudokuService',
      useClass: SudokuService,
    },
  ],
  exports: ['ISudokuService'],
})
export class SudokuModule {}
