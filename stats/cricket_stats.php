<?php

session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

if (!isset($_GET['type'])) 
{
	echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
	echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a>';
}
else
{
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

	if ($_GET['type'] == 'inning') 
	{
		$get_user = "SELECT * FROM cricket_innings WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
		$user_query = mysqli_query($dbc, $get_user);
		$user_rows = mysqli_num_rows($user_query);

		if ($user_rows > 0) 
		{
			echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
			echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a>';
			echo '
			<table>
				<tr>
					<th>Game Date</th>
					<th>Opponent</th>
					<th>Outcome</th>
					<th>Outcome Method</th>
					<th>Wickets Left</th>
					<th>One Wickets</th>
					<th>Two Wickets</th>
					<th>Wides</th>
					<th>Runs Conceded</th>
					<th>Runs Scored</th>
					<th>Over Forty One</th>
					<th>Under Forty One</th>
					<th>Run Outs</th>
					<th>Overall Score</th>
				</tr>';

			while($row = mysqli_fetch_array($user_query))
			{
				$date = $row['game_date'];
				$opp = $row['opponent'];
				$outcome = $row['outcome'];
				$outcome_method = $row['outcome_method'];
				$wickets_left = $row['wickets_left'];
				$outer_bulls = $row['outer_bulls'];
				$bullseyes = $row['bullseyes'];
				$wides = $row['wides'];
				$conceded = $row['conceded'];
				$runs_scored = $row['runs_scored'];
				$over_forty_one = $row['over_forty_one'];
				$under_forty_one = $row['under_forty_one'];
				$run_outs = $row['run_outs'];
				$innings_score = $row['innings_score'];

				echo '
				<tr>
					<td>' . $date . '</td>
					<td>' . $opp . '</td>';
					if ($outcome == 'won') 
					{
						echo '<td class="green_button">' . $outcome . '</td>';
					}
					else
					{
						echo '<td class="red_button">' . $outcome . '</td>';
					}
					echo '<td>' . $outcome_method . '</td>
					<td>' . $wickets_left . '</td>
					<td>' . $outer_bulls . '</td>
					<td>' . $bullseyes . '<t/d>
					<td>' . $wides . '</td>
					<td>' . $conceded . '</td>
					<td>' . $runs_scored . '</td>
					<td>' . $over_forty_one . '</td>
					<td>' . $under_forty_one . '</td>
					<td>' . $run_outs . '</td>
					<td>' . $innings_score . '</td>';

			}
			echo '</tr></table>';
		}
		else
		{
			// NO USER FOUND IN CRICET_INNINGS DB
			echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
			echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a><br />';
			echo 'NO STATS AVAILABLE';
		}

		// /* PAGINATION */
		$query = mysqli_query($dbc, "SELECT * FROM cricket_innings WHERE username = '$user_username'");
		$totalRows = mysqli_num_rows($query);
		// how many records per page we want
		// work out total number of pages needed 
		// ceil gives you the next integar
		$totalPages = ceil($totalRows / $perPage);

		if ($page > 1) 
		{
		    echo '<a class="pagination" href="stats.php?stats=cricket&type=inning&page=' . ($page - 1) . '"><< Previous</a>';
		}

		for($i = 1; $i <= $totalPages; $i++)
		{
		    if ($page == $i) 
		    {
		      echo '<a class="pagination" href="stats.php?stats=cricket&type=inning&page=' . $i . '">' . $i . '</a>';
		    }
		    else
		    {
		      echo '<a class="pagination" href="stats.php?stats=cricket&type=inning&page=' . $i . '">' . $i . '</a>';
		    }
		}

		if ($page < $totalPages) 
		{
		    echo '<a class="pagination" href="stats.php?stats=cricket&type=inning&page=' . ($page + 1) . '">Next >></a>';
		}
		/* END OF PAGINATION */

	}
	else if ($_GET['type'] == 'game')
	{
		$game_user = "SELECT * FROM cricket_game WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
		$game_query = mysqli_query($dbc, $game_user);
		$game_rows = mysqli_num_rows($game_query);

		if ($game_rows > 0) 
		{
			echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
			echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a>';
			echo '
			<table>
				<tr>
					<th>Game Date</th>
					<th>Opponent</th>
					<th>Innings Selected</th>
					<th>Game Outcome</th>
					<th>Wicket Difference</th>
					<th>Run Difference</th>
				</tr>
			';

			while($row = mysqli_fetch_array($game_query))
			{
				$date = $row['game_date'];
				$opponent = $row['opponent'];
				$innings_selected = $row['innings_selected'];
				$game_outcome = $row['game_outcome'];
				$wicket_difference = $row['wicket_difference'];
				$run_difference = $row['run_difference'];

				echo '
				<tr>
					<td>' . $date . '</td>
					<td>' . $opponent . '</td>
					<td>' . $innings_selected . '</td>';
					if ($game_outcome == 'won') 
					{
						echo '<td class="green_button">' . $game_outcome . '</td>';
					}
					else
					{
						echo '<td class="red_button">' . $game_outcome . '</td>';
					}
					echo '
					<td>' . $wicket_difference . '</td>
					<td>' . $run_difference . '</td>';
					

			}
			echo '</tr></table>';
		}
		else
		{
			// NO USER FOUND IN CRICET_INNINGS DB
			echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
			echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a><br />';
			echo 'NO STATS AVAILABLE';
		}

		// /* PAGINATION */
		$query = mysqli_query($dbc, "SELECT * FROM cricket_game WHERE username = '$user_username'");
		$totalRows = mysqli_num_rows($query);
		// how many records per page we want
		// work out total number of pages needed 
		// ceil gives you the next integar
		$totalPages = ceil($totalRows / $perPage);

		if ($page > 1) 
		{
		    echo '<a class="pagination" href="stats.php?stats=cricket&type=game&page=' . ($page - 1) . '"><< Previous</a>';
		}

		for($i = 1; $i <= $totalPages; $i++)
		{
		    if ($page == $i) 
		    {
		      echo '<a class="pagination" href="stats.php?stats=cricket&type=game&page=' . $i . '">' . $i . '</a>';
		    }
		    else
		    {
		      echo '<a class="pagination" href="stats.php?stats=cricket&type=game&page=' . $i . '">' . $i . '</a>';
		    }
		}

		if ($page < $totalPages) 
		{
		    echo '<a class="pagination" href="stats.php?stats=cricket&type=game&page=' . ($page + 1) . '">Next >></a>';
		}
		/* END OF PAGINATION */

	}
	else
	{
		echo '<a href="stats.php?stats=cricket&type=inning&page=1">Inning Stats</a>';
		echo '<a href="stats.php?stats=cricket&type=game&page=1">Game Stats</a>';
	}
}





?>