import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SignageApp from './SignageApp'
// i18n 初期化
import './lib/i18n'

const isSignageMode = window.location.pathname.startsWith('/signage') || window.location.search.includes('mode=signage');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSignageMode ? <SignageApp /> : <App />}
  </StrictMode>,
)
