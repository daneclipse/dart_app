<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>ROUND THE WORLD SETUP</h1>
<a href="game.php" class="button green_button start_button">start game</a>