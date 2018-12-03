<?php

session_start();
$user_username = $_SESSION['username'];
$stats = $_SESSION['stats'];

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

$get_user = "SELECT * FROM darts_at_game WHERE username = '$user_username' ORDER BY game_date DESC LIMIT $currentPage, $perPage";
$user_query = mysqli_query($dbc, $get_user);
$user_rows = mysqli_num_rows($user_query);

if ($user_rows > 0) 
{
	echo '
	<table>
		<tr>
			<th>Game Date</th>
			<th>Darts Selected</th>
			<th>Target</th>
			<th>Singles Hit</th>
			<th>Doubles Hit</th>
			<th>Trebles Hit</th>
			<th>Points Scored</th>
			<th>Total Scored</th>
			<th>Missed Darts</th>
			<th>Target hit %</th>
		</tr>';

	while($row = mysqli_fetch_array($user_query))
	{
		$date = $row['game_date'];
		$darts_selected = $row['darts_selected'];
		$target = $row['target'];
		$singles = $row['singles'];
		$doubles = $row['doubles'];
		$trebles = $row['trebles'];
		$points_scored = $row['points_scored'];
		$total_scored = $row['total_scored'];
		$missed_darts = $row['missed_darts'];

		// WORK OUT THE PERCENT THEY HIT THE TARGET
		$a = $missed_darts / $darts_selected;
		$ave = $a * 100;
		$average_hit = 100 - $ave;
		$average = number_format($average_hit, 2);

		echo '
		<tr>
			<td>' . $date . '</td>
			<td>' . $darts_selected . '</td>
			<td>' . $target . '</td>
			<td>' . $singles . '</td>
			<td>' . $doubles . '<t/d>
			<td>' . $trebles . '</td>
			<td>' . $points_scored . '</td>
			<td>' . $total_scored . '</td>
			<td>' . $missed_darts . '</td>
			<td>' . $average . '</td>';

	}
	echo '</tr></table>';
}
else
{
	// NO USER FOUND IN DARTS_AT_GAME DB
	echo 'NO STATS AVAILABLE';
}
// /* PAGINATION */
$query = mysqli_query($dbc, "SELECT * FROM darts_at_game WHERE username = '$user_username'");
$totalRows = mysqli_num_rows($query);
// how many records per page we want
// work out total number of pages needed 
// ceil gives you the next integar
$totalPages = ceil($totalRows / $perPage);

if ($page > 1) 
{
    echo '<a class="pagination" href="stats.php?stats=darts_at&page=' . ($page - 1) . '"><< Previous</a>';
}

for($i = 1; $i <= $totalPages; $i++)
{
    if ($page == $i) 
    {
      echo '<a class="pagination" href="stats.php?stats=darts_at&page=' . $i . '">' . $i . '</a>';
    }
    else
    {
      echo '<a class="pagination" href="stats.php?stats=darts_at&page=' . $i . '">' . $i . '</a>';
    }
}

if ($page < $totalPages) 
{
    echo '<a class="pagination" href="stats.php?stats=darts_at&page=' . ($page + 1) . '">Next >></a>';
}
/* END OF PAGINATION */


?>