// 游戏状态枚举
export enum GameStatus {
  IDLE = 'idle',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  PAUSED = 'paused',
  VICTORY = 'victory',
}

// 字母格子
export interface LetterCell {
  letter: string;
  row: number;
  col: number;
  isSelected: boolean;
  isHint: boolean;
  isWordStart: boolean; // 是否是某个单词的首字母（用于提示）
}

// 单词
export interface Word {
  id: string;
  english: string;
  chinese: string;
  imageUrl?: string;
  pronunciation?: string;
  exampleSentence?: string;
}

// 单词匹配路径
export interface WordPath {
  word: string;
  path: Array<{ row: number; col: number }>;
}

// 游戏配置
export interface GameConfig {
  matrixSize: 6 | 8;
  baseDamage: number;
  combo2_4Multiplier: number;
  combo5PlusMultiplier: number;
  hintTimeout: number; // 毫秒
  comboTimeout: number; // 毫秒
}
