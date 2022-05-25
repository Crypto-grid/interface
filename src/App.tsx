import { useEffect, useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'

function App() {
  const [connected, setConnected] = useState(false)

  useEffect(
    () => {
      if (window.ethereum) {
        setConnected(true)
      }
    }, [])
    
  return (
    <div className="App">
      <Navbar/>
      {connected ? <ThreeComponent /> : <div>Loading...</div>}
    </div>
  )
}

export default App
