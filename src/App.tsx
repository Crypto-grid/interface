import { useWeb3React } from '@web3-react/core'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect, useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'

function App() {
  const [connected, setConnected] = useState(true)
  const web3 = useWeb3React()

  useEffect(() => {
      const activate = web3.connector.activate() as Promise<void>
    }, [])

  return (
    <div className="App">
      <Navbar/>
      {connected ? <ThreeComponent /> : <div>Loading...</div>}
    </div>
  )
}

export default App
