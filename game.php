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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

	<h1><?=$user_username;?></h1>

	<div class="page">
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
	
	<div class="account_buttons">
		<a href="account.php">Back to account</a>
		<a href="index.php">Logout</a>
	</div>

</body>
</html>