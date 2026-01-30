import { motion } from 'framer-motion';

interface DefeatScreenProps {
  onContinue: () => void;
  onBackToMenu: () => void;
  defeatReason?: 'timeout' | 'tooManySkips'; // 失败原因
}

export default function DefeatScreen({ onContinue, onBackToMenu, defeatReason = 'tooManySkips' }: DefeatScreenProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }} />

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 失败图标 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-6"
        >
          <div className="text-8xl">😢</div>
        </motion.div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-black text-gray-800 mb-3 text-center"
        >
          游戏结束
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg font-semibold text-gray-600 mb-8 text-center"
        >
          {defeatReason === 'timeout' ? '时间到了' : '跳过了太多单词'}
        </motion.p>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-8 border-2 border-red-200 w-full max-w-xs"
        >
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-500 mb-2">失败原因</p>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl">{defeatReason === 'timeout' ? '⏰' : '⏭️'}</span>
              <span className="text-xl font-bold text-red-500">
                {defeatReason === 'timeout' ? '时间耗尽' : '跳过数量过多'}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {defeatReason === 'timeout' ? '60秒内没有完成单词' : '跳过了 10 个或更多单词'}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-medium text-gray-500 mb-1">💡 温馨提示</p>
            <p className="text-sm text-gray-600 text-center">
              {defeatReason === 'timeout' ? '要加快速度哦！' : '继续努力，不要轻易放弃哦！'}
            </p>
          </div>
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <button
            onClick={onContinue}
            className="w-full h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          >
            <span className="text-xl">🔄</span>
            <span className="text-lg font-bold text-white">再试一次</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full h-12 bg-gray-200 hover:bg-gray-300 rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-lg">🏠</span>
            <span className="text-base font-semibold text-gray-700">返回主菜单</span>
          </button>
        </motion.div>
      </div>

      {/* 装饰性元素 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 text-gray-400 text-sm"
      >
        单词小英雄 - 怪兽大作战
      </motion.div>
    </div>
  );
}
