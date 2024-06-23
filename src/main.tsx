import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Auth}from './context/user/AuthContext.tsx'
import Footer from './components/footer/Footer.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth>
    <App />
    <Footer/>
    </Auth>
  </React.StrictMode>

)
