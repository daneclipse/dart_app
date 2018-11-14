<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

if (isset($_SESSION['opponent_user'])) 
{
	$opponent = $_SESSION['opponent_user'];
}
else if (isset($_SESSION['opponent_guest']))
{
	$opponent = $_SESSION['opponent_guest'];
}
else
{
	$opponent = 'none';
}

?>

<h1>X01 GAME - TRADITIONAL GAME V <?=$opponent;?></h1>
<p id="x01_target"></p>
<p id="x01_leg"></p>

<a href="account.php">Back to account</a>
<a href="index.php">Quit</a>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

<script type="text/javascript">
	$('#x01_target').text(localStorage['target']);
	$('#x01_leg').text(localStorage['leg']);
</script>