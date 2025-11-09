import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import PortfolioDashboard from './components/PortfolioDashboard'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="App">
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <PortfolioDashboard />
    </div>
  )
}

export default App

