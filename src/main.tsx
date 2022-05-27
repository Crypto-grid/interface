import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DAppProvider, useEtherBalance, useEthers, Config, Polygon, DAppProviderProps } from '@usedapp/core'
import { getDefaultProvider } from 'ethers';

document.body.style.overflow = "hidden"; //removes scroll from parent
document.body.classList.add("no-scroll");

const config: Config = {

}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Error loading page</div>}>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
    </Suspense>
  </React.StrictMode>
)
