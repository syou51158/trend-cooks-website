import { createClient } from '@supabase/supabase-js';

// Trend Order用のSupabase接続設定
const supabaseUrl = 'https://ksorbgkfpzofofzjugmc.supabase.co';
// Trend Orderの .env に記載されていた ANON KEY を使用
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb3JiZ2tmcHpvZm9memp1Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NDEzODEsImV4cCI6MjA4MzUxNzM4MX0.lOL6Bne_UDM_YZeH75kGvLdCWl2c29iCeEJvc46Whtw';

export const trendOrderSupabase = createClient(supabaseUrl, supabaseAnonKey);
