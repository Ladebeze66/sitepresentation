<?php
$pdo = new PDO('sqlite:messages.db');
$pdo->exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT, email TEXT, message TEXT)");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $pdo->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->execute([$_POST['name'], $_POST['email'], $_POST['message']]);
    echo "Message sauvegardé avec succès.";
}
?>
