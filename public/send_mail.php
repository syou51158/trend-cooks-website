<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONSメソッドの場合はCORS許可のみで終了
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// JSONデータを取得
$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$type = $data['type'] ?? 'inquiry';
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$message = $data['message'] ?? '';
$date = $data['reservation_date'] ?? '';
$time = $data['reservation_time'] ?? '';
$guests = $data['guests'] ?? '';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Required fields missing']);
    exit;
}

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ===== 1. 店舗宛の通知メール =====
$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    
    // SMTPサーバー設定
    $mail->isSMTP();
    $mail->Host       = 'smtp.lolipop.jp';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@trendcooks.com';
    $mail->Password   = 'Syou108810--';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ポート465用
    $mail->Port       = 465;

    // 送信元・宛先設定
    $mail->setFrom('info@trendcooks.com', 'Trend Cooks WebSystem');
    $mail->addAddress('info@trendcooks.com', 'Trend Cooks'); // 店舗宛
    $mail->addReplyTo($email, $name); // 返信先をお客様のアドレスに

    // 件名と本文
    $mail->Subject = $type === 'reservation' ? "【Trend Cooks】WEBからのご予約" : "【Trend Cooks】WEBからのお問い合わせ";
    
    $body = "WEBサイトから以下の内容で送信がありました。\n\n";
    $body .= "■種別: " . ($type === 'reservation' ? "席のご予約" : "お問い合わせ") . "\n";
    $body .= "■お名前: {$name}\n";
    $body .= "■メールアドレス: {$email}\n";
    $body .= "■電話番号: {$phone}\n";
    
    if ($type === 'reservation') {
        $body .= "■希望日: {$date}\n";
        $body .= "■希望時間: {$time}\n";
        $body .= "■人数: {$guests}名\n";
    }
    
    $body .= "\n■メッセージ・希望メニュー\n{$message}\n";
    
    $mail->Body = $body;
    $mail->send();

    // ===== 2. お客様への自動返信メール（控え） =====
    $mail2 = new PHPMailer(true);
    $mail2->CharSet = 'UTF-8';
    $mail2->isSMTP();
    $mail2->Host       = 'smtp.lolipop.jp';
    $mail2->SMTPAuth   = true;
    $mail2->Username   = 'info@trendcooks.com';
    $mail2->Password   = 'Syou108810--';
    $mail2->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail2->Port       = 465;

    $mail2->setFrom('info@trendcooks.com', 'Trend Cooks');
    $mail2->addAddress($email, $name); // お客様宛

    $mail2->Subject = $type === 'reservation' ? "【Trend Cooks】ご予約を受け付けました" : "【Trend Cooks】お問い合わせを受け付けました";
    
    $body2 = "{$name} 様\n\n";
    $body2 .= "Trend Cooks（トレンドクックス）をご利用いただき、誠にありがとうございます。\n";
    $body2 .= "以下の内容で送信を受け付けました。\n\n";
    $body2 .= "内容を確認のうえ、担当者よりご連絡させていただきますので、今しばらくお待ちくださいませ。\n";
    $body2 .= "--------------------------------------------------\n";
    $body2 .= $body;
    $body2 .= "--------------------------------------------------\n\n";
    $body2 .= "Trend Cooks（トレンドクックス）\n";
    $body2 .= "滋賀県大津市柳が崎9-15\n";
    $body2 .= "https://trendcooks.com\n";

    $mail2->Body = $body2;
    $mail2->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Mail could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}
