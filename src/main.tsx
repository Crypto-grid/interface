import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connectors } from './modules/provider/Provider'

document.body.style.overflow = "hidden"; //removes scroll from parent
document.body.classList.add("no-scroll");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Error loading page</div>}>'
      
      <Web3ReactProvider connectors={connectors}>
        <App />
        </Web3ReactProvider>
    </Suspense>
  </React.StrictMode>
)
