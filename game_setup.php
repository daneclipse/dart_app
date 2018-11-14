<?php

include('connection.php');
session_start();
$user_username = $_SESSION['username'];
$game = $_GET['game'];


?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/game_setup.css">
</head>
<body>

	<div class="page">

		<h1><?=$user_username;?></h1>

		<div class="game_setup">
			<?php
				if (isset($game)) 
				{
					$_SESSION['game'] = $game;
					if ($game == 'x01') 
					{
						$game = 'X01';
						include('game_setup/x01_setup.php');
					}
					else if ($game == 'cricket')
					{
						$game = 'Cricket';
						include('game_setup/cricket_setup.php');
					}
					else if ($game == 'hundred')
					{
						$game = '100 Darts';
						include('game_setup/hundred_setup.php');
					}
					else if ($game == 'rtw')
					{
						$game = 'Round the world';
						include('game_setup/rtw_setup.php');
					}
					else if ($game == 'nandc')
					{
						$game = 'Noughts & crosses';
						include('game_setup/nandc_setup.php');
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
	
	</div>

<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

<script type="text/javascript">

	// GET RELEVANT JS SCRIPT DEPENDING ON GAME SELECTED
	var game = '<?=$game;?>';
	if (game == 'x01') 
	{
		$.getScript('game/x01_game.js');

	}
</script>

</body>
</html>
