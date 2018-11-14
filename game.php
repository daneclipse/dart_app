<?php

include('connection.php');
session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/general.css">
</head>
<body>

	<h1><?=$user_username;?></h1>

	<div class="game_setup">
		<?php
			if (isset($game)) 
			{
				if ($game == 'x01') 
				{
					$game = 'X01';
					include('game/x01_game.php');
				}
				else if ($game == 'cricket')
				{
					$game = 'Cricket';
					include('game/cricket_game.php');
				}
				else if ($game == 'hundred')
				{
					$game = '100 Darts';
					include('game/hundred_game.php');
				}
				else if ($game == 'rtw')
				{
					$game = 'Round the world';
					include('game/rtw_game.php');
				}
				else if ($game == 'nandc')
				{
					$game = 'Noughts & crosses';
					include('game/nandc_game.php');
				}
				else
				{
					$game = undefined;
				}
			}
		?>
	</div>

	<a href="account.php">Back to account</a>
	<a href="index.php">Logout</a>

</body>
</html>