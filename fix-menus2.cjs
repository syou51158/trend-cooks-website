const { createClient } = require('@supabase/supabase-js');
const iconv = require('iconv-lite');
const supabase = createClient('https://ksorbgkfpzofofzjugmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb3JiZ2tmcHpvZm9memp1Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NDEzODEsImV4cCI6MjA4MzUxNzM4MX0.lOL6Bne_UDM_YZeH75kGvLdCWl2c29iCeEJvc46Whtw');

async function fixMenus() {
  const { data } = await supabase.from('menus').select('id, name');
  let count = 0;
  for (const item of data) {
    if (!item.name) continue;

    // 化けた文字列をShift_JISでエンコードすれば元のUTF-8バイト列が手に入るはず
    const sjisBuf = iconv.encode(item.name, 'shift_jis');
    const restored = sjisBuf.toString('utf8');
    
    // 全てが文字化けしているわけではないので、元に戻った文字列が正しい日本語っぽければUpdateする
    if (item.name !== restored && restored.length > 0 && !restored.includes('\uFFFD')) {
       console.log(item.name, '=>', restored);
       await supabase.from('menus').update({ name: restored }).eq('id', item.id);
       count++;
    }
  }
  console.log(`Fixed ${count} items.`);
}
fixMenus();