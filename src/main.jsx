// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './authContext.jsx'
import { ChatContextProvider } from './ChatContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>

    <BrowserRouter>
        <App />
        </BrowserRouter>



    </ChatContextProvider>
   
   </AuthContextProvider>
 
)
