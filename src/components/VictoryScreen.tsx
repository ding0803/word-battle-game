import { motion } from 'framer-motion';

interface VictoryScreenProps {
  onContinue: () => void;
  onBackToMenu: () => void;
}

export default function VictoryScreen({ onContinue, onBackToMenu }: VictoryScreenProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white h-screen flex flex-col">
      {/* 胜利标题区域 */}
      <div className="bg-gradient-to-b from-indigo-900 to-indigo-700 pt-12 pb-6">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-5xl font-bold text-gold text-center mb-2"
        >
          🎉 胜利! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base font-semibold text-white text-center"
        >
          怪兽被打败了!
        </motion.p>
      </div>

      {/* 宝箱区域 */}
      <div className="px-6 py-10 bg-white flex flex-col items-center gap-5">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-40 h-40 bg-amber-700 rounded-3xl shadow-glow flex items-center justify-center"
        >
          <span className="text-8xl">📦</span>
        </motion.div>

        <p className="text-base font-semibold text-primary text-center">
          点击宝箱开启奖励!
        </p>
      </div>

      {/* 奖励区域 */}
      <div className="flex-1 px-6 pb-6 bg-white flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          ⭐⭐⭐ 获得的卡片
        </h2>

        {/* 卡片行 */}
        <div className="flex gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="flex-1 bg-white rounded-2xl p-4 shadow-soft flex flex-col items-center gap-2"
          >
            <span className="text-5xl">🍎</span>
            <p className="text-base font-bold text-gray-900">Apple</p>
            <p className="text-sm font-medium text-gray-600">苹果</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="flex-1 bg-white rounded-2xl p-4 shadow-soft flex flex-col items-center gap-2"
          >
            <span className="text-5xl">🐶</span>
            <p className="text-base font-bold text-gray-900">Dog</p>
            <p className="text-sm font-medium text-gray-600">狗</p>
          </motion.div>
        </div>

        {/* 继续按钮 */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full h-16 bg-gradient-to-r from-gold to-orange-600 rounded-full shadow-glow flex items-center justify-center gap-2 text-white text-xl font-bold mt-auto"
        >
          <span>▶️</span>
          <span>继续挑战</span>
        </motion.button>
      </div>
    </div>
  )
}
