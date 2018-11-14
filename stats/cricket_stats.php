<?php

session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

?>


<h1>CRICKET STATS FOR <?=$user_username;?></h1>