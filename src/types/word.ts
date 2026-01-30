import type { Word } from './game';

// 当前单词状态
export interface CurrentWordState {
  word: Word;
  targetLetters: string[];  // ['A', 'P', 'P', 'L', 'E']
  filledLetters: (string | null)[];  // ['A', 'P', null, 'L', 'E']
  currentIndex: number;  // 当前需要填入的位置索引
  isCompleted: boolean;
}
