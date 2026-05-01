import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SignageApp from './SignageApp'
import AdminLayout from './admin/AdminLayout'
import AdminSignageSettings from './admin/AdminSignageSettings'

// ユーザーが作成した管理画面ページ
import AdminLogin from './admin/pages/Login'
import AdminDashboard from './admin/pages/Dashboard'
import AdminNewsList from './admin/pages/NewsList'
import AdminEventsList from './admin/pages/EventsList'
import AdminReservationsList from './admin/pages/ReservationsList'
import AdminContactsList from './admin/pages/ContactsList'
import AdminMenuList from './admin/pages/MenuList'
import AdminGalleryList from './admin/pages/GalleryList'
import AdminStaffList from './admin/pages/StaffList'
import AdminSiteSettings from './admin/pages/SiteSettings'

// ユーザーが作成した公開側ページ
import NewsIndex from './pages/NewsIndex'
import NewsDetail from './pages/NewsDetail'

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
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/news" element={<NewsIndex />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Admin Login (Outside Layout to prevent infinite redirect) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes (Require Authentication) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNewsList />} />
            <Route path="events" element={<AdminEventsList />} />
            <Route path="reservations" element={<AdminReservationsList />} />
            <Route path="contacts" element={<AdminContactsList />} />
            <Route path="menu" element={<AdminMenuList />} />
            <Route path="gallery" element={<AdminGalleryList />} />
            <Route path="staff" element={<AdminStaffList />} />
            <Route path="settings" element={<AdminSiteSettings />} />
            <Route path="signage" element={<AdminSignageSettings />} />
            <Route path="*" element={<div className="p-8">ページが見つかりません</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )}
  </StrictMode>,
)
