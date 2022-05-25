import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css'
import { connectors, Web3Provider } from './modules/provider/Provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Error loading page</div>}>'
      
      <Web3ReactProvider connectors={connectors}>
        <App />
        </Web3ReactProvider>
    </Suspense>
  </React.StrictMode>
)
