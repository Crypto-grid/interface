import { useWeb3React } from '@web3-react/core'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect, useState, useContext } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
// import { ethers } from "ethers";
import { Web3ProviderContext } from "ethers-react";

import './modules/styles/css/tailwind-base.pcss';
import './modules/styles/css/tailwind-components.pcss';
import './modules/styles/css/tailwind-utilities.pcss';
import './modules/styles/css/app.css';

// setup themes for theme switcher
const themes = {
  dark: './dark-theme.css',
  light: './light-theme.css',
};


function App() {
  const [connected, setConnected] = useState(true)
  const web3 = useWeb3React()

  useEffect(() => {
      const activate = web3.connector.activate() as Promise<void>
    }, [])

  // // 🦊 Get your web3 ethers context from current providers
  // const ethersContext = useEthersContext();
  //   // 🏭 connect to contracts for mainnet network & signer
  //   const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  //   useConnectAppContracts(mainnetAdaptor);
  //   // 🏭 connec to  contracts for current network & signer
  //   useConnectAppContracts(asEthersAdaptor(ethersContext));

  //     // init contracts
  // const Grid = useAppContracts('GridContract', ethersContext.chainId);
  // const mainnetDai = useAppContracts('DAI', NETWORKS.harmony.chainId);

  // A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
// const provider = new ethers.providers.Web3Provider(window.ethereum)

// // MetaMask requires requesting permission to connect users accounts
// await provider.send("eth_requestAccounts", []); // needs to be async

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()


const { connectedAccount, balance } = useContext(Web3ProviderContext);

  return (
    <div className="App">
      <Navbar connectedAccount={connectedAccount} balance={balance}/>
      {connected ? <ThreeComponent /> : <div>Loading...</div>}
      {/* <ThemeSwitcherProvider themes={themes}/> */}
    </div>
  )
}

export default App
