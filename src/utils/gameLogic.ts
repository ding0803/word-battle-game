import type { LetterCell, Word } from '@/types';

// 验证选择的路径是否连续
export function isPathContinuous(path: Array<{ row: number; col: number }>): boolean {
  if (path.length < 2) return true;

  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const rowDiff = Math.abs(prev.row - curr.row);
    const colDiff = Math.abs(prev.col - curr.col);

    // 检查是否相邻（包括对角线）
    if (rowDiff > 1 || colDiff > 1) {
      return false;
    }
  }

  return true;
}

// 检查路径是否有重复
export function hasDuplicates(path: Array<{ row: number; col: number }>): boolean {
  const seen = new Set<string>();
  for (const p of path) {
    const key = `${p.row},${p.col}`;
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return false;
}

// 验证单词匹配
export function validateWordMatch(
  matrix: LetterCell[][],
  selectedPath: Array<{ row: number; col: number }>,
  availableWords: Word[]
): { isValid: boolean; word?: Word } {
  if (selectedPath.length < 2) {
    return { isValid: false };
  }

  // 检查路径连续性和重复
  if (!isPathContinuous(selectedPath) || hasDuplicates(selectedPath)) {
    return { isValid: false };
  }

  // 提取选中的字母序列
  const selectedWord = selectedPath
    .map(p => matrix[p.row][p.col].letter)
    .join('');

  // 检查是否匹配任何单词（支持正向和反向）
  const matchedWord = availableWords.find(w => {
    const upperWord = w.english.toUpperCase();
    return upperWord === selectedWord ||
           upperWord === selectedWord.split('').reverse().join('');
  });

  if (matchedWord) {
    return { isValid: true, word: matchedWord };
  }

  return { isValid: false };
}

// 计算伤害
export function calculateDamage(combo: number): number {
  const BASE_DAMAGE = 10;

  if (combo >= 5) {
    return Math.round(BASE_DAMAGE * 2.0); // 暴击
  } else if (combo >= 2) {
    return Math.round(BASE_DAMAGE * 1.2); // 1.2倍
  }

  return BASE_DAMAGE;
}
