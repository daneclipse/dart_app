<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>NOUGHTS & CROSSES SETUP</h1>
<a href="game.php">start game</a>