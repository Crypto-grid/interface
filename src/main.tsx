import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css'
import { Web3Provider } from '@ethersproject/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Error loading page</div>}>
      <Web3ReactProvider getLibrary={(provider, connector) => {
        return new Web3Provider(provider)
      }}>
        <App />
      </Web3ReactProvider>
    </Suspense>
  </React.StrictMode>
)
