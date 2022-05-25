import { useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ThreeComponent/>
    </div>
  )
}

export default App
