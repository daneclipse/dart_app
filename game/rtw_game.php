<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>ROUND THE WORLD GAME</h1>

<a href="account.php">Back to account</a>
<a href="index.php">Quit</a>