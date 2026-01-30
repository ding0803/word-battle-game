import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_CONFIG, COLORS, SAMPLE_WORDS, MONSTERS } from '@/constants';
import { generateSimpleMatrix } from '@/utils/simpleMatrixGenerator';
import { calculateDamage } from '@/utils/gameLogic';
import type { LetterCell, MonsterState, CurrentWordState } from '@/types';

interface GameScreenProps {
  onVictory: () => void;
  onBack: () => void;
  onDefeat: (reason: 'timeout' | 'tooManySkips') => void; // 失败回调，传递失败原因
}

export default function GameScreen({ onVictory, onBack, onDefeat }: GameScreenProps) {
  // 游戏状态
  const [monster, setMonster] = useState<MonsterState>({
    hp: 100,
    maxHp: 100,
    level: 1,
    name: '史莱姆',
    emoji: MONSTERS[1].emoji,
    isHit: false,
    hitCount: 0,
  });

  // 单词列表状态
  const [wordList] = useState(SAMPLE_WORDS);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 跳过的单词列表
  const [skippedWords, setSkippedWords] = useState<typeof SAMPLE_WORDS>([]);

  // 当前单词状态
  const [currentWord, setCurrentWord] = useState<CurrentWordState>({
    word: SAMPLE_WORDS[0],
    targetLetters: SAMPLE_WORDS[0].english.split(''),
    filledLetters: Array(SAMPLE_WORDS[0].english.length).fill(null),
    currentIndex: 0,
    isCompleted: false,
  });

  // 字母矩阵（3x6，18个不重复字母）
  const [matrix, setMatrix] = useState<LetterCell[][]>(() =>
    generateSimpleMatrix(wordList[0].english)
  );

  // 攻击特效状态
  const [showAttack, setShowAttack] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState(false);
  const [damageNumber, setDamageNumber] = useState(0);

  // 单词倒计时（60秒）
  const [wordTimeLeft, setWordTimeLeft] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // 提示状态
  const [showHint, setShowHint] = useState(false);

  // 获取怪兽当前表情
  const getMonsterEmoji = useCallback((): string => {
    if (showHitEffect || monster.isHit) {
      // 受击时的痛苦表情
      const hitEmojis = ['😵', '😖', '😫', '🤕', '😣'];
      return hitEmojis[Math.floor(Math.random() * hitEmojis.length)];
    }
    return monster.emoji;
  }, [monster.emoji, monster.isHit, showHitEffect]);

  // 单词倒计时逻辑
  useEffect(() => {
    if (currentWord.isCompleted || isTimeUp) return;

    const timer = setInterval(() => {
      setWordTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          setTimeout(() => onDefeat('timeout'), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentWord.isCompleted, isTimeUp, onDefeat]);

  // 连击重置计时器
  useEffect(() => {
    if (combo === 0) return;

    const timer = setTimeout(() => {
      setCombo(0);
      console.log('连击超时，重置为0');
    }, 5000);

    return () => clearTimeout(timer);
  }, [combo]);

  // 判断是否是提示字母
  const isHintLetter = useCallback((letter: string): boolean => {
    if (!showHint) return false;
    return letter.toUpperCase() === currentWord.targetLetters[currentWord.currentIndex];
  }, [showHint, currentWord.targetLetters, currentWord.currentIndex]);

  // 获取字母颜色（错乱分散）
  const getLetterColor = useCallback((colIndex: number, rowIndex: number, letter: string): string => {
    if (showHint && isHintLetter(letter)) {
      return '#FFD700'; // 金色闪烁
    }
    // 使用15种颜色错乱分布
    const colorIndex = (rowIndex * 6 + colIndex) % 15;
    return COLORS.LETTERS[colorIndex % COLORS.LETTERS.length];
  }, [showHint, isHintLetter]);

  // 处理提示按钮
  const handleHint = useCallback(() => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  }, []);

  // 处理字母点击
  const handleLetterClick = useCallback((clickedLetter: string) => {
    if (currentWord.isCompleted || isTimeUp) return;

    const { targetLetters, currentIndex } = currentWord;
    const targetLetter = targetLetters[currentIndex];

    console.log(`点击了: ${clickedLetter}, 需要: ${targetLetter}`);

    // 检查是否是正确的字母
    if (clickedLetter.toUpperCase() === targetLetter) {
      // 正确！填入字母
      const newFilledLetters = [...currentWord.filledLetters];
      newFilledLetters[currentIndex] = clickedLetter.toUpperCase();

      const isLastLetter = currentIndex === targetLetters.length - 1;

      setCurrentWord({
        ...currentWord,
        filledLetters: newFilledLetters,
        currentIndex: currentIndex + 1,
        isCompleted: isLastLetter,
      });

      // 如果是最后一个字母，完成单词
      if (isLastLetter) {
        setTimeout(() => {
          completeWord();
        }, 500);
      }
    } else {
      // 错误！显示错误反馈
      console.log('❌ 错误的字母');
      // TODO: 添加错误动画
    }
  }, [currentWord, isTimeUp]);

  // 完成单词
  const completeWord = useCallback(() => {
    console.log('✅ 单词完成:', currentWord.word.english);

    // 显示攻击特效
    setShowAttack(true);
    setTimeout(() => {
      setShowAttack(false);
      setShowExplosion(true);
      setShowHitEffect(true); // 显示受击表情
      setTimeout(() => {
        setShowExplosion(false);
        setShowHitEffect(false);
      }, 600);
    }, 800);

    // 更新连击
    const newCombo = combo + 1;
    setCombo(newCombo);
    setMaxCombo(prev => Math.max(prev, newCombo));

    // 计算伤害
    const damage = calculateDamage(newCombo);
    console.log(`💥 造成伤害: ${damage} (连击: x${newCombo})`);

    // 显示伤害数字
    setDamageNumber(damage);

    // 更新怪兽HP
    setMonster(prev => {
      const newHp = Math.max(0, prev.hp - damage);

      // 触发受击动画
      setTimeout(() => {
        setMonster(p => ({ ...p, isHit: false }));
      }, 600);

      return {
        ...prev,
        hp: newHp,
        isHit: true,
        hitCount: prev.hitCount + 1,
      };
    });

    // 检查胜利条件
    if (monster.hp - damage <= 0 || currentWordIndex >= wordList.length - 1) {
      setTimeout(() => {
        onVictory();
      }, 1500);
      return;
    }

    // 切换到下一个单词
    setTimeout(() => {
      switchToNextWord();
    }, 2000);
  }, [currentWord, combo, monster.hp, currentWordIndex, wordList.length, onVictory]);

  // 切换到下一个单词
  const switchToNextWord = useCallback(() => {
    const nextIndex = currentWordIndex + 1;
    const nextWord = wordList[nextIndex];

    console.log(`🔄 切换到单词 ${nextIndex + 1}/${wordList.length}:`, nextWord.chinese);

    setCurrentWordIndex(nextIndex);
    setCurrentWord({
      word: nextWord,
      targetLetters: nextWord.english.split(''),
      filledLetters: Array(nextWord.english.length).fill(null),
      currentIndex: 0,
      isCompleted: false,
    });

    // 重新生成字母矩阵
    setMatrix(generateSimpleMatrix(nextWord.english));

    // 重置倒计时
    setWordTimeLeft(60);
    setIsTimeUp(false);
  }, [currentWordIndex, wordList]);

  // 格式化时间
  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // 跳过当前单词
  const handleSkip = () => {
    // 添加到跳过列表
    setSkippedWords(prev => {
      const newSkipped = [...prev, currentWord.word];

      // 检查是否跳过了10个或更多
      if (newSkipped.length >= 10) {
        setTimeout(() => {
          onDefeat('tooManySkips'); // 失败！跳过太多
        }, 500);
        return prev;
      }

      // 清零连击
      setCombo(0);

      // 切换到下一个单词
      if (currentWordIndex < wordList.length - 1) {
        setTimeout(() => {
          switchToNextWord();
        }, 300);
      } else {
        // 已经是最后一个单词了
        setTimeout(() => {
          onVictory();
        }, 300);
      }

      return newSkipped;
    });
  };

  // 重新开始
  const handleRestart = () => {
    setMonster({
      hp: 100,
      maxHp: 100,
      level: 1,
      name: '史莱姆',
      emoji: MONSTERS[1].emoji,
      isHit: false,
      hitCount: 0,
    });
    setCurrentWordIndex(0);
    setCombo(0);
    setMaxCombo(0);
    setWordTimeLeft(60);
    setIsTimeUp(false);
    setShowHint(false);
    setSkippedWords([]); // 清空跳过列表
    setCurrentWord({
      word: SAMPLE_WORDS[0],
      targetLetters: SAMPLE_WORDS[0].english.split(''),
      filledLetters: Array(SAMPLE_WORDS[0].english.length).fill(null),
      currentIndex: 0,
      isCompleted: false,
    });
    setMatrix(generateSimpleMatrix(SAMPLE_WORDS[0].english));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 h-screen flex flex-col select-none relative overflow-hidden">
      {/* 装饰性背景圆圈 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }} />

      {/* 顶部战斗区域 - 战斗场景背景 */}
      <div className="relative mx-4 mt-4 rounded-3xl shadow-sm h-[28%] min-h-[190px] border-2 border-white/50 overflow-hidden">
        {/* 战斗场景背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent" />

        {/* 装饰性云朵 */}
        <div className="absolute top-2 left-4 text-4xl opacity-40">☁️</div>
        <div className="absolute top-6 right-8 text-3xl opacity-30">☁️</div>
        <div className="absolute top-3 right-20 text-2xl opacity-20">☁️</div>

        {/* 地面装饰 */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-400/30 to-transparent" />

        {/* 进度标签 */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-xs font-bold text-white bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-xl border-2 border-white/50 shadow-sm">
            📊 {currentWordIndex + 1}/{wordList.length}
          </span>
        </div>

        {/* 血条卡片 */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-2 z-20 border-2 border-white/60">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-base">❤️</span>
              <span className="text-xs font-bold text-gray-700">怪兽</span>
            </div>
            <span className="text-xs font-black text-red-500">{monster.hp}</span>
          </div>
          <div className="h-3.5 bg-red-100 rounded-full overflow-hidden border border-red-200 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
            >
            </motion.div>
          </div>
        </div>

        {/* 攻击特效 - 多重光球 */}
        <AnimatePresence>
          {showAttack && (
            <>
              {/* 主光球 */}
              <motion.div
                initial={{ x: 80, y: 120, opacity: 0, scale: 0.5 }}
                animate={{ x: 180, y: 60, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute left-24 bottom-20 z-30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-full shadow-2xl animate-pulse" />
              </motion.div>

              {/* 粒子轨迹 */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 80 + i * 20, y: 120 - i * 15, opacity: 1, scale: 1 }}
                  animate={{ x: 100 + i * 25, y: 100 - i * 20, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="absolute left-24 bottom-20 z-30"
                >
                  <div className="w-3 h-3 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full" />
                </motion.div>
              ))}

              {/* 光环特效 */}
              <motion.div
                initial={{ x: 80, y: 120, opacity: 0, scale: 0 }}
                animate={{ x: 130, y: 90, opacity: [0, 0.8, 0], scale: [0, 2, 3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute left-24 bottom-20 z-20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-200/50 to-orange-300/50 rounded-full" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 爆炸特效 */}
        <AnimatePresence>
          {showExplosion && (
            <>
              {/* 主爆炸 */}
              <motion.div
                initial={{ scale: 0, opacity: 1, rotate: 0 }}
                animate={{ scale: [0, 1.5, 2.5], opacity: [1, 0.8, 0], rotate: [0, 180, 360] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-30"
              >
                <span className="text-8xl">💥</span>
              </motion.div>

              {/* 飞溅粒子 */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(angle) * 80,
                      y: Math.sin(angle) * 80,
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    className="absolute top-24 left-1/2 -translate-x-1/2 z-30"
                  >
                    <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full" />
                  </motion.div>
                );
              })}

              {/* 星星特效 */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 180],
                    x: (Math.random() - 0.5) * 60,
                    y: (Math.random() - 0.5) * 60
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="absolute top-24 left-1/2 -translate-x-1/2 z-30"
                >
                  <span className="text-4xl">⭐</span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* 伤害飘字效果 */}
        <AnimatePresence>
          {showExplosion && damageNumber > 0 && (
            <motion.div
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -80, opacity: [1, 1, 0], scale: [0.5, 1.5, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-32 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="flex flex-col items-center">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className={`text-5xl font-black ${combo >= 5 ? 'text-red-500' : combo >= 2 ? 'text-orange-500' : 'text-yellow-500'}`}
                  style={{
                    textShadow: '0 0 20px rgba(255,200,0,0.8), 0 0 40px rgba(255,150,0,0.6)',
                  }}
                >
                  -{damageNumber}
                </motion.span>
                {combo >= 2 && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-bold text-orange-400"
                  >
                    {combo >= 5 ? '⚡ 暴击!' : '🔥 连击 x' + combo}
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 怪兽（左右跑动 + 受击表情变化） */}
        <motion.div
          animate={{
            x: [0, 25, -25, 0],
            scale: monster.isHit ? [1, 0.8, 1.2, 1] : 1,
            rotate: monster.isHit ? [0, -10, 10, -5, 5, 0] : 0,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{
              scale: showHitEffect ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[90px] filter drop-shadow-2xl">{getMonsterEmoji()}</div>
          </motion.div>
        </motion.div>
      </div>

      {/* 单词提示区域 - 卡片式设计 */}
      <div className="mx-4 my-3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm px-5 py-4 border border-gray-100">
        <div className="flex flex-col items-center gap-3">
          {/* 中文提示 */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentWord.word.emoji || '📝'}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">请找出</span>
              <span className="text-2xl font-bold text-gray-800">{currentWord.word.chinese}</span>
            </div>
          </div>

          {/* 字母空格 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {currentWord.filledLetters.map((letter, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: letter ? 1 : 0.95 }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold transition-all border-2 ${
                  letter
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md border-blue-400'
                    : 'bg-gray-50 text-gray-300 border-gray-200'
                }`}
              >
                {letter || ''}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 字母矩阵区域 - 卡片式设计 */}
      <div className="flex-1 mx-4 mb-3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm px-5 py-5 border border-gray-100 overflow-auto">
        <div className="grid grid-cols-6 gap-3 max-w-md mx-auto">
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isHint = isHintLetter(cell.letter);
              const bgColor = getLetterColor(colIndex, rowIndex, cell.letter);
              return (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleLetterClick(cell.letter)}
                  animate={isHint ? {
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: isHint ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm hover:shadow-md transition-all border-2 border-white/50"
                  style={{
                    backgroundColor: isHint ? '#FFD700' : bgColor,
                    color: ['#FFE66D', '#F0E68C', '#FFD700'].includes(bgColor) ? '#18181B' : '#FFFFFF',
                  }}
                >
                  {cell.letter}
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      {/* 跳过的单词显示区域 */}
      {skippedWords.length > 0 && (
        <div className="mx-4 mb-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm px-4 py-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-gray-700">⏭️ 跳过 ({skippedWords.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skippedWords.map((word, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl px-3 py-1.5 border border-gray-200"
              >
                <span className="text-lg">{word.emoji || '📝'}</span>
                <span className="text-xs font-bold text-gray-600">{word.chinese}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 控制区域 - 苹果风格按钮 */}
      <div className="mx-4 mb-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm px-5 py-3 border border-gray-100">
        <div className="flex items-center justify-between gap-3">
          {/* 提示按钮 */}
          <button
            onClick={handleHint}
            className="flex items-center gap-2 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-2xl px-4 py-2.5 shadow-sm text-sm font-semibold hover:shadow-md transition-all"
          >
            <span className="text-base">💡</span>
            <span className="text-gray-700">提示</span>
          </button>

          {/* 单词倒计时卡片 */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200">
            <span className="text-lg">⏱️</span>
            <span className={`text-base font-bold ${wordTimeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}>
              {formatTime(wordTimeLeft)}
            </span>
          </div>

          {/* 跳过统计 */}
          {skippedWords.length > 0 && (
            <div className="flex items-center gap-2 bg-orange-50 rounded-2xl px-3 py-2 border border-orange-200">
              <span className="text-base">⏭️</span>
              <span className="text-sm font-bold text-orange-600">{skippedWords.length}</span>
            </div>
          )}

          {/* 连击显示 */}
          <AnimatePresence>
            {combo > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl px-4 py-2 shadow-sm"
              >
                <motion.span
                  animate={{ rotate: [0, -15, 15, -15, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-base"
                >
                  🔥
                </motion.span>
                <span className="text-base font-bold text-white">x{combo}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 跳过按钮 */}
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all border border-gray-200"
          >
            <span className="text-base">⏭️</span>
            <span>跳过</span>
          </button>
        </div>
      </div>

      {/* 重新开始按钮（浮动按钮） */}
      <div className="absolute bottom-20 right-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRestart}
          className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg flex items-center justify-center text-white text-lg hover:shadow-xl transition-all border-4 border-white"
          title="重新开始"
        >
          🔄
        </motion.button>
      </div>
    </div>
  );
}
