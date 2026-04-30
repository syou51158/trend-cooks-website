import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  // 管理者判定とエラーメッセージ
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthenticated(!!data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 認証後に管理者かどうか確認
  useEffect(() => {
    if (!authenticated) {
      setIsAdmin(null);
      return;
    }
    (async () => {
      setAdminError(null);
      const { data: userResp } = await supabase.auth.getUser();
      const user = userResp.user;
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase.rpc('is_admin', { uid: user.id });
      if (error) {
        setAdminError(error.message);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    })();
  }, [authenticated]);

  // 自分を管理者に登録（初回ブートストラップ: admins が空のときのみ許可）
  const grantSelfAdmin = async () => {
    setAdminError(null);
    const { data: userResp } = await supabase.auth.getUser();
    const user = userResp.user;
    if (!user) return;
    const { error } = await supabase
      .from('admins')
      .insert({ user_id: user.id, email: user.email ?? null });
    if (error) {
      setAdminError(error.message);
    } else {
      setIsAdmin(true);
    }
  };

  if (loading) return <div className="p-8 text-sm text-trend-muted">認証確認中...</div>;
  if (!authenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return (
    <div className="min-h-screen bg-trend-bg text-trend-text">
      <header className="border-b border-trend-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin" className="font-bold text-trend-accent">Admin</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/admin/news" className="hover:underline">ニュース</Link>
            <Link to="/admin/events" className="hover:underline">イベント</Link>
            <Link to="/admin/reservations" className="hover:underline">予約</Link>
            <Link to="/admin/contacts" className="hover:underline">お問い合わせ</Link>
            <Link to="/admin/menu" className="hover:underline">メニュー</Link>
            <Link to="/admin/gallery" className="hover:underline">ギャラリー</Link>
            <Link to="/admin/staff" className="hover:underline">スタッフ</Link>
            <Link to="/admin/settings" className="hover:underline">設定</Link>
            <Link to="/" className="hover:underline">サイトを見る</Link>
            <button
              className="hover:underline"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              ログアウト
            </button>
          </nav>
        </div>
      </header>

      {/* 管理者未登録時のブートストラップ通知 */}
      {authenticated && isAdmin === false && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-amber-800 flex items-center justify-between">
            <div>
              初回セットアップ: 現在このアカウントは管理者権限がありません。
              {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
            </div>
            <button
              className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-medium rounded px-3 py-1"
              onClick={grantSelfAdmin}
            >
              自分を管理者に登録
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}