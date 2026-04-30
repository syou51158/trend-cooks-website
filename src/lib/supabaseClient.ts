import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // 開発時に環境変数が未設定の場合の注意（本番でログ出力しない程度の情報）
  console.warn('[Supabase] 環境変数 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY が未設定です。')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// Edge Function の Authorization に利用（クライアントバンドルに既に含まれるため公開可）
export const supabaseAnonKeyPublic = supabaseAnonKey ?? ''
export const supabaseUrlPublic = supabaseUrl ?? ''