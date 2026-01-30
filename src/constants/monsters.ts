import { MonsterConfig } from '@/types';

// 怪兽配置
export const MONSTERS: Record<number, MonsterConfig> = {
  1: {
    name: '史莱姆',
    emoji: '👾',
    maxHp: 100,
    level: 1,
  },
  2: {
    name: '骷髅兵',
    emoji: '💀',
    maxHp: 120,
    level: 2,
  },
  3: {
    name: '火龙',
    emoji: '🐉',
    maxHp: 150,
    level: 3,
  },
  4: {
    name: '暗影怪',
    emoji: '👻',
    maxHp: 180,
    level: 4,
  },
  5: {
    name: '魔王',
    emoji: '👹',
    maxHp: 200,
    level: 5,
  },
};

// 示例单词数据
export const SAMPLE_WORDS = [
  { id: 'w1', english: 'APPLE', chinese: '苹果', imageUrl: '🍎' },
  { id: 'w2', english: 'BANANA', chinese: '香蕉', imageUrl: '🍌' },
  { id: 'w3', english: 'CAT', chinese: '猫', imageUrl: '🐱' },
  { id: 'w4', english: 'DOG', chinese: '狗', imageUrl: '🐶' },
  { id: 'w5', english: 'BIRD', chinese: '鸟', imageUrl: '🐦' },
  { id: 'w6', english: 'FISH', chinese: '鱼', imageUrl: '🐟' },
  { id: 'w7', english: 'SUN', chinese: '太阳', imageUrl: '☀️' },
  { id: 'w8', english: 'MOON', chinese: '月亮', imageUrl: '🌙' },
  { id: 'w9', english: 'STAR', chinese: '星星', imageUrl: '⭐' },
  { id: 'w10', english: 'RAINBOW', chinese: '彩虹', imageUrl: '🌈' },
];
