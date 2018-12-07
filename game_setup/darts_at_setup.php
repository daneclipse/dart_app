<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

?>

<h1>100 DARTS SETUP</h1>


<div class="setup_option darts_at_setup">
	<h3>Number of darts</h3>
<!-- 	
	<p class="option darts_option">9 (3 sets)</p>
	<p class="option darts_option">27 (9 sets)</p>
	<p class="option darts_option">45 (15 sets)</p>
	<p class="option darts_option">63 (21 sets)</p>
	<p class="option darts_option">81 (27 sets)</p> 
-->
	<p class="option darts_option">10</p>
	<p class="option darts_option">25</p>
	<p class="option darts_option">50</p>
	<p class="option darts_option">75</p>
	<p class="option darts_option">100</p>
</div>

<div class="setup_option darts_at_setup">
	<h3>Target</h3>
	<p class="option target_option">20</p>
	<p class="option target_option">19</p>
	<p class="option target_option">18</p>
	<p class="option target_option">17</p>
	<p class="option target_option">16</p>
	<p class="option target_option">15</p>
	<p class="option target_option">bullseye</p>
</div>

<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>

var start_button = '<a href="game.php" class="button green_button start_button">start game</a>';
// SETUP GAME

var darts = $('.darts_option');
var target = $('.target_option');

darts.on('click', function()
{
	for (var i = 0; i < darts.length; i++) 
	{
		$(darts[i]).addClass('opaque');
		$(this).removeClass('opaque');
	}
	var darts_selected = $(this).text();
	localStorage['darts'] = darts_selected;

	target.on('click', function()
	{
		for (var i = 0; i < target.length; i++) 
		{
			$(target[i]).addClass('opaque');
			$(this).removeClass('opaque');
		}

		var target_selected = $(this).text();
		localStorage['target'] = target_selected;

		if (localStorage.hasOwnProperty('darts') == true && localStorage.hasOwnProperty('target') == true) 
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
})

</script>