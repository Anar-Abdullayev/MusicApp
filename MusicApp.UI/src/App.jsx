import './App.css'
import api, { setupAxiosInterceptors } from './api'
import { useEffect, useState } from 'react'
import { baseURL } from './assets/baseEnvironment'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    setupAxiosInterceptors(navigate)
  }, [])

  return (
    <Routes>
      <Route path='/' element={localStorage.getItem("TOKEN_KEY") ? <div>Main Page</div> : <LoginRegister />}></Route>
    </Routes>
  )
}

function AppWrapper(){
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
