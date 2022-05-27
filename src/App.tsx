import { useEffect, useState } from 'react'
import './App.css'
import ThreeComponent from './modules/game'
import { Navbar } from './modules/navbar/Navbar'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { Login } from './login/Login'

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
  const [connected, setConnected] = useState(false)
  useEffect(() => {
      setConnected(false)
  }, [])

  return (
    <div className="App">
      <Navbar/>
      {connected ? <ThreeComponent /> : <Login set={(connect: boolean) => {setConnected(connect)}}/>}
      {/* <ThemeSwitcherProvider themes={themes}/> */}
    </div>
  )
}

export default App
