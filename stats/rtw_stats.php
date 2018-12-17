<?php

include('connection.php');
session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

if (!isset($_GET['type'])) 
{
	echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
	echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a>';
}
else if ($_GET['type'] == 'game')
{
	echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
	echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a>';
	/* PAGINATION */
	$page = $_GET['page'];
	$perPage = 10;
	if ($page == '' || $page == 1) 
	{
	    $currentPage = 0;
	}
	else
	{
	    $currentPage = ($page * $perPage) - $perPage;
	}
	/* END OF PAGINATION */
	$get_user = "SELECT * FROM rtw_game WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
	$user_query = mysqli_query($dbc, $get_user);
	$user_rows = mysqli_num_rows($user_query);

	if ($user_rows > 0) 
	{
		echo '
		<table>
			<tr>
				<th>Game Date</th>
				<th>Darts Used</th>
				<th>Singles Hit</th>
				<th>Doubles Hit</th>
				<th>Trebles Hit</th>
				<th>Points Scored</th>
				<th>Missed Darts</th>
				<th>Target hit %</th>
			</tr>';

		while($row = mysqli_fetch_array($user_query))
		{
			$date = $row['game_date'];
			$num_darts = $row['num_darts'];
			$singles = $row['singles'];
			$doubles = $row['doubles'];
			$trebles = $row['trebles'];
			$points = $row['points'];
			$missed_darts = $row['missed'];
			$average = $row['target_hit'];

			echo '
			<tr>
				<td>' . $date . '</td>
				<td>' . $num_darts . '</td>
				<td>' . $singles . '</td>
				<td>' . $doubles . '<t/d>
				<td>' . $trebles . '</td>
				<td>' . $points . '</td>
				<td>' . $missed_darts . '</td>
				<td>' . $average . '</td>';

		}
		echo '</tr></table>';
	}
	else
	{
		// NO USER FOUND IN DARTS_AT_GAME DB
		echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
		echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a>';
		echo 'NO STATS AVAILABLE';
	}
	// /* PAGINATION */
	$query = mysqli_query($dbc, "SELECT * FROM rtw_game WHERE username = '$user_username'");
	$totalRows = mysqli_num_rows($query);
	// how many records per page we want
	// work out total number of pages needed 
	// ceil gives you the next integar
	$totalPages = ceil($totalRows / $perPage);

	if ($page > 1) 
	{
	    echo '<a class="pagination" href="stats.php?stats=rtw&page=' . ($page - 1) . '"><< Previous</a>';
	}

	for($i = 1; $i <= $totalPages; $i++)
	{
	    if ($page == $i) 
	    {
	      echo '<a class="pagination" href="stats.php?stats=rtw&page=' . $i . '">' . $i . '</a>';
	    }
	    else
	    {
	      echo '<a class="pagination" href="stats.php?stats=rtw&page=' . $i . '">' . $i . '</a>';
	    }
	}

	if ($page < $totalPages) 
	{
	    echo '<a class="pagination" href="stats.php?stats=rtw&page=' . ($page + 1) . '">Next >></a>';
	}
	/* END OF PAGINATION */
}
else if ($_GET['type'] == 'overall')
{
	$game_user = "SELECT * FROM rtw_overall WHERE username = '$user_username'";
	$game_query = mysqli_query($dbc, $game_user);
	$game_rows = mysqli_num_rows($game_query);

	if ($game_rows > 0) 
	{
		echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
		echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a>';
		echo '
		<table>
			<tr>
				<th>Games Played</th>
				<th>Single Hit %</th>
				<th>Double Hit %</th>
				<th>Treble Hit %</th>
				<th>Target Hit %</th>
				<th>Best Game</th>
			</tr>
		';

		while($row = mysqli_fetch_array($game_query))
		{
			$games_played = $row['games_played'];
			$single_percent = $row['single_percent'];
			$double_percent = $row['double_percent'];
			$treble_percent = $row['treble_percent'];
			$target_percent = $row['target_percent'];
			$best_game = $row['best_game'];

			echo '
			<tr>
				<td>' . $games_played . '</td>
				<td>' . $single_percent . '</td>
				<td>' . $double_percent . '</td>
				<td>' . $treble_percent . '</td>
				<td>' . $target_percent . '</td>
				<td>' . $best_game . '</td>';
		}
		echo '</tr></table>';
	}
	else
	{
		// NO USER FOUND IN RTW_OVERALL DB
		echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
		echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a><br />';
		echo 'NO STATS AVAILABLE';
	}
}
else
{
	echo '<a href="stats.php?stats=rtw&type=game&page=1">Game Stats</a>';
	echo '<a href="stats.php?stats=rtw&type=overall">Overall Stats</a>';
}


?>