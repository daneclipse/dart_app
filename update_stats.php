<?php

include('connection.php');
session_start();
$user_username = $_SESSION['user'];
$game = $_SESSION['game'];

// GET THE OPPONENT NAME FROM SESSION
// if (isset($_SESSION['opponent_user'])) 
// {
// 	$opponent = $_SESSION['opponent_user'];
// }
// else if (isset($_SESSION['opponent_guest']))
// {
// 	$opponent = $_SESSION['opponent_guest'];
// }
// else
// {
// 	$opponent = 'none';
// }

if ($game == 'x01') 
{
	$type = $_GET['type'];
	$player = $_GET['name'];
	$opp = $_GET['opp'];

	$find_user = "SELECT * FROM users WHERE username = '$player'";
	$user_query = mysqli_query($dbc, $find_user);
	$user_rows = mysqli_num_rows($user_query);
	if ($user_rows > 0) 
	{
		// PLAYER HAS AN ACCOUNT, SAVE STATS TO DATABASE
		if ($type == 'leg') 
		{
			$target = $_GET['target'];
			$u_twenty = $_GET['u20'];
			$u_forty = $_GET['u40'];
			$u_sixty = $_GET['u60'];
			$sixty = $_GET['o60'];
			$one_hundred = $_GET['o100'];
			$one_forty = $_GET['o140'];
			$max = $_GET['max'];
			$highest = $_GET['highest'];
			$scored = $_GET['total'];
			$darts = $_GET['darts'];
			$average = $_GET['average'];
			$checkout = $_GET['checkout'];
			$double = $_GET['double'];
			$d_percent = $_GET['percent'];
			$outcome = $_GET['outcome'];

			$insert = "INSERT INTO x01_leg (game_date, username, opponent, target_score, under_twenty, under_forty, under_sixty, sixty_over, hundred_over, one_forty_over, one_eighties, high_score, total_scored, num_darts, average, checkout, double_hit, double_percent, leg_outcome) VALUES (NOW(), '$player', '$opp', '$target', '$u_twenty', '$u_forty', '$u_sixty', '$sixty', '$one_hundred', '$one_forty', '$max', '$highest', '$scored', '$darts', '$average', '$checkout', '$double', '$d_percent', '$outcome')";

			$insert_query = mysqli_query($dbc, $insert);
			$data_inserted = mysqli_affected_rows($dbc);
			if ($data_inserted > 0) 
			{
				echo 'DATA INSERTED INTO X01 LEG DB';
			}
			else
			{
				echo 'X01 LEG DATA NOT INSERTED';
			}
		}
		else if ($type == 'game') 
		{
			$target = $_GET['target'];
			$needed = $_GET['legs_needed'];
			$won = $_GET['legs_won'];
			$played = $_GET['legs_played'];
			$outcome = $_GET['outcome'];
			$u_twenty = $_GET['u20'];
			$u_forty = $_GET['u40'];
			$u_sixty = $_GET['u60'];
			$sixty = $_GET['o60'];
			$one_hundred = $_GET['o100'];
			$one_forty = $_GET['o140'];
			$max = $_GET['max'];
			$highest = $_GET['highest'];
			$scored = $_GET['total'];
			$darts = $_GET['darts'];
			$average = $_GET['average'];
			$d_percent = $_GET['percent'];
			$checkout = $_GET['checkout'];

			$insert = "INSERT INTO x01_game (game_date, username, opponent, target_score, legs_needed, legs_won, legs_played, game_outcome, under_twenty, under_forty, under_sixty, sixty_over, hundred_over, one_forty_over, one_eighties, high_score, total_scored, total_darts, average, double_percent, biggest_checkout) VALUES (NOW(), '$player', '$opp', '$target', '$needed', '$won', '$played', '$outcome', '$u_twenty', '$u_forty', '$u_sixty', '$sixty', '$one_hundred', '$one_forty', '$max', '$highest', '$scored', '$darts', '$average', '$d_percent', '$checkout')";
			$insert_query = mysqli_query($dbc, $insert);
			$data_inserted = mysqli_affected_rows($dbc);
			if ($data_inserted > 0) 
			{
				echo 'DATA INSERTED INTO X01 GAME DB';
			}
			else
			{
				echo 'X01 GAME DATA NOT INSERTED';
			}
		}
	}
	else
	{
		// PLAYER DOES NOT HAVE ACCOUNT, DONT SAVE STATS TO DATABASE
		echo 'PLAYER IS A GUEST';
	}
}
else if ($game == 'cricket')
{
	$type = $_GET['type'];
	$player = $_GET['name'];

	$find_user = "SELECT * FROM users WHERE username = '$player'";
	$user_query = mysqli_query($dbc, $find_user);
	$user_rows = mysqli_num_rows($user_query);
	if ($user_rows > 0) 
	{
		// PLAYER HAS AN ACCOUNT, SAVE STATS TO DATABASE
		if ($type == 'inning') 
		{
			$opp = $_GET['opp'];
			$inning_num = $_GET['inning_num'];
			$outcome = $_GET['outcome'];
			$method = $_GET['method'];
			$wickets = $_GET['wickets'];
			$outer_bulls = $_GET['outer_bulls'];
			$bullseyes = $_GET['bullseyes'];
			$wides = $_GET['wides'];
			$given = $_GET['given'];
			$conceded = $_GET['conceded'];
			$runs = $_GET['runs'];
			$extras = $_GET['extras'];
			$over = $_GET['over'];
			$under = $_GET['under'];
			$run_outs = $_GET['run_outs'];

			if ($wickets == 0) 
			{
				$score = 'all out for ' . $_GET['runs'];
			}
			else
			{
				$score = $_GET['runs'] . ' for ' . $wickets;
			}

			$bowled = $_GET['bowled_darts'];
			$batted = $_GET['batted_darts'];

			$insert = "INSERT INTO cricket_innings (game_date, username, opponent, inning_num, outcome, outcome_method, outer_bulls, bullseyes, wides, runs_given, conceded, runs_scored, extra_runs, over_forty_one, under_forty_one, run_outs, innings_score, bowled_darts, batted_darts) VALUES( NOW(), '$player', '$opp', '$inning_num', '$outcome', '$method', '$outer_bulls', '$bullseyes', '$wides', '$given', '$conceded', '$runs', '$extras', '$over', '$under', '$run_outs', '$score', '$bowled', '$batted')";
			$insert_query = mysqli_query($dbc, $insert);
			$data_inserted = mysqli_affected_rows($dbc);
			if ($data_inserted > 0) 
			{
				echo 'DATA INSERTED INTO CRICKET INNINGS DB';
			}
			else 
			{
				echo 'CRICKET INNINGS DATA NOT INSERTED';
			}
		}
		else if ($type == 'game')
		{
			$opp = $_GET['opp'];
			$innings = $_GET['innings'];
			$innings_won = $_GET['innings_won'];
			$outcome = $_GET['outcome'];
			$wicket_diif = $_GET['wicket_difference'];
			$run_diff = $_GET['run_difference'];
			$outer_bulls = $_GET['outer_bulls'];
			$bullseyes = $_GET['bullseyes'];
			$wides = $_GET['wides'];
			$conceded = $_GET['conceded'];
			$runs = $_GET['runs'];
			$over = $_GET['over'];
			$under = $_GET['under'];
			$run_outs = $_GET['run_outs'];

			$insert = "INSERT INTO cricket_game (game_date, username, opponent, innings_selected, innings_won, game_outcome, wicket_difference, run_difference, outer_bulls, bullseyes, wides, conceded, runs, over, under, run_outs) VALUES (NOW(), '$player', '$opp', '$innings', '$innings_won', '$outcome', '$wicket_diif', '$run_diff', '$outer_bulls', '$bullseyes', '$wides', '$conceded', '$runs', '$over', '$under', '$run_outs')";
			$insert_query = mysqli_query($dbc, $insert);
			$data_inserted = mysqli_affected_rows($dbc);

			if ($data_inserted > 0) 
			{
				echo 'DATA INSERTED INTO CRICKET GAME DB';
			}
			else 
			{
				echo 'CRICKET GAME DATA NOT INSERTED';
			}
		}
	}
	else
	{
		// PLAYER DOES NOT HAVE AN ACCOUNT, DONT SAVE STATS TO DATABASE
		echo 'PLAYER IS A GUEST';
	}
}
else if ($game == 'darts_at')
{
	$player = $_GET['name'];
	$find_user = "SELECT * FROM users WHERE username = '$player'";
	$user_query = mysqli_query($dbc, $find_user);
	$user_rows = mysqli_num_rows($user_query);
	if ($user_rows > 0) 
	{
		// PLAYER HAS AN ACCOUNT, SAVE STATS TO DATABASE
		$darts = $_GET['darts'];
		$target = $_GET['target'];
		$singles = $_GET['singles'];
		$doubles = $_GET['doubles'];
		$trebles = $_GET['trebles'];
		$points = $_GET['points'];
		$score = $_GET['score'];
		$missed = $_GET['missed'];

		$insert = "INSERT INTO darts_at_game (game_date, username, darts_selected, target, singles, doubles, trebles, points_scored, total_scored, missed_darts) VALUES (NOW(), '$player', '$darts', '$target', '$singles', '$doubles', '$trebles', '$points', '$score', '$missed')";
		$insert_query = mysqli_query($dbc, $insert);
		$data_inserted = mysqli_affected_rows($dbc);

		if ($data_inserted > 0) 
		{
			echo 'DATA INSERTED INTO DARTS AT GAME DB';
		}
		else
		{
			echo 'DARTS AT GAME DATA NOT INSERTED';
		}
	}
	else
	{
		// PLAYER DOES NOT HAVE AN ACCOUNT, DONT SAVE STATS TO DATBASE
		echo 'PLAYER IS A GUEST';
	}
}
else if ($game == 'rtw')
{
	$player = $_GET['name'];
	$find_user = "SELECT * FROM users WHERE username = '$player'";
	$user_query = mysqli_query($dbc, $find_user);
	$user_rows = mysqli_num_rows($user_query);
	if ($user_rows > 0) 
	{
		// PLAYER HAS AN ACCOUNT, SAVE STATS TO DATABASE
		$darts = $_GET['darts'];
		$singles = $_GET['singles'];
		$doubles = $_GET['doubles'];
		$trebles = $_GET['trebles'];
		$points = $_GET['points'];
		$missed = $_GET['missed'];

		// WORK OUT PERCENT THAT HIT THE TARGET NUMBER
		if ($missed > 0) 
		{
			$a = $missed / $darts;
			$av = $a * 100;
			$avg = 100 - $av;
			$average = number_format($avg, 2);
		}
		else
		{
			$average = 100;
		}

		// WORK OUT PERCENT OF SINGLES HIT
		if ($singles > 0) 
		{
			$s = $singles / $darts;
			$sing = $s * 100;
			$sing_percent = number_format($sing, 2);
		}

		if ($doubles > 0) 
		{
			$d = $doubles / $darts;
			$doub = $d * 100;
			$doub_percent = number_format($doub, 2);
		}

		if ($trebles > 0) 
		{
			$t = $trebles / $darts;
			$treb = $t * 100;
			$treb_percent = number_format($treb, 2);
		}

		$insert = "INSERT INTO rtw_game (game_date, username, num_darts, singles, single_percent, doubles, double_percent, trebles, treble_percent, points, missed, target_hit) VALUES (NOW(), '$player', '$darts', '$singles', '$sing_percent', '$doubles', '$doub_percent', '$trebles', '$treb_percent', '$points', '$missed', '$average')";
		$insert_query = mysqli_query($dbc, $insert);
		$data_inserted = mysqli_affected_rows($dbc);

		if ($data_inserted > 0) 
		{
			echo 'DATA INSERTED INTO DARTS AT GAME DB';

			$find_user = "SELECT * FROM rtw_overall WHERE username = '$player'";
			$find_query = mysqli_query($dbc, $find_user);
			$find_rows = mysqli_num_rows($find_query);
			if ($find_rows > 0) 
			{
				echo 'USER ALREADY IN DB';
			}
			else
			{
				$insert_user = "INSERT INTO rtw_overall (username, games_played, single_percent, double_percent, treble_percent, target_percent, best_game) VALUES ('$player', '0', '0', '0', '0', '0', '0')";
				$insert_query = mysqli_query($dbc, $insert_user);
				$insert_rows = mysqli_affected_rows($dbc);
				if ($insert_rows > 0) 
				{
					echo 'USER ADDED';
				}
				else
				{
					echo 'USER NOT ADDED TO RTW_OVERALL DB';
				}
			}

			$get_user = "SELECT * FROM rtw_game WHERE username = '$player'";
			$get_query = mysqli_query($dbc, $get_user);
			$get_rows = mysqli_num_rows($get_query);

			if ($get_rows > 0) 
			{

				// UPDATE GAMES PLAYED COLUUMN IN RTW_OVERALL DB
				$update_games = "UPDATE rtw_overall SET games_played = '$get_rows' WHERE username = '$player'";
				$games_query = mysqli_query($dbc, $update_games);
				$game_rows = mysqli_affected_rows($dbc);
				if ($game_rows > 0) 
				{
					while ($user_row = mysqli_fetch_array($get_query)) 
					{
						$total_singles = $total_singles + $user_row['single_percent'];
						$single_percent = $total_singles / $get_rows;

						$total_doubles = $total_doubles + $user_row['double_percent'];
						$double_percent = $total_doubles / $get_rows;

						$total_trebles = $total_trebles + $user_row['treble_percent'];
						$treble_percent = $total_trebles / $get_rows;

						$target_total = $target_total + $user_row['target_hit'];
						$target_hit = $target_total / $get_rows;					
					}
					$update_singles = "UPDATE rtw_overall SET single_percent = '$single_percent' WHERE username = '$player'";
					$single_query = mysqli_query($dbc, $update_singles);
					$singles_row = mysqli_affected_rows($dbc);
					if ($singles_row > 0) 
					{
						echo 'SINGLES STATS UPDATED';
					}
					else
					{
						echo 'RTW_OVERALL SINGLE PERCENT NOT UPDATED';
					}

					$update_doubles = "UPDATE rtw_overall SET double_percent = '$double_percent' WHERE username = '$player'";
					$double_query = mysqli_query($dbc, $update_doubles);
					$doubles_row = mysqli_affected_rows($dbc);
					if ($doubles_row > 0) 
					{
						echo 'DOUBLES STATS UPDATED';
					}
					else
					{
						echo 'RTW_OVERALL DOUBLE PERCENT NOT UPDATED';
					}

					$update_trebles = "UPDATE rtw_overall SET treble_percent = '$treble_percent' WHERE username = '$player'";
					$treble_query = mysqli_query($dbc, $update_trebles);
					$trebles_row = mysqli_affected_rows($dbc);
					if ($trebles_row > 0) 
					{
						echo 'TREBLES STATS UPDATED';
					}
					else
					{
						echo 'RTW_OVERALL TREBLE PERCENT NOT UPDATED';
					}

					$update_target = "UPDATE rtw_overall SET target_percent = '$target_hit' WHERE username = '$player'";
					$target_query = mysqli_query($dbc, $update_target);
					$target_row = mysqli_affected_rows($dbc);
					if ($target_row > 0) 
					{
						echo 'TARGET STATS UPDATED';
					}
					else
					{
						echo 'RTW_OVERALL TARGET PERCENT NOT UPDATED';
					}
				}
				else
				{
					echo 'GAMES PLAYED DATA NOT UPDATED IN RTW_OVERALL DB';
				}
			}
			else
			{
				echo 'NO USER IN RTW_GAME DB WITH THAT USERNAME';
			}

			$best_game = "SELECT * FROM rtw_game WHERE username = '$player' ORDER BY num_darts ASC LIMIT 1";
			$best_query = mysqli_query($dbc, $best_game);
			$best_row = mysqli_num_rows($best_query);
			if ($best_row > 0) 
			{
				while($best = mysqli_fetch_array($best_query))
				{
					$b_game = $best['num_darts'];
				}
				$update_best = "UPDATE rtw_overall SET best_game = '$b_game' WHERE username = '$player'";
				$best_query = mysqli_query($dbc, $update_best);
			}
		}
		else
		{
			echo 'ROUND THE WORLD DATA NOT INSERTED';
		}
	}
	else
	{
		// PLAYER DOES NOT HAVE AN ACCOUNT, DONT SAVE STATS TO DATBASE
		echo 'PLAYER IS A GUEST';
	}

}
else if ($game == 'nandc')
{
	$player = $_GET['name'];
	$find_user = "SELECT * FROM users WHERE username = '$player'";
	$user_query = mysqli_query($dbc, $find_user);
	$user_rows = mysqli_num_rows($user_query);

	// PLAYER HAS AN ACCOUNT, SAVE STATS TO DATABASE
	if ($user_rows > 0) 
	{
		$type = $_GET['type'];

		if ($type == 'board')
		{
			$opp = $_GET['opp'];
			$marker = $_GET['marker'];
			$darts = $_GET['darts'];
			$hit = $_GET['hit'];
			$one = $_GET['one'];
			$two = $_GET['two'];
			$three = $_GET['three'];
			$four = $_GET['four'];
			$five = $_GET['five'];
			$six = $_GET['six'];
			$missed = $_GET['missed'];

			if ($one == undefined) 
			{
				$one = '';
			}
			if ($two == undefined) 
			{
				$two = '';
			}
			if ($three == undefined) 
			{
				$three = '';
			}
			if ($four == undefined) 
			{
				$four = '';
			}
			if ($five == undefined) 
			{
				$five = '';
			}
			if ($six == undefined) 
			{
				$six = '';
			}

			$a = $hit / $darts;
			$avg = $a * 100;
			$average_hit = number_format($avg, 2);


			$insert = "INSERT INTO nandc_board (game_date, username, opponent, marker, darts_used, target_one, target_two, target_three, target_four, target_five, target_six, missed_darts, hit_percent) VALUES (NOW(), '$player', '$opp', '$marker', '$darts', '$one', '$two', '$three', '$four', '$five', '$six', '$missed', '$average_hit')";
			$insert_query = mysqli_query($dbc, $insert);
			$data_inserted = mysqli_affected_rows($dbc);

			if ($data_inserted > 0) 
			{
				echo 'DATA INSERTED INTO NOUGHTS AND CROSSES BOARD DB';
			}
			else
			{
				echo 'NOUGHTS AND CROSSES DATA NOT INSERTED';
			}
		}
	}
	else
	{
		// PLAYER DOES NOT HAVE AN ACCOUNT, DONT SAVE STATS TO DATABASE
		echo 'PLAYER IS A GUEST';
	}
}




?>