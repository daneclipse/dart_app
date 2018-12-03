<?php

include('connection.php');
session_start();
$user_username = $_SESSION['username'];
$game = $_GET['game'];


if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
	if (isset($_POST['logout'])) 
	{
		$select_user = "SELECT * FROM users WHERE username= '$user_username'";
		$select_query = mysqli_query($dbc, $select_user);
		$user_found = mysqli_num_rows($select_query);
		if ($user_found > 0) 
		{
			$update_last_active = "UPDATE users SET last_active=NOW() WHERE username= '$user_username'";
			$last_active_query = mysqli_query($dbc, $update_last_active);
			header('Location: index.php');
		}
		else 
		{
			echo 'NO USER FOUND';
		}
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="stylesheet" type="text/css" href="css/game_setup.css">
</head>
<body>

	<div class="page">
		<div class="user_area">
			<p><?=$user_username;?></p>
			<form action="account.php" method="post">
				<input type="submit" name="logout" value="LOGOUT" class="logout">
			</form>
		</div>

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
					else if ($game == 'darts_at')
					{
						$game = 'Darts at';
						include('game_setup/darts_at_setup.php');
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
		<a href="account.php">back to account</a>
	
	</div>

</body>
</html>
