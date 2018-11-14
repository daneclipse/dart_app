<?php
include('connection.php');

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>X01 GAME</h1>

<div class="setup_option">
	<h3>OPPONENT</h3>
	<p class="option opp_option">single</p>
	<p class="option opp_option">v guest</p>
	<p class="option opp_option">v user</p>
	<div class="opponent">
		<?php
			if ($_SERVER['REQUEST_METHOD'] == 'POST') 
			{
				if (isset($_POST['guest_name'])) 
				{
					unset($_SESSION['opponent_user']);
					$_SESSION['opponent_guest'] = $_POST['guest_name'];
					echo 'Opponent - ' . $_SESSION['opponent_guest'];
				}
				else
				{
					$opp_username = $_POST['opp_user'];
					$opp_password = $_POST['opp_pass'];

					$opp_search = "SELECT * FROM users WHERE username = '$opp_username'";
					$opp_query = mysqli_query($dbc, $opp_search);
					$opp_rows = mysqli_num_rows($opp_query);
					if ($opp_rows > 0) 
					{
						while($opp_row = mysqli_fetch_array($opp_query))
						{
							$db_password = $opp_row['password'];
						}
						if ($db_password == $opp_password) 
						{
							unset($_SESSION['opponent_guest']);
							$_SESSION['opponent_user'] = $opp_username;
							echo 'Opponent - ' . $_SESSION['opponent_user'];
						}
						else
						{
							echo 'INCORRECT PASSWORD';
						}
					}
					else
					{
						echo 'NO USER WITH THAT USERNAME';
					}
				}
			}
			else
			{
				unset($_SESSION['opponent_user']);
				unset($_SESSION['opponent_guest']);
			}
			// var_dump($_SESSION);
		?>
	</div>
</div>

<div class="setup_option">
	<h3>TARGET</h3>
	<p class="option target_option">1001</p>
	<p class="option target_option">601</p>
	<p class="option target_option">501</p>
	<p class="option target_option">301</p>
	<p class="option target_option">101</p>
</div>

<div class="setup_option">
	<h3>LEGS</h3>
	<p class="option leg_option">1</p>
	<p class="option leg_option">2</p>
	<p class="option leg_option">3</p>
	<p class="option leg_option">4</p>
	<p class="option leg_option">5</p>
</div>


<a href="game.php" class="button green_button">start game</a>