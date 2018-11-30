<?php

session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

if (!isset($_GET['type'])) 
{
	echo '<a href="stats.php?stats=x01&type=leg&page=1">Leg Stats</a>';
	echo '<a href="stats.php?stats=x01&type=game&page=1">Game Stats</a>';
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

	if ($_GET['type'] == 'leg') 
	{
		$get_user = "SELECT * FROM x01_leg WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
		$user_query = mysqli_query($dbc, $get_user);
		$user_rows = mysqli_num_rows($user_query);

		if ($user_rows > 0) 
		{
			echo '<a href="stats.php?stats=x01&type=leg&page=1">Leg Stats</a>';
			echo '<a href="stats.php?stats=x01&type=game&page=1">Game Stats</a>';
			echo '
			<table>
				<tr>
					<th>Game Date</th>
					<th>Opponent</th>
					<th>Target</th>
					<th>20 -</th>
					<th>40 -</th>
					<th>60 -</th>
					<th>60 +</th>
					<th>100 +</th>
					<th>140 +</th>
					<th>180s</th>
					<th>High Score</th>
					<th>Total Scored</th>
					<th>Darts Used</th>
					<th>Average</th>
					<th>Checkout</th>
					<th>Double Hit</th>
					<th>Double %</th>
					<th>Outcome</th>
				</tr>';

			while($row = mysqli_fetch_array($user_query))
			{
				$date = $row['game_date'];
				$opp = $row['opponent'];
				$target = $row['target_score'];
				$u_twenty = $row['under_twenty'];
				$u_forty = $row['under_forty'];
				$u_sixty = $row['under_sixty'];
				$o_sixty = $row['sixty_over'];
				$o_hundred = $row['hundred_over'];
				$one_forty = $row['one_forty_over'];
				$one_eighties = $row['one_eighties'];
				$high_score = $row['high_score'];
				$total = $row['total_scored'];
				$darts = $row['num_darts'];
				$average = $row['average'];
				$checkout = $row['checkout'];
				$double = $row['double_hit'];
				$d_percent = $row['double_percent'];
				$outcome = $row['leg_outcome'];

				if($double == 25)
				{
					$double = 'bullseye';
				}

				echo '
				<tr>
					<td>' . $date . '</td>
					<td>' . $opp . '</td>
					<td>' . $target . '</td>
					<td>' . $u_twenty . '</td>
					<td>' . $u_forty . '</td>
					<td>' . $u_sixty . '</td>
					<td>' . $o_sixty . '</td>
					<td>' . $o_hundred . '</td>
					<td>' . $one_forty . '</td>
					<td>' . $one_eighties . '</td>
					<td>' . $high_score . '</td>
					<td>' . $total . '</td>
					<td>' . $darts . '</td>
					<td>' . $average . '</td>
					<td>' . $checkout . '</td>
					<td>' . $double . '</td>
					<td>' . $d_percent . '</td>';

				if ($outcome == 'won') 
				{
					echo '<td class="green_button">' . $outcome . '</td>';
				}
				else
				{
					echo '<td class="red_button">' . $outcome . '</td>';
				}
			}
			echo '</tr></table>';
		}
		else
		{
			echo 'NO USER FOUND IN x01_leg DATABASE';
		}

		// /* PAGINATION */
		$query = mysqli_query($dbc, "SELECT * FROM x01_leg WHERE username = '$user_username'");
		$totalRows = mysqli_num_rows($query);
		// how many records per page we want
		// work out total number of pages needed 
		// ceil gives you the next integar
		$totalPages = ceil($totalRows / $perPage);

		if ($page > 1) 
		{
		    echo '<a class="pagination" href="stats.php?stats=x01&type=leg&page=' . ($page - 1) . '"><< Previous</a>';
		}

		for($i = 1; $i <= $totalPages; $i++)
		{
		    if ($page == $i) 
		    {
		      echo '<a class="pagination" href="stats.php?stats=x01&type=leg&page=' . $i . '">' . $i . '</a>';
		    }
		    else
		    {
		      echo '<a class="pagination" href="stats.php?stats=x01&type=leg&page=' . $i . '">' . $i . '</a>';
		    }
		}

		if ($page < $totalPages) 
		{
		    echo '<a class="pagination" href="stats.php?stats=x01&type=leg&page=' . ($page + 1) . '">Next >></a>';
		}
		/* END OF PAGINATION */

	}
	else if ($_GET['type'] == 'game')
	{
		$game_user = "SELECT * FROM x01_game WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
		$game_query = mysqli_query($dbc, $game_user);
		$game_rows = mysqli_num_rows($game_query);

		if ($game_rows > 0) 
		{
			echo '<a href="stats.php?stats=x01&type=leg&page=1">Leg Stats</a>';
			echo '<a href="stats.php?stats=x01&type=game&page=1">Game Stats</a>';
			echo '
			<table>
				<tr>
					<th>Game Date</th>
					<th>Opponent</th>
					<th>Target</th>
					<th>Legs Played</th>
					<th>Legs Won</th>
					<th>20 -</th>
					<th>40 -</th>
					<th>60 -</th>
					<th>60 +</th>
					<th>100 +</th>
					<th>140 +</th>
					<th>180s</th>
					<th>High Score</th>
					<th>Total Scored</th>
					<th>Total Darts</th>
					<th>Game Average</th>
					<th>Double %</th>
					<th>Biggest Checkout</th>
					<th>Game Outcome</th>
				</tr>
			';

			while($row = mysqli_fetch_array($game_query))
			{
				$date = $row['game_date'];
				$opponent = $row['opponent'];
				$target = $row['target_score'];
				$legs_played = $row['legs_played'];
				$legs_won = $row['legs_won'];
				$u_twenty = $row['under_twenty'];
				$u_forty = $row['under_forty'];
				$u_sixty = $row['under_sixty'];
				$o_sixty = $row['sixty_over'];
				$o_hundred = $row['hundred_over'];
				$one_forty = $row['one_forty_over'];
				$one_eighties = $row['one_eighties'];
				$high_score = $row['high_score'];
				$total = $row['total_scored'];
				$darts = $row['total_darts'];
				$average = $row['average'];
				$double_percent = $row['double_percent'];
				$checkout = $row['biggest_checkout'];
				$outcome = $row['game_outcome'];

				echo '
				<tr>
					<td>' . $date . '</td>
					<td>' . $opponent . '</td>
					<td>' . $target . '</td>
					<td>' . $legs_played . '</td>
					<td>' . $legs_won . '</td>
					<td>' . $u_twenty . '</td>
					<td>' . $u_forty . '</td>
					<td>' . $u_sixty . '</td>
					<td>' . $o_sixty . '</td>
					<td>' . $o_hundred . '</td>
					<td>' . $one_forty . '</td>
					<td>' . $one_eighties . '</td>
					<td>' . $high_score . '</td>
					<td>' . $total . '</td>
					<td>' . $darts . '</td>
					<td>' . $average . '</td>
					<td>' . $double_percent . '</td>
					<td>' . $checkout . '</td>';
					
					if ($outcome == 'won') 
					{
						echo '<td class="green_button">' . $outcome . '</td>';
					}
					else
					{
						echo '<td class="red_button">' . $outcome . '</td>';
					}
			}
			echo '</tr></table>';
		}
		else
		{
			echo 'NO STATS FOUND IN X01 GAME DATABASE';
		}

		// /* PAGINATION */
		$query = mysqli_query($dbc, "SELECT * FROM x01_game WHERE username = '$user_username'");
		$totalRows = mysqli_num_rows($query);
		// how many records per page we want
		// work out total number of pages needed 
		// ceil gives you the next integar
		$totalPages = ceil($totalRows / $perPage);

		if ($page > 1) 
		{
		    echo '<a class="pagination" href="stats.php?stats=x01&type=game&page=' . ($page - 1) . '"><< Previous</a>';
		}

		for($i = 1; $i <= $totalPages; $i++)
		{
		    if ($page == $i) 
		    {
		      echo '<a class="pagination" href="stats.php?stats=x01&type=game&page=' . $i . '">' . $i . '</a>';
		    }
		    else
		    {
		      echo '<a class="pagination" href="stats.php?stats=x01&type=game&page=' . $i . '">' . $i . '</a>';
		    }
		}

		if ($page < $totalPages) 
		{
		    echo '<a class="pagination" href="stats.php?stats=x01&type=game&page=' . ($page + 1) . '">Next >></a>';
		}
		/* END OF PAGINATION */

	}
	else
	{
		echo '<a href="stats.php?stats=x01&type=leg&page=1">Leg Stats</a>';
		echo '<a href="stats.php?stats=x01&type=game&page=1">Game Stats</a>';
	}
}





?>