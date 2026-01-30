// 怪兽状态
export interface MonsterState {
  hp: number;
  maxHp: number;
  level: number;
  name: string;
  emoji: string;
  spriteUrl?: string;
  isHit: boolean;
  hitCount: number;
}

// 怪兽配置
export interface MonsterConfig {
  name: string;
  emoji: string;
  maxHp: number;
  level: number;
}

// 伤害计算结果
export interface DamageResult {
  damage: number;
  isCritical: boolean; // 是否暴击
  comboMultiplier: number;
}
