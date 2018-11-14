// SETUP GAME
var options = $('.opp_option');
options.on('click', function()
{
	var text = $(this).text();
	if (text == 'single') 
	{
		localStorage['opponent'] = 'none';
		$('.opponent').empty();
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

var user_form = '<form action="game_setup.php?game=x01" method="post" class="opponent"><input type="text" name="opp_user" placeholder="username"><input type="password" name="opp_pass" placeholder="password"><input type="submit" value="Login" class="button green_button"></form>';
var guest_name = '<form action="game_setup.php?game=x01" method="post" class="opponent"><input type="text" name="guest_name" placeholder="enter name"><input type="submit" value="Enter name" class="button green_button"></form>';

var targets = $('.target_option');
targets.on('click', function()
{
	var target = $(this).text();
	localStorage['target'] = target;
	console.log(localStorage['target']);
})

var legs = $('.leg_option');
legs.on('click', function()
{
	var leg = $(this).text();
	localStorage['leg'] = leg;
	console.log(localStorage['leg']);
})