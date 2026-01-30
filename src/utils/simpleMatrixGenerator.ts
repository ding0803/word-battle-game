import type { LetterCell } from '@/types';

// 生成简化版字母矩阵（18个不重复字母，颜色分散）
export function generateSimpleMatrix(targetWord: string): LetterCell[][] {
  // 获取目标单词的所有字母
  const wordLetters = targetWord.toUpperCase().split('');

  // 创建包含目标字母的数组（确保每个字母至少出现一次）
  const baseLetters: string[] = [...wordLetters];

  // 添加其他字母凑齐18个（不重复）
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const usedLetters = new Set(baseLetters);

  for (const letter of alphabet) {
    if (!usedLetters.has(letter) && baseLetters.length < 18) {
      baseLetters.push(letter);
      usedLetters.add(letter);
    }
    if (baseLetters.length >= 18) break;
  }

  // 打乱顺序（除了前几个，确保目标字母不会都聚集在一起）
  const shuffled = [...baseLetters].sort(() => Math.random() - 0.5);

  // 确保18个字母
  const finalLetters = shuffled.slice(0, 18);

  // 创建3x6矩阵（18个字母）
  const matrix: LetterCell[][] = [];
  let index = 0;

  for (let row = 0; row < 3; row++) {
    const rowArray: LetterCell[] = [];
    for (let col = 0; col < 6; col++) {
      if (index < finalLetters.length) {
        rowArray.push({
          letter: finalLetters[index],
          row,
          col,
          isSelected: false,
          isHint: false,
          isWordStart: false,
        });
        index++;
      }
    }
    matrix.push(rowArray);
  }

  console.log('生成的字母矩阵:', finalLetters.join(', '));
  return matrix;
}
