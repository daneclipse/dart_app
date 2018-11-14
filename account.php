<?php

include('connection.php');
session_start();

$user_username = $_SESSION['username'];

?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<h1><?=$user_username;?></h1>

	<a href="game_setup.php?game=x01">X01</a>
	<a href="game_setup.php?game=cricket">cricket</a>
	<a href="game_setup.php?game=hundred">100 Darts</a>
	<a href="game_setup.php?game=rtw">round the world</a>
	<a href="game_setup.php?game=nandc">noughts & crosses</a>

	<a href="index.php">Logout</a>

</body>
</html>