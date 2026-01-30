import type { LetterCell, Word } from '@/types';

// 在矩阵中放置单词
export function placeWordInMatrix(
  matrix: LetterCell[][],
  word: Word,
  attempts: number = 100
): boolean {
  const size = matrix.length;
  const wordLength = word.english.length;

  // 支持的方向：横向、纵向、对角线
  const directions = [
    [0, 1],   // 横向
    [1, 0],   // 纵向
    [1, 1],   // 对角线右下
    [1, -1],  // 对角线左下
  ];

  for (let attempt = 0; attempt < attempts; attempt++) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const startRow = Math.floor(Math.random() * size);
    const startCol = Math.floor(Math.random() * size);

    if (canPlaceWord(matrix, word.english, startRow, startCol, direction)) {
      placeWord(matrix, word.english, startRow, startCol, direction);
      return true;
    }
  }

  return false;
}

// 检查是否可以放置单词
function canPlaceWord(
  matrix: LetterCell[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: number[]
): boolean {
  const size = matrix.length;
  const wordLength = word.length;
  const [dx, dy] = direction;

  // 检查是否越界
  const endRow = startRow + (wordLength - 1) * dx;
  const endCol = startCol + (wordLength - 1) * dy;

  if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
    return false;
  }

  // 检查每个位置是否可用
  for (let i = 0; i < wordLength; i++) {
    const row = startRow + i * dx;
    const col = startCol + i * dy;
    const cell = matrix[row][col];

    // 如果格子已经有字母且不匹配，则不能放置
    if (cell.letter !== '' && cell.letter !== word[i]) {
      return false;
    }
  }

  return true;
}

// 放置单词
function placeWord(
  matrix: LetterCell[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: number[]
): void {
  const [dx, dy] = direction;

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * dx;
    const col = startCol + i * dy;
    matrix[row][col].letter = word[i];
    matrix[row][col].isWordStart = (i === 0);
  }
}

// 生成字母矩阵
export function generateMatrix(words: Word[], size: 6 | 8 = 6): LetterCell[][] {
  // 创建空矩阵
  const matrix: LetterCell[][] = [];
  for (let row = 0; row < size; row++) {
    const rowArray: LetterCell[] = [];
    for (let col = 0; col < size; col++) {
      rowArray.push({
        letter: '',
        row,
        col,
        isSelected: false,
        isHint: false,
        isWordStart: false,
      });
    }
    matrix.push(rowArray);
  }

  // 按长度排序，优先放置长单词
  const sortedWords = [...words].sort((a, b) => b.english.length - a.english.length);

  // 放置单词
  const placedWords: Word[] = [];
  for (const word of sortedWords) {
    if (placeWordInMatrix(matrix, word)) {
      placedWords.push(word);
    }
  }

  // 填充剩余空格为随机字母
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col].letter === '') {
        matrix[row][col].letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  console.log('成功放置单词:', placedWords.map(w => w.english));
  return matrix;
}
