import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  try {
    // Webhook payload from Supabase
    const payload = await req.json();
    
    // Check if this is an INSERT operation
    if (payload.type !== "INSERT" || payload.table !== "contacts") {
      return new Response(JSON.stringify({ error: "Invalid payload type or table" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const record = payload.record;
    
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Determine subject and email body based on the type (reservation or inquiry)
    const isReservation = record.type === "reservation";
    const subject = isReservation 
      ? `【新規予約】${record.name}様より` 
      : `【お問い合わせ】${record.name}様より`;
      
    let htmlContent = `<h2>新しい${isReservation ? '予約' : 'お問い合わせ'}がありました。</h2>`;
    htmlContent += `<p><strong>お名前:</strong> ${record.name || '未入力'}</p>`;
    htmlContent += `<p><strong>メールアドレス:</strong> ${record.email || '未入力'}</p>`;
    htmlContent += `<p><strong>電話番号:</strong> ${record.phone || '未入力'}</p>`;
    
    if (isReservation) {
      htmlContent += `<p><strong>予約日:</strong> ${record.reservation_date || '未入力'}</p>`;
      htmlContent += `<p><strong>予約時間:</strong> ${record.reservation_time || '未入力'}</p>`;
      htmlContent += `<p><strong>人数:</strong> ${record.guests || '未入力'}名</p>`;
    }
    
    htmlContent += `<p><strong>メッセージ:</strong><br/>${record.message ? record.message.replace(/\n/g, '<br/>') : '未入力'}</p>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>", // Change this to your verified domain in production
        to: ["info@trendcooks.com"],
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API Error: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});