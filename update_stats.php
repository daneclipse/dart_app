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
else if ($game == 'cricket')
{
	$type = $_GET['type'];
	$player = $_GET['name'];

	if ($type == 'inning') 
	{
		$opp = $_GET['opp'];
		$outcome = $_GET['outcome'];
		$method = $_GET['method'];
		$wickets = $_GET['wickets'];
		$outer_bulls = $_GET['outer_bulls'];
		$bullseyes = $_GET['bullseyes'];
		$wides = $_GET['wides'];
		$conceded = $_GET['conceded'];
		$runs = $_GET['runs'];
		$over = $_GET['over'];
		$under = $_GET['under'];
		$run_outs = $_GET['run_outs'];

		if ($wickets == 10) 
		{
			$score = 'all out for ' . $_GET['runs'];
			$wickets_left = 0;
		}
		else
		{
			$score = $_GET['runs'] . ' for ' . $wickets;
			$wickets_left = 10 - $wickets;
		}

		$bowled = $_GET['bowled_darts'];
		$batted = $_GET['batted_darts'];

		$insert = "INSERT INTO cricket_innings (game_date, username, opponent, outcome, outcome_method, wickets_left, outer_bulls, bullseyes, wides, conceded, runs_scored, over_forty_one, under_forty_one, run_outs, innings_score, bowled_darts, batted_darts) VALUES( NOW(), '$player', '$opp', '$outcome', '$method', '$wickets_left', '$outer_bulls', '$bullseyes', '$wides', '$conceded', '$runs', '$over', '$under', '$run_outs', '$score', '$bowled', '$batted')";
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
else if ($game == 'darts_at')
{
	$player = $_GET['name'];
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


?>