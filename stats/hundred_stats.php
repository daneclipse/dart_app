<?php

session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

?>


<h1>100 DARTS STATS FOR <?=$user_username;?></h1>