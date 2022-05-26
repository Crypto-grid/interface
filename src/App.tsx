import { useWeb3React } from '@web3-react/core'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect, useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { Login } from './login/Login'
import { ethers } from "ethers"

import { deployedContractAddresses }  from './utils/deployedContractAddresses';

// import './modules/styles/css/tailwind-base.pcss';
// import './modules/styles/css/tailwind-components.pcss';
// import './modules/styles/css/tailwind-utilities.pcss';
// import './modules/styles/css/app.css';

// // setup themes for theme switcher
// const themes = {
//   dark: './dark-theme.css',
//   light: './light-theme.css',
// };



function App() {
  // const { aggregator, grid, mine, upgrades, hardware } = deployedContractAddresses

  const [connected, setConnected] = useState(false)
  useEffect(() => {
      setConnected(false)
  }, [])

  
  const grid = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

  const hardhatTestnetUrl = 'http://localhost:8545';
  const networkUrl = hardhatTestnetUrl;
  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  // const getBalance = () => {
  // const balance = await provider.getBalance(address); //wallet address
  // const balanceFormatted = ethers.utils.formatEther(balance);

  const ERC20_ABI = [//can have more rows if required
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ]
  // }
  async function getContract(address, ERC20_ABI, provider) {
    const contract = await new ethers.Contract(address, ERC20_ABI, provider)
    console.log("contract: ", contract);
    return contract
  } 


  async function getContractInfo(contract, address) {
    // const name = await contract.name();
    // const symbol = await contract.symbol();
    // const totalSupply = await contract.totalSupply();
    const balance = await contract.balanceOf(address);
    const balanceFormatted = ethers.utils.formatEther(balance);
    return [name, symbol, balance, balanceFormatted]
  } 

  const gridContract = getContract(grid, ERC20_ABI, provider);
  // const [gridName,, gridBalanceFormatted] = getContractInfo(gridContract, grid);
  const gridBalanceFormatted = getContractInfo(gridContract, grid);

  console.log("gridbalance: ", grid);

  return (
    <div className="App">
      {/* <Navbar gridBalanceFormatted={gridBalanceFormatted}/> */}
      {/* {connected ? <ThreeComponent /> : <Login/>} */}
      <ThreeComponent />
      {/* <ThemeSwitcherProvider themes={themes}/> */}
    </div>
  )
}

export default App
