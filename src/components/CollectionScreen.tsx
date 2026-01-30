import { motion } from 'framer-motion';

interface CollectionScreenProps {
  onBack: () => void;
}

export default function CollectionScreen({ onBack }: CollectionScreenProps) {
  const cards = [
    { emoji: '🍎', chinese: '苹果', english: 'Apple' },
    { emoji: '🐶', chinese: '狗', english: 'Dog' },
    { emoji: '🐱', chinese: '猫', english: 'Cat' },
    { emoji: '🐦', chinese: '鸟', english: 'Bird' },
    { emoji: '❓', chinese: '???', english: '未解锁', unlocked: false },
    { emoji: '🌈', chinese: '彩虹', english: 'Rainbow' },
  ];

  const badges = [
    { emoji: '🌟', name: '初级学者', desc: '收集10个单词', color: 'bg-amber-50' },
    { emoji: '📚', name: '单词达人', desc: '收集50个单词', color: 'bg-green-50' },
    { emoji: '🔥', name: '连击大师', desc: '达到5连击', color: 'bg-purple-50' },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white h-screen flex flex-col">
      {/* 图鉴标题 */}
      <div className="bg-primary pt-12 pb-6">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          📚 单词图鉴
        </h1>
        <p className="text-sm font-medium text-white/80 text-center">
          已收集: 12/50  |  完成度: 24%
        </p>
      </div>

      {/* 过滤器行 */}
      <div className="px-6 py-4 bg-white flex gap-3">
        <button className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-900">
          <span>📂</span>
          <span>全部 ▼</span>
        </button>

        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <span className="text-base">🔍</span>
          <span className="text-sm font-medium text-gray-500">搜索单词...</span>
        </div>
      </div>

      {/* 卡片网格 */}
      <div className="flex-1 px-6 py-4 bg-white overflow-auto">
        <div className="grid grid-cols-3 gap-2">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              className={`rounded-2xl p-3 shadow-soft flex flex-col items-center gap-1 ${
                card.unlocked ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <span className="text-4xl">{card.emoji}</span>
              <p className={`text-xs font-bold ${card.unlocked ? 'text-gray-400' : 'text-gray-900'}`}>
                {card.chinese}
              </p>
              <p className={`text-[10px] font-medium ${card.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                {card.english}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 成就区域 */}
        <div className="mt-6 pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">🏆 我的成就</h2>

          <div className="flex gap-3 mb-4">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex-1 ${badge.color} rounded-2xl p-3 shadow-soft flex flex-col items-center gap-1`}
              >
                <span className="text-3xl">{badge.emoji}</span>
                <p className="text-xs font-bold text-gray-900">{badge.name}</p>
                <p className="text-[10px] font-medium text-gray-600">{badge.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* 统计卡片 */}
          <div className="bg-primary rounded-3xl p-5 shadow-glow">
            <h3 className="text-base font-bold text-white mb-3">📊 学习统计</h3>

            <div className="flex gap-3">
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-white">2.5小时</p>
                <p className="text-xs font-medium text-white/80">学习时长</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-white">12个</p>
                <p className="text-xs font-medium text-white/80">掌握单词</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-white">x8</p>
                <p className="text-xs font-medium text-white/80">最高连击</p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white">总进度</span>
                <span className="text-sm font-bold text-white">24%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full p-0.5">
                <div className="h-full bg-white rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="p-6 bg-white border-t">
        <button
          onClick={onBack}
          className="w-full h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold"
        >
          ← 返回主菜单
        </button>
      </div>
    </div>
  )
}
