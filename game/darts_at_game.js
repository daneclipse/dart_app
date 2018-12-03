var darts_left_section = $('#darts_left');

var single = $('.single');
var double = $('.double');
var treble = $('.treble');
var board = $('.board');

var singles_area = $('#singles');
var doubles_area = $('#doubles');
var trebles_area = $('#trebles');
var points_area = $('#points');
var score_area = $('#score');
var missed_area = $('#missed');

var first_area = $('#firstSection');
var second_area = $('#secondSection');
var third_area = $('#thirdSection');
var total_area = $('#totalSection');

var friendly = $('#friendly');
var wire = $('#refwire');
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

var player = players[0];
var target_num = player.target_num;
var dart = 0;

single.on('click', function(e)
{
	e.stopPropagation();
	var num_hit = Number($(this).attr('data-value'));
	dart++;
	if (num_hit == target_num) 
	{
		var text = 'single';
		var score = num_hit * 1;
		var points = 1;
	}
	else
	{
		var text = 'miss';
		var score = 0;
		var points = 0;
	}

	if (player.game.darts_left >= 1) 
	{
		score_dart(player, text, score, points);
	}
	else
	{
		end_game(player);
	}

})

double.on('click', function(e)
{
	e.stopPropagation();
	var num_hit = Number($(this).attr('data-value'));
	dart++;
	if (num_hit == target_num) 
	{
		var text = 'double';
		var score = num_hit * 2;
		var points = 2;
	}
	else
	{
		var text = 'miss';
		var score = 0;
		var points = 0;
	}

	if (player.game.darts_left >= 1) 
	{
		score_dart(player, text, score, points);
	}
	else
	{
		end_game(player);
	}

})

treble.on('click', function(e)
{
	e.stopPropagation();
	var num_hit = Number($(this).attr('data-value'));
	dart++;
	if (num_hit == target_num) 
	{
		var text = 'treble';
		var score = num_hit * 3;
		var points = 3;
	}
	else
	{
		var text = 'miss';
		var score = 0;
		var points = 0;
	}

	if (player.game.darts_left >= 1) 
	{
		score_dart(player, text, score, points);
	}
	else
	{
		end_game(player);
	}

})

board.on('click', function()
{
	dart++;
	var text = 'miss';
	var score = 0;
	var points = 0;

	if (player.game.darts_left >= 1) 
	{
		score_dart(player, text, score, points);
	}
	else
	{
		end_game(player);
	}

})


function score_dart(player, text, score, points)
{
	player.game.darts_left--;
	$(darts_left_section).text(player.game.darts_left);
	if (dart == 1) 
	{
		$(firstSection).text(text);
	}
	else if (dart == 2)
	{
		$(secondSection).text(text);
	}
	else if (dart == 3)
	{
		$(thirdSection).text(text);
		score_third_dart(player);
		dart = 0;
	}

	if (text == 'single') 
	{
		player.game.singles_hit++;
	}
	else if (text == 'double')
	{
		player.game.doubles_hit++;
	}
	else if (text == 'treble')
	{
		player.game.trebles_hit++
	}
	else if (text == 'miss')
	{
		player.game.darts_missed++;
	}

	player.game.scores.push(score);
	player.game.scores_text.push(text);
	player.game.points = player.game.points + points;
	player.game.total_score = player.game.total_score + score;
	player.game.total_points = player.game.total_points + points;
	player.game.turn_score = player.game.turn_score + score;
	$(darts_left_section).text(player.game.darts_left);
	$(singles_area).text(player.game.singles_hit);
	$(doubles_area).text(player.game.doubles_hit);
	$(trebles_area).text(player.game.trebles_hit);
	$(points_area).text(player.game.total_points);
	$(score_area).text(player.game.total_score);
	$(missed_area).text(player.game.darts_missed);

	if (player.game.darts_left == 0) 
	{
		end_game(player);
	}
}

function score_third_dart(player)
{
	player.game.turn_points.push(player.game.points);
	player.game.turn_scores.push(player.game.turn_score);
	player.game.points = 0;
	player.game.turn_score = 0;

	$(firstSection).text('');
	$(secondSection).text('');
	$(thirdSection).text('');
}

var undo = $('#undo_score');
undo.on('click', function()
{
	if ($('.board').is(':hidden')) 
	{
		$('.board').show();
		$('#complete_game').remove();
	}
	var target = player.target_num;
	if (player.game.scores.length > 0) 
	{
		if (dart == 1) 
		{
			undo_dart(player);
			$(firstSection).text('');
			dart = 0;
		}
		else if (dart == 2) 
		{
			undo_dart(player);
			$(secondSection).text('');
			dart = 1;
		}
		else if (dart == 3) 
		{
			undo_dart(player);
			$(thirdSection).text('');
			dart = 2;
		}
		else if (dart == 0)
		{
			$(thirdSection).text(player.game.scores_text[player.game.scores_text.length - 1]);
			$(secondSection).text(player.game.scores_text[player.game.scores_text.length - 2]);
			$(firstSection).text(player.game.scores_text[player.game.scores_text.length - 3]);
			dart = 3;
		}
	}

})

function undo_dart(player)
{
	var target = player.target_num;
	var last_score = player.game.scores[player.game.scores.length - 1];
	var last_text = player.game.scores_text[player.game.scores_text.length - 1];

	// IF TARGET NUM WAS HIT
	if (last_score != 0) 
	{
		// IF TREBLE WAS HIT
		if (last_score / 3 == target) 
		{
			player.game.trebles_hit--;
			var take_points = 3;
		}
		else if (last_score / 2 == target)
		{
			player.game.doubles_hit--;
			var take_points = 2;
		}
		else if (last_score / 1 == target)
		{
			player.game.singles_hit--;
			var take_points = 1;
		}
	}
	else 
	{
		player.game.darts_missed--;
		var take_points = 0;
	}

	player.game.points = player.game.points - take_points;
	player.game.total_points = player.game.total_points - take_points;
	player.game.total_score = player.game.total_score - last_score;
	player.game.turn_score = player.game.turn_score - last_score;
	player.game.scores.pop();
	player.game.scores_text.pop();
	player.game.darts_left++;
	$(darts_left_section).text(player.game.darts_left);
	$(singles_area).text(player.game.singles_hit);
	$(doubles_area).text(player.game.doubles_hit);
	$(trebles_area).text(player.game.trebles_hit);
	$(points_area).text(player.game.total_points);
	$(score_area).text(player.game.total_score);
	$(missed_area).text(player.game.darts_missed);
}

function end_game(player)
{
	$('.board').hide();
	var complete_game = document.createElement('button');
	$(complete_game).addClass('button green_button');
	$(complete_game).attr('id', 'complete_game');
	$(complete_game).text('complete game');

	$('.game').append(complete_game);

	$(complete_game).on('click', function()
	{
		var complete = confirm('Are you sure you want to complete the game?');
		if (complete) 
		{
			var xmlhttp;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					$('#stats').innerHTML = this.responseText;
				}
			}
			xmlhttp.open('GET', 'update_stats.php?name='+player.name+
				'&darts='+player.darts_selected+
				'&target='+player.target_num+
				'&singles='+player.game.singles_hit+
				'&doubles='+player.game.doubles_hit+
				'&trebles='+player.game.trebles_hit+
				'&points='+player.game.total_points+
				'&score='+player.game.total_score+
				'&missed='+player.game.darts_missed, true);
			xmlhttp.send();
		}
	})
}









