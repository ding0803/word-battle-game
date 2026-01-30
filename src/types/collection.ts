// 单词卡片
export interface WordCard {
  id: string;
  english: string;
  chinese: string;
  imageUrl?: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  collectedAt: number; // 时间戳
  timesPlayed: number;
  timesCorrect: number;
  masteryLevel: number; // 0-100
}

// 图鉴状态
export interface CollectionState {
  cards: WordCard[];
  totalCards: number;
  uniqueCards: number;
  latestCard?: WordCard;
}

// 背包物品
export interface BackpackItem {
  id: string;
  type: 'card' | 'treasure' | 'achievement';
  name: string;
  description: string;
  imageUrl?: string;
  obtainedAt: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// 成就
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
