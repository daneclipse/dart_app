

var friendly = $('#friendly');
var wire = $('#refwire');

/* MAKES DOUBLES, TREBLES & BULLSEYE BIGGER */
friendly.on('click', function(evt)
{
	evt.stopPropagation();
	if ( $('.board').hasClass('scale') ) 
	{
		wire.attr({'y1': '16.20', 'x1': '2.566'});
	} 
	else 
	{
		wire.attr({'y1': '21.20', 'x1': '3.566'});
	}
	$('.board').toggleClass('scale');
});

var board = $('.board');
var single = $('.single');
var double = $('.double');
var treble = $('.treble');
var dart = 0;

single.on('click', function()
{
	var segment = $(this).attr('data-value');
	var num_hit = segment * 1;
	var score = 1;
	mark_score(players.players[0].target_num, segment, score, players.players[0]);
})

double.on('click', function()
{
	var segment = $(this).attr('data-value');
	var num_hit = segment * 2;
	var score = 2;
	mark_score(players.players[0].target_num, segment, score, players.players[0]);
})

treble.on('click', function()
{
	var segment = $(this).attr('data-value');
	var num_hit = segment * 3;
	var score = 3;
	mark_score(players.players[0].target_num, segment, score, players.players[0]);
})

function mark_score(target, num_hit, score, player)
{
	dart++;
	player.num_darts++;
	if (num_hit == target) 
	{

		if (num_hit == 25 || num_hit == 50) 
		{
			if (num_hit == 25) 
			{
				var text = 'hit outerbull';
			}
			else
			{
				var text = 'hit bullseye';
				end_game();
			}
		}
		else
		{
			var text = 'hit ' + num_hit;
		}

		if (target < 20) 
		{
			player.target_num++;
		}
		else if (target == 20)
		{
			player.target_num = 25;
		}
		else if (target == 25)
		{
			player.target_num = 50;
		}

		if (score == 1) 
		{
			player.singles_hit++;
		}
		else if (score == 2)
		{
			player.doubles_hit++;
		}
		else if (score == 3)
		{
			player.trebles_hit++;
		}
	}
	else
	{
		var score = 0;
		var text = 'miss';
		player.missed_darts++;
	}

	player.scores.push(score);
	player.scores_text.push(text);
	player.points_scored = player.points_scored + score;

	if (dart <= 3) 
	{
		if (dart == 1) 
		{
			$('#firstSection').text('');
			$('#secondSection').text('');
			$('#thirdSection').text('');
			$('#firstSection').text(text);
		}
		else if (dart == 2)
		{
			$('#secondSection').text(text);
		}
		else if (dart == 3)
		{
			$('#thirdSection').text(text);
			dart = 0;
		}

		if (player.target_num == 25 || player.target_num == 50) 
		{
			if (player.target_num == 25) 
			{
				var aim_at = 'outerbull';
			}
			else
			{
				var aim_at = 'bullseye';
			}
		}
		else
		{
			var aim_at = player.target_num;
		}
		$('#targetSection').text('Aim at ' + aim_at);
	}
	else
	{
		dart = 0;
	}
}

var undo = $('#undo_score');
undo.on('click', function()
{
	var player = players.players[0];
	if (player.num_darts <= 0) 
	{
		player.points_scored = 0;
		player.num_darts = 0;
		return;
	}
	else
	{
		if ($('.board').is(':hidden'))
		{
			$('.board').show();
			$('.game').show();
			$('.complete_game').remove();
		}


		if (dart == 1) 
		{
			$('#firstSection').text('');
			check_undo(player);
			dart = 0;
		}
		else if (dart == 2)
		{
			$('#secondSection').text('')
			check_undo(player);
			dart = 1;
		}
		else if (dart == 0)
		{
			var third_score = player.scores_text[player.scores_text.length - 1];
			var second_score = player.scores_text[player.scores_text.length - 2];
			var first_score = player.scores_text[player.scores_text.length - 3];
			$('#thirdSection').text('');
			$('#secondSection').text(second_score);
			$('#firstSection').text(first_score);
			check_undo(player);
			dart = 2;
		}
	}
})

function check_undo(player)
{
	var last_text = player.scores_text[player.scores_text.length - 1];
	if (last_text == 'miss') 
	{
		player.missed_darts--;
	}
	else
	{
		var last_target = last_text.split(' ')[1];
		if (last_target == 'outerbull') 
		{
			player.target_num = 25;
			var text = 'outerbull';
		}
		else if (last_target == 'bullseye')
		{
			player.target_num = 50;
			var text = 'bullseye';
		}
		else
		{
			player.target_num = Number(last_target);
			var text = player.target_num;
		}

		if (player.target_num < 1) 
		{
			player.target_num = 1;
		}

		$('#targetSection').text('Aim at ' + text );

		var last_score = player.scores[player.scores.length - 1];
		if (last_score == 1) 
		{
			player.singles_hit--;
		}
		else if (last_score == 2)
		{
			player.doubles_hit--;
		}
		else if (last_score == 3)
		{
			player.trebles_hit--;
		}
		player.points_scored = player.points_scored - last_score;
	}

	player.num_darts--;
	player.scores.pop();
	player.scores_text.pop();
}

function end_game()
{
	$('.board').hide();
	$('.game').hide();
	// $('.game_buttons').hide();

	var complete_game_button = document.createElement('button');
	$(complete_game_button).addClass('button green_button complete_game');
	complete_game_button.textContent = 'complete game';

	$('.page').append(complete_game_button);

	complete_game_button.onclick = function()
	{
		update_rtw_db(players.players[0]);
	}
}

function update_rtw_db(player)
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			$('.stats').innerHTML = this.responseText;
		}
	}
	xmlhttp.open('GET', 'update_stats.php?name='+player.name+
		'&darts='+player.num_darts+
		'&singles='+player.singles_hit+
		'&doubles='+player.doubles_hit+
		'&trebles='+player.trebles_hit+
		'&points='+player.points_scored+
		'&missed='+player.missed_darts, true);
	xmlhttp.send();
	location.replace('account.php');
}



















