<?php
/**
 * PHP Proxy for Resend API
 * To be used on Ionos Shared Hosting where Node.js SSR is not available.
 * 
 * IMPORTANT: Replace 'YOUR_RESEND_API_KEY' with your actual API key.
 * For better security, consider loading this from a non-public config file or environment variable.
 */

// Allow cross-origin requests if necessary (adjust domain for production security)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

// Get JSON input
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$name = $data["name"] ?? "";
$email = $data["email"] ?? "";
$message = $data["message"] ?? "";

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
}

// CONFIGURATION - update this!
// It is recommended to not hardcode keys in public files if possible.
// If you can, put this in a config.php outside the web root and require() it.
$resendApiKey = "re_123456789"; 

$url = "https://api.resend.com/emails";
$headers = [
    "Authorization: Bearer " . $resendApiKey,
    "Content-Type: application/json"
];

$postData = [
    "from" => "Andersseen Contact <notify@andersseen.dev>",
    "to" => ["mikhail.retinski@mrgdevelops.com"],
    "reply_to" => $email,
    "subject" => "New message from " . $name,
    "html" => "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>" .
              "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>" .
              "<p><strong>Message:</strong></p><p>" . nl2br(htmlspecialchars($message)) . "</p>"
];

// Initialize cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    http_response_code(200);
    echo json_encode(["message" => "Success", "data" => json_decode($response)]);
} else {
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to send email", 
        "error" => $response ? $response : $curlError,
        "debug_code" => $httpCode
    ]);
}
?>
