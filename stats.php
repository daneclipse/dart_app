<?php

include('connection.php');
session_start();

$user_username = $_SESSION['username'];
$_SESSION['stats'] = $_GET['stats'];

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


<h1><?=$user_username;?> stats</h1>

<a href="stats.php?stats=x01">X01</a>
<a href="stats.php?stats=cricket">Cricket</a>
<a href="stats.php?stats=hundred">100 Darts</a>
<a href="stats.php?stats=rtw">RTW</a>
<a href="stats.php?stats=nandc">NandC</a>

<div class="stats">
	<?php

		$stats = $_SESSION['stats'];
		if ($stats == 'x01') 
		{
			include('stats/x01_stats.php');
		}
		else if ($stats == 'cricket')
		{
			include('stats/cricket_stats.php');
		}
		else if ($stats == 'hundred')
		{
			include('stats/hundred_stats.php');
		}
		else if ($stats == 'rtw')
		{
			include('stats/rtw_stats.php');
		}
		else if ($stats == 'nandc')
		{
			include('stats/nandc_stats.php');
		}
		else
		{
			echo '';
		}

	?>
</div>


<a href="account.php">Back to account</a>
<a href="index.php">Logout</a>
</body>
</html>