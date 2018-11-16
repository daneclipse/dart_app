<?php

include('connection.php');
session_start();

$user_username = $_SESSION['username'];

// GETS RID OF OPPONENT
unset($_SESSION['opp_user']);
unset($_SESSION['opp_guest']);

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
</head>
<body>
	<div class="page">

		<div class="user_area">
			<p><?=$user_username;?></p>
			<form action="account.php" method="post">
				<input type="submit" name="logout" value="LOGOUT" class="logout">
			</form>
		</div>

		<div class="account_area">
			<div class="game_names">
				<div class="game_name game_selected" id="x01_name">
					<p>X01</p>
				</div>
				<div class="game_name" id="cricket_name">
					<p>Cricket</p>
				</div>
				<div class="game_name" id="hundred_name">
					<p>100 Darts</p>
				</div>
				<div class="game_name" id="rtw_name">
					<p>Round the world</p>
				</div>
				<div class="game_name" id="nandc_name">
					<p>Noughts & crosses</p>
				</div>
			</div>
			<div class="game_info">
				<p>
					Traditional game of darts, where the first person to 0 by hitting a double wins the leg. Set up the game by selecting an opponent, target and legs needed to win the game. Game can be set up for a single player or play against a guest or user. After each leg you can view stats for each player. The winner is the person who wins the number of legs selected before the start of the game
				</p>
				<a href="game_setup.php?game=x01" class="button green_button">start game</a>
			</div>
		</div>

		<div class="account_area">
			<div class="user_stats" id="x01_stats">
				<h2>X01 STATS</h2>
				<?php

					$select = "SELECT * FROM x01_game WHERE username = '$user_username'";
					$select_query = mysqli_query($dbc, $select);
					$select_rows = mysqli_num_rows($select_query);
					if ($select_rows > 0) 
					{
						$games_played = $select_rows;
						while ($row = mysqli_fetch_array($select_query)) 
						{
							$won = $row['game_outcome'];
							if ($won == 'won') 
							{
								$games_won++;
							}
						}
						$percent = ($games_won / $games_played) * 100;
						$win_percent = number_format($percent, 2);
						echo
						'<table>
							<tr>
								<th>Games Played</th><th>Win %</th><th>Games Won</th>
							<tr>
							<tr>
								<td>' . $games_played . '</td><td>' . $win_percent . '</td><td>' . $games_won . '</td>
							</tr>
						</table>';

					}
					else
					{
						echo 'NO STATS FOR ' . $user_username;
					}
				?>
			</div>
<!-- 			<div class="user_stats" id="cricket_stats">
				<h2>CRICKET STATS</h2>
				<?php

					$select = "SELECT * FROM x01_game WHERE username = '$user_username'";
					$select_query = mysqli_query($dbc, $select);
					$select_rows = mysqli_num_rows($select_query);
					if ($select_rows > 0) 
					{
						$games_played = $select_rows;
						while ($row = mysqli_fetch_array($select_query)) 
						{
							$won = $row['game_outcome'];
							if ($won == 'won') 
							{
								$games_won++;
							}
						}
						$percent = ($games_won / $games_played) * 100;
						$win_percent = number_format($percent, 2);
						echo
						'<table class="user_stats_table">
						<tr><th>Games Played</th><th>Win %</th><th>Games Won</th><tr>
						<tr><td>' . $games_played . '</td><td>' . $win_percent . '</td><td>' . $games_won . '</td></tr>
						</table>';

					}
					else
					{
						echo 'NO STATS FOR ' . $user_username;
					}
				?>
			</div> -->
		</div>


	<!-- 		<div class="overall_stats" id="cricket_stats">
				<h2>CRICKET STATS</h2>
			</div> -->

	</div>

<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script type="text/javascript">
  	var gameTabs = $('.game_name');
  	gameTabs.on('click', function()
  	{
  		for (var i = 0; i < gameTabs.length; i++) 
  		{
  			$(gameTabs).removeClass('game_selected');
  			$(this).addClass('game_selected');
  			var id = $(this).attr('id');
  			if (id == 'x01_name') 
  			{
  				$('.game_info').html(x01_info);
  			}
  			else if (id == 'cricket_name')
  			{
  				$('.game_info').html(cricket_info);
  			}
  			else if (id == 'hundred_name')
  			{
  				$('.game_info').html(hundred_info);
  			}
  			else if (id == 'nandc_name')
  			{
  				$('.game_info').html(nandc_info);
  			}
  			else if (id == 'rtw_name')
  			{
  				$('.game_info').html(rtw_info);
  			}
  			else
  			{
  				$('.game_info').empty();
  			}
  		}
  	})

  	var x01_info = '<p>Traditional game of darts, where the first person to 0 by hitting a double wins the leg. Set up the game by selecting an opponent, target and legs needed to win the game. Game can be set up for a single player or play against a guest or user. After each leg you can view stats for each player. The winner is the person who wins the number of legs selected before the start of the game.</p><a class="button green_button" href="game_setup.php?game=x01">start game</a>';
 	var cricket_info = '<p>CRICKET INFO</p><a href="game_setup.php?game=cricket" class="button green_button" >start game</a>';
 	var hundred_info = '<p>100 DARTS INFO</p><a href="game_setup.php?game=hundred" class="button green_button" >start game</a>';
 	var nandc_info = '<p>NOUGHTS & CROSSES INFO</p><a href="game_setup.php?game=nandc" class="button green_button" >start game</a>';
	var rtw_info = '<p>ROUND THE WORLD INFO</p><a href="game_setup.php?game=rtw" class="button green_button" >start game</a>';
	var myIndex = 0;
   	function carousel() 
   	{
	     var x = $('.user_stats');
	     for (var i = 0; i < x.length; i++) 
	     {
	        x[i].style.display = "none";  
	     }
	     myIndex++;
	     if (myIndex > x.length) {myIndex = 1}    
	     x[myIndex-1].style.display = "block";  
	     setTimeout(carousel, 5000); // Change image every 5 seconds
	 }

	carousel();
</script>
</body>
</html>