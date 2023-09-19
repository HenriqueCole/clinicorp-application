import { App } from '@/App.tsx'
import { Tasks } from '@/pages/Tasks/'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>

      <Routes>
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
