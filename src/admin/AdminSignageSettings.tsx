import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminSignageSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('auto');
  const [message, setMessage] = useState('');
  const [id, setId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('signage_settings')
      .select('*')
      .limit(1)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching signage settings:', error);
    } else if (data) {
      setId(data.id);
      setStatus(data.override_status || 'auto');
      setMessage(data.custom_message || '');
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      if (id) {
        const { error } = await supabase
          .from('signage_settings')
          .update({
            override_status: status,
            custom_message: message || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
          
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('signage_settings')
          .insert([{
            override_status: status,
            custom_message: message || null
          }])
          .select()
          .single();
          
        if (error) throw error;
        if (data) setId(data.id);
      }
      
      setSuccessMsg('サイネージ設定を更新しました。');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('保存に失敗しました。');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800">サイネージ手動コントロール</h2>
      <p className="text-gray-600 mb-6">
        店頭のサイネージ（電子看板）の表示状態を強制的に上書きします。
        通常は「自動」にしておくことで、時間帯に合わせて自動で切り替わります。
      </p>

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 border border-green-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            現在の表示ステータス
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="status"
                value="auto"
                checked={status === 'auto'}
                onChange={(e) => setStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                <span className="block font-medium">自動（時刻で判定）</span>
                <span className="block text-sm text-gray-500">基本設定。時間帯に合わせて自動で切り替わります。</span>
              </span>
            </label>

            <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 border-yellow-200 bg-yellow-50/30">
              <input
                type="radio"
                name="status"
                value="preparing"
                checked={status === 'preparing'}
                onChange={(e) => setStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                <span className="block font-medium text-yellow-800">準備中（強制）</span>
                <span className="block text-sm text-gray-600">仕入れなどでオープンが遅れる場合などに使用します。</span>
              </span>
            </label>

            <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 border-green-200 bg-green-50/30">
              <input
                type="radio"
                name="status"
                value="open_day"
                checked={status === 'open_day'}
                onChange={(e) => setStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                <span className="block font-medium text-green-800">営業中：昼（強制）</span>
                <span className="block text-sm text-gray-600">強制的にDAYモードの営業中表示にします。</span>
              </span>
            </label>

            <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 border-blue-200 bg-blue-50/30">
              <input
                type="radio"
                name="status"
                value="open_night"
                checked={status === 'open_night'}
                onChange={(e) => setStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                <span className="block font-medium text-blue-800">営業中：夜（強制）</span>
                <span className="block text-sm text-gray-600">強制的にNIGHTモードの営業中表示にします。</span>
              </span>
            </label>

            <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 border-gray-200 bg-gray-50/50">
              <input
                type="radio"
                name="status"
                value="closed"
                checked={status === 'closed'}
                onChange={(e) => setStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                <span className="block font-medium text-gray-800">閉店・終了（強制）</span>
                <span className="block text-sm text-gray-600">早めに店を閉める場合や休業日に使用します。</span>
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カスタムメッセージ（任意）
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="例：本日仕入れのため、12:00よりオープンいたします。"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            ※入力すると、サイネージ上部のメッセージがこの文章で上書きされます。（空欄の場合はデフォルトの文章が表示されます）
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {saving ? '保存中...' : 'サイネージの表示を更新する'}
        </button>
      </form>
    </div>
  );
}