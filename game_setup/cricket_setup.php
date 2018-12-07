<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

// unset($_SESSION['opponent_guest']);
// unset($_SESSION['opponent_user']);

?>

<h1>CRICKET SETUP</h1>



<div class="setup_option cricket_setup">
	<h3>OPPONENT</h3>
	<p class="option opp_option">v guest</p>
	<p class="option opp_option">v user</p>
	<div class="opponent">
		<?php
			// IF THE FORM HAS BEEN SUBMITTED (GUEST NAME OR USER LOGGING IN)
			if ($_SERVER['REQUEST_METHOD'] == 'POST') 
			{

				// IF GUEST NAME HAS BEEN SUBMITTED
				if (isset($_POST['guest_name'])) 
				{
					unset($_SESSION['opponent_user']);
					$_SESSION['opponent_guest'] = $_POST['guest_name'];
					echo 'Opponent - ' . $_SESSION['opponent_guest'];
				}
				// IF LOGGING IN FORM HAS BEEN SUBMITTED
				else
				{
					unset($_SESSION['opponent_guest']);
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
							if ($opp_username == $user_username) 
							{
								echo 'user already in use, log in as another user';
								unset($_SESSION['opponent_user']);
							}
							else
							{
								$_SESSION['opponent_user'] = $opp_username;
								echo 'Opponent - ' . $_SESSION['opponent_user'];
							}
						}
						else
						{
							unset($_SESSION['opponent_user']);
							echo 'INCORRECT PASSWORD';
						}
					}
					else
					{
						unset($_SESSION['opponent_user']);
						echo 'NO USER WITH THAT USERNAME';
					}
				}
			}
			// IF FORM HASNT BEEN SUBMITTED - SINGLE PLAYER SELECTED
			else
			{
				unset($_SESSION['opponent_user']);
				unset($_SESSION['opponent_guest']);
			}
			// var_dump($_SESSION);
		?>
	</div>
</div>

<div class="setup_option cricket_setup">
	<h3>Innings</h3>
	<p class="option innings_option">1</p>
	<p class="option innings_option">2</p>
</div>


<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>

var opp_options = $('.opp_option');
if (localStorage['opponent'] == 'guest') 
{
	$(opp_options[0]).removeClass('opaque');
	$(opp_options[1]).addClass('opaque');
}
else if (localStorage['opponent'] == 'user') 
{
	$(opp_options[0]).addClass('opaque');
	$(opp_options[1]).removeClass('opaque');
}

var start_button = '<a href="game.php" class="button green_button start_button">start game</a>';
// SETUP GAME
var opp_options = $('.opp_option');
opp_options.on('click', function()
{
	window.localStorage.clear();
	for (var i = 0; i < opp_options.length; i++) 
	{
		$(opp_options[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var text = $(this).text();
	if (text == 'v guest')
	{
		localStorage['opponent'] = 'guest';
		$('.opponent').empty();
		$('.opponent').append(guest_name);
	}
	else if (text == 'v user')
	{
		localStorage['opponent'] = 'user';
		$('.opponent').empty();
		$('.opponent').append(user_form);
	}
	else
	{
		$('.opponent').empty();
	}
	var opponent = localStorage['opponent'];
	// console.log(opponent);
})

var user_form = 
'<form action="game_setup.php?game=cricket" method="post" class="opponent">'+
	'<input type="text" name="opp_user" placeholder="username"><input type="password" name="opp_pass" placeholder="password">'+
	'<input type="submit" value="Login" class="button green_button" id="u_login">'+
'</form>';

var guest_name = 
'<form action="game_setup.php?game=cricket" method="post" class="opponent">'+
	'<input type="text" name="guest_name" placeholder="enter name">'+
	'<input type="submit" value="Enter name" class="button green_button" id="g_name">'+
'</form>';

var innings = $('.innings_option');
innings.on('click', function()
{
	for (var i = 0; i < innings.length; i++) 
	{
		$(innings[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var innings_selected = $(this).text();
	localStorage['innings'] = innings_selected;

	if (localStorage.hasOwnProperty('opponent') == true && localStorage.hasOwnProperty('innings') == true) 
	{
		if ($('.start_button').length > 0) 
		{
			return;
		}
		else
		{
			$('.game_setup').append(start_button);
		}
	}
	
})

</script>






