import { motion } from 'framer-motion';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenCollection: () => void;
}

export default function MainMenu({ onStartGame, onOpenCollection }: MainMenuProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* 顶部装饰区域 */}
      <div className="relative bg-gradient-to-b from-primary to-primary/80 pt-16 pb-8">
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-32 h-32 bg-white rounded-3xl shadow-glow flex items-center justify-center"
          >
            <span className="text-7xl">🛡️</span>
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white text-center mb-2"
        >
          单词小英雄
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-semibold text-white/80 text-center"
        >
          ⚔️ 怪兽大作战 ⚔️
        </motion.p>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 px-6 py-10 flex flex-col gap-5">
        {/* 开始游戏按钮 */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartGame}
          className="w-full h-16 bg-primary rounded-full shadow-glow flex items-center justify-center gap-3 text-white text-xl font-bold"
        >
          <span>▶️</span>
          <span>开始游戏</span>
        </motion.button>

        {/* 按钮行 */}
        <div className="flex gap-3">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCollection}
            className="flex-1 h-14 bg-sky-400 rounded-2xl flex items-center justify-center gap-2 text-white text-base font-semibold"
          >
            <span>📚</span>
            <span>图鉴</span>
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 h-14 bg-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-600 text-base font-semibold"
          >
            <span>⚙️</span>
            <span>设置</span>
          </motion.button>
        </div>

        {/* 关卡选择按钮 */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-pink-400 rounded-2xl shadow-soft flex items-center justify-center gap-2 text-white text-base font-semibold"
        >
          <span>🗺️</span>
          <span>关卡选择</span>
        </motion.button>

        {/* 进度卡片 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-100 rounded-3xl p-5 flex flex-col gap-2"
        >
          <p className="text-sm font-semibold text-gray-900">当前关卡: 森林冒险 1-3</p>
          <p className="text-2xl">⭐⭐⭐☆☆</p>
        </motion.div>
      </div>
    </div>
  )
}
