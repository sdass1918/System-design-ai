import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard.tsx'
import { Course } from './Course.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/' />
      <Route element={<Dashboard />} path='/dashboard' />
      <Route element={<Course />} path='/course' />
    </Routes>
  </BrowserRouter>
)
