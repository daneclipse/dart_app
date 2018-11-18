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


?>