// 当前单词状态
export interface CurrentWordState {
  word: {
    id: string;
    english: string;
    chinese: string;
    emoji?: string;
  };
  targetLetters: string[];  // ['A', 'P', 'P', 'L', 'E']
  filledLetters: (string | null)[];  // ['A', 'P', null, 'L', 'E']
  currentIndex: number;  // 当前需要填入的位置索引
  isCompleted: boolean;
}
