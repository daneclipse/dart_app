<?php
include('connection.php');

session_start();

$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>X01 GAME</h1>

<div class="setup_option x01_setup">
	<h3>OPPONENT</h3>
	<p class="option opp_option">single</p>
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
				else if (isset($_POST['opp_user']))
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
							echo 'INCORRECT PASSWORD';
						}
					}
					else
					{
						echo 'NO USER WITH THAT USERNAME';
					}
				}
			}
			// IF FORM HASNT BEEN SUBMITTED - SINGLE PLAYER SELECTED
			else
			{
				unset($_SESSION['opponent_user']);
				unset($_SESSION['opponent_guest']);
				unset($_SESSION['REQUEST_METHOD']);
			}
		?>
	</div>
</div>

<div class="setup_option x01_setup">
	<h3>TARGET</h3>
	<p class="option target_option">1001</p>
	<p class="option target_option">601</p>
	<p class="option target_option">501</p>
	<p class="option target_option">301</p>
	<p class="option target_option">101</p>
</div>

<div class="setup_option x01_setup">
	<h3>LEGS</h3>
	<p class="option leg_option">1</p>
	<p class="option leg_option">2</p>
	<p class="option leg_option">3</p>
	<p class="option leg_option">4</p>
	<p class="option leg_option">5</p>
</div>


<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>

var opp_options = $('.opp_option');

if (localStorage['opponent'] == 'none') 
{		
	$(opp_options[0]).removeClass('opaque');
	$(opp_options[1]).addClass('opaque');
	$(opp_options[2]).addClass('opaque');

}
else if (localStorage['opponent'] == 'guest') 
{
	$(opp_options[0]).addClass('opaque');
	$(opp_options[1]).removeClass('opaque');
	$(opp_options[2]).addClass('opaque');
}
else if (localStorage['opponent'] == 'user') 
{
	$(opp_options[0]).addClass('opaque');
	$(opp_options[1]).addClass('opaque');
	$(opp_options[2]).removeClass('opaque');
}


var start_button = '<a href="game.php" class="button green_button start_button">start game</a>';
// SETUP GAME
var opp_options = $('.opp_option');
opp_options.on('click', function()
{
	localStorage.clear();
	for (var i = 0; i < opp_options.length; i++) 
	{
		$(opp_options[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var text = $(this).text();
	if (text == 'single') 
	{
		localStorage['opponent'] = 'none';
		$('.opponent').empty();
		location.replace('game_setup.php?game=x01');
	}
	else if (text == 'v guest')
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
'<form action="game_setup.php?game=x01" method="post" class="opponent">'+
	'<input type="text" name="opp_user" placeholder="username">'+
	'<input type="password" name="opp_pass" placeholder="password">'+
	'<input type="submit" value="Login" class="button green_button u_login">'+
'</form>';

var guest_name = 
'<form action="game_setup.php?game=x01" method="post" class="opponent">'+
	'<input type="text" name="guest_name" placeholder="enter name">'+
	'<input type="submit" value="Enter name" class="button green_button g_name">'+
'</form>';

var targets = $('.target_option');
targets.on('click', function()
{	
	for (var i = 0; i < targets.length; i++) 
	{
		$(targets[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var target = $(this).text();
	localStorage['target'] = target;
	$('#target_selected').text(target);
})

var legs = $('.leg_option');
legs.on('click', function()
{
	for (var i = 0; i < legs.length; i++) 
	{
		$(legs[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var leg = $(this).text();
	localStorage['leg'] = leg;

	if (localStorage['opponent'] == undefined || localStorage['opponent'] == '' || localStorage['target'] == undefined || localStorage['leg'] == undefined) 
	{
		$(start_button).remove();
	}
	else
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

