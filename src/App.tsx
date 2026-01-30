import { useState } from 'react'
import MainMenu from './components/MainMenu'
import GameScreen from './components/GameScreen'
import VictoryScreen from './components/VictoryScreen'
import DefeatScreen from './components/DefeatScreen'
import CollectionScreen from './components/CollectionScreen'

type ScreenType = 'menu' | 'game' | 'victory' | 'defeat' | 'collection'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu')
  const [defeatReason, setDefeatReason] = useState<'timeout' | 'tooManySkips'>('tooManySkips')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MainMenu onStartGame={() => setCurrentScreen('game')} onOpenCollection={() => setCurrentScreen('collection')} />
      case 'game':
        return <GameScreen
          onVictory={() => setCurrentScreen('victory')}
          onDefeat={(reason) => {
            setDefeatReason(reason);
            setCurrentScreen('defeat');
          }}
        />
      case 'victory':
        return <VictoryScreen onContinue={() => setCurrentScreen('menu')} />
      case 'defeat':
        return <DefeatScreen
          defeatReason={defeatReason}
          onContinue={() => setCurrentScreen('game')}
          onBackToMenu={() => setCurrentScreen('menu')}
        />
      case 'collection':
        return <CollectionScreen onBack={() => setCurrentScreen('menu')} />
      default:
        return <MainMenu onStartGame={() => setCurrentScreen('game')} onOpenCollection={() => setCurrentScreen('collection')} />
    }
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {renderScreen()}
    </div>
  )
}

export default App
