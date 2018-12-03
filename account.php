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
				<div class="game_name" id="darts_at_name">
					<p>Darts at</p>
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
					x01 is probably the most popular and the simplest game of darts. Each player starts with a score (101, 301,501,601 or 1001) and the object is to get to exactly zero by finishing on a double. Each player takes turns to throw rounds of three darts and subtracting the sum of those darts from the current score.
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
							else 
							{
								$games_won--;
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
				<a href="stats.php?stats=x01&type=game&page=1" class="button green_button">view stats</a>
			</div><!-- CLOSE DIV FOR X01 STATS -->
			
 			<div class="user_stats" id="cricket_stats">
				<h2>CRICKET STATS</h2>
				<?php

					$select = "SELECT * FROM cricket_game WHERE username = '$user_username'";
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
							else
							{
								$games_won--;
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
				<a href="stats.php?stats=cricket&type=game&page=1" class="button green_button">view stats</a>
			</div><!-- CLOSE DIV FOR CRICKET STATS -->

			<div class="user_stats" id="darts_at_stats">
				<h2>DARTS AT STATS</h2>
				<?php

					$select = "SELECT * FROM darts_at_game WHERE username = '$user_username'";
					$select_query = mysqli_query($dbc, $select);
					$select_rows = mysqli_num_rows($select_query);
					if ($select_rows > 0) 
					{
						$games_played = $select_rows;
						
						// GET MOST FREQUENT TARGET
						$most_frequent = "SELECT target, COUNT(target) AS num FROM darts_at_game GROUP BY target ORDER BY num DESC LIMIT 1";
						$frequent_query = mysqli_query($dbc, $most_frequent);
						$frequent_rows = mysqli_num_rows($frequent_query);

						if ($frequent_rows > 0) 
						{
							while ($row = mysqli_fetch_array($frequent_query)) 
							{
								$frequent_target = $row['target'];
							}

							// GET HIGHEST POINTS TALLY
							$highest = "SELECT * FROM darts_at_game WHERE username = '$user_username' ORDER BY points_scored DESC LIMIT 1";
							$highest_query = mysqli_query($dbc, $highest);
							$highest_rows = mysqli_num_rows($highest_query);

							if ($highest_rows > 0) 
							{
								while($r = mysqli_fetch_array($highest_query))
								{
									$highest_points = $r['points_scored'];
								}

								echo
								'<table>
									<tr>
										<th>Games Played</th><th>Most Frequent Target</th><th>Highest Points Tally</th>
									<tr>
									<tr>
										<td>' . $games_played . '</td><td>' . $frequent_target . '</td><td>' . $highest_points . '</td>
									</tr>
								</table>';
							}
							else
							{
								echo 'COULDNT GET HIGHEST POINTS TALLY FROM DB';
							}
						}
						else
						{
							echo 'COULDNT GET THE MOST FREQUENT TARGET FROM DB';
						}

					}
					else
					{
						echo 'NO STATS FOR ' . $user_username;
					}
				?>
				<a href="stats.php?stats=darts_at&type=game&page=1" class="button green_button">view stats</a>
			</div><!-- CLOSE DIV FOR DARTS AT STATS -->

		</div>

	</div>

<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script type="text/javascript">
	window.localStorage.clear();
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
  			else if (id == 'darts_at_name')
  			{
  				$('.game_info').html(darts_at_info);
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

  	var x01_info = '<p>x01 is probably the most popular and the simplest game of darts. Each player starts with a score (101, 301,501,601 or 1001) and the object is to get to exactly zero by finishing on a double. Each player takes turns to throw rounds of three darts and subtracting the sum of those darts from the current score.</p><a class="button green_button" href="game_setup.php?game=x01">start game</a>';
 	var cricket_info = '<p>Cricket game require two players, one being the bowler and one being the batsman. The bowler aims at bullseye and every outer bull hit takes a wicket and every bullseye takes two wickets. The batsman needs to score as many runs as possible before their 10 wickets have been taken. Every score over 41 hit scores runs for the batsman.</p><a href="game_setup.php?game=cricket" class="button green_button">start game</a>';
 	var darts_at_info = '<p>Darts at is very simple game where you choose how many darts you want to throw at a specified target. The aim of the game is to get the highest points tally possible, score one point for every single, two points for double and three points for every treble hit.</p><a href="game_setup.php?game=darts_at" class="button green_button">start game</a>';
 	var nandc_info = '<p>Noughts and crosses requires two players, one being noughts and the other being crosses. A traditional game of noughts and crosses using targets on the dartboard. Hit three targets in either a horizontal, vertical or diagonal line to win the game.</p><a href="game_setup.php?game=nandc" class="button green_button" >start game</a>';
	var rtw_info = '<p>Round the world uses all the numbers on the board. Simply hit every section on the board in number order starting from 1.</p><a href="game_setup.php?game=rtw" class="button green_button">start game</a>';
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