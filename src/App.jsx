import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div>
      <Header></Header>
      <Footer></Footer>
      <ToastContainer />
    </div>
    
  )
}

export default App
