import { GameConfig } from '@/types';

// 游戏配置
export const GAME_CONFIG: GameConfig = {
  matrixSize: 6,
  baseDamage: 10,
  combo2_4Multiplier: 1.2,
  combo5PlusMultiplier: 2.0,
  hintTimeout: 10000, // 10秒
  comboTimeout: 5000, // 5秒
};

// 存储键名
export const STORAGE_KEYS = {
  PROGRESS: 'word_battle_progress',
  COLLECTION: 'word_battle_collection',
  SETTINGS: 'word_battle_settings',
  ACHIEVEMENTS: 'word_battle_achievements',
} as const;

// 颜色配置
export const COLORS = {
  LETTERS: [
    '#FF6B6B', // 红
    '#4ECDC4', // 青
    '#95E1D3', // 薄荷绿
    '#FFE66D', // 黄
    '#DDA0DD', // 紫
    '#FFB347', // 橙
    '#87CEEB', // 天蓝
    '#F0E68C', // 卡其
    '#FFB6C1', // 粉
    '#98FB98', // 淡绿
  ] as const,
};
