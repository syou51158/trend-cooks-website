import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SignageApp from './SignageApp'
import AdminLayout from './admin/AdminLayout'
import AdminSignageSettings from './admin/AdminSignageSettings'
// i18n 初期化
import './lib/i18n'

const isSignageMode = window.location.pathname.includes('/signage') && !window.location.pathname.includes('/admin/signage') || window.location.search.includes('mode=signage');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSignageMode ? (
      <SignageApp />
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<div className="p-8">ダッシュボード機能は今後実装</div>} />
            <Route path="signage" element={<AdminSignageSettings />} />
            <Route path="*" element={<div className="p-8">ページ作成中...</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )}
  </StrictMode>,
)
