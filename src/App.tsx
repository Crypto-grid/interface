import { useWeb3React } from '@web3-react/core'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect, useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ethers } from "ethers"

// import './modules/styles/css/tailwind-base.pcss';
// import './modules/styles/css/tailwind-components.pcss';
// import './modules/styles/css/tailwind-utilities.pcss';
// import './modules/styles/css/app.css';

// // setup themes for theme switcher
// const themes = {
//   dark: './dark-theme.css',
//   light: './light-theme.css',
// };


async function App() {
  const [connected, setConnected] = useState(true)
  const web3 = useWeb3React()

  const hardhatTestnetUrl = 'http://localhost:8545';
  const networkUrl = hardhatTestnetUrl;
  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  // const getBalance = () => {
  const balance = await provider.getBalance(address); //wallet address
  const balanceFormatted = ethers.utils.formatEther(balance);

  const ERC20_ABI = [//can have more rows if required
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ]
  // }
  async function getContract(address, ERC20_ABI, provider) {
    const contract = await new ethers.Contract(address, ERC20_ABI, provider)
    return contract
  } 


  async function getContractInfo() {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const balance = await balanceOf(address);
    const balanceFormatted = ethers.utils.formatEther(balance);
  } 


  useEffect(() => {
      const activate = web3.connector.activate() as Promise<void>
    }, [])

  return (
    <div className="App">
      <Navbar/>
      {connected ? <ThreeComponent /> : <div>Loading...</div>}
      {/* <ThemeSwitcherProvider themes={themes}/> */}
    </div>
  )
}

export default App
