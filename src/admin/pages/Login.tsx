import { FormEvent, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/admin' },
      });
      if (error) throw error;
      setMessage('ログインリンクを送信しました。メールをご確認ください。');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : '送信に失敗しました。時間をおいて再度お試しください。'
      );
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setMessage(null);
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/admin' },
      });
      if (error) throw error;
      // リダイレクトが開始されます
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Googleログインでエラーが発生しました。'
      );
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">管理ログイン</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-sm mb-1">メールアドレス</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-trend-accent/30 rounded px-3 py-2 bg-transparent"
            placeholder="you@example.com"
          />
        </label>
        {/* CAPTCHA ブロック削除 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trend-accent text-black font-semibold rounded px-3 py-2 disabled:opacity-60"
        >
          {loading ? '送信中...' : 'ログインリンクを送る'}
        </button>
      </form>
      <button
        type="button"
        onClick={onGoogleLogin}
        disabled={googleLoading}
        className="w-full border border-trend-accent/50 rounded px-3 py-2 mt-4 hover:bg-trend-accent/10 disabled:opacity-60"
      >
        {googleLoading ? 'リダイレクト中...' : 'Googleでログイン'}
      </button>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}