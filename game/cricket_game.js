
var board = $('.board');
var single = $('.single');
var double = $('.double');
var treble = $('.treble');
var dart = 0;

var firstSection = $('#firstSection');
var secondSection = $('#secondSection');
var thirdSection = $('#thirdSection');
var totalSection = $('#totalSection');

var wicketSection = $('.bowler_score');
var wicketScoreSection = $('.batter_score');

var gameInningsSection = $('#gameInnings');
var gameScoreSection = $('#game_score');
var gameWicketsSection = $('#gameWickets');
var firstInningsSection = $('#firstInningsScore');
var oppScoreSection = $('#oppScore');

var friendly = $('#friendly');
var wire = $('#refwire');

// MAKES DOUBLES, TREBLES & BULLSEYE BIGGER
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

// DISPLAYS FIRST PLAYER NAME & PLAYER TYPE IN THE PLAYER SCOREBOARD
$('#nameSection').text(players.players[0].name);
$('#playerTypeSection').text(players.players[0].player_type);

single.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var num_hit = $(this).attr('data-value');
	var score = Number(num_hit);
	var text = 's' + num_hit;
	var class_name = $(this).attr('class');
	if (currentPlayer.player_type == 'bowler') 
	{
		score_bowler( currentPlayer, score, text, class_name);
	}
	else if (currentPlayer.player_type == 'batsman')
	{
		score_batsman( currentPlayer, score, text);
	}
})

double.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var num_hit = $(this).attr('data-value');
	var score = Number(num_hit * 2);
	var text = 'd' + num_hit;
	var class_name = $(this).attr('class');
	if (currentPlayer.player_type == 'bowler') 
	{
		score_bowler( currentPlayer, score, text, class_name );
	}
	else if (currentPlayer.player_type == 'batsman')
	{
		score_batsman( currentPlayer, score, text);
	}
})

treble.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var num_hit = $(this).attr('data-value');
	var score = Number(num_hit * 3);
	var text = 't' + num_hit;
	var class_name = $(this).attr('class').split(' ')[1];
	console.log(class_name);
	if (currentPlayer.player_type == 'bowler') 
	{
		score_bowler( currentPlayer, score, text, class_name );
	}
	else if (currentPlayer.player_type == 'batsman')
	{
		score_batsman( currentPlayer, score, text);
	}
})

board.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var score = 0;
	var text = 'miss';
	var class_name = $(this).attr('class');
	if (currentPlayer.player_type == 'bowler') 
	{
		score_bowler( currentPlayer, score, text, class_name );
	}
	else if (currentPlayer.player_type == 'batsman')
	{
		score_batsman( currentPlayer, score, text);
	}
})

// SCORE THE BOWLER
var wickets = 0;
var total = 0;
function score_bowler( player, score, text, class_name )
{
	player.bowler_innings.num_darts++;
	dart++;

	// CHECKS TO SEE IF PLAYER HAS HIT A BULLSEYE - CHECK_BULLY FUNCTION RETURNS TRUE IF DID
	if ( check_bully(player, score) ) 
	{
		if (score == 50) 
		{
			text = '2 WICKETS';
			wickets = 2;
		}
		else
		{
			text = '1 WICKET';
			wickets = 1;
		}
	}
	// CHECKS IF PLAYER HAS HIT A TREBLE - IF SO ADD THAT SCORE ONTO BATSMAN SCORE
	else if ( class_name == 'treble' )
	{
		player.bowler_innings.wides++;
		player.bowler_innings.runs_given.push(score);
		players.players[1].batsman_innings.runs_scored = players.players[1].batsman_innings.runs_scored + score;
		text = 'wide - added ' + score + ' runs';
		// bowler_turn( player, score );
		wickets = 0;
		$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);
		var wicket_section = players.players[1].batsman_innings.wickets_fallen - 1;
		$(wicketScoreSection[wicket_section]).text(players.players[1].batsman_innings.runs_scored);
	}
	// IF HAVENT HIT BULLSEYE OR TREBLE
	else
	{
		score = 0;
		text = 'miss';
		wickets = 0;
		player.bowler_innings.darts_missed++;
	}

	player.bowler_innings.scores.push(score);
	player.bowler_innings.scores_text.push(text);
	
	if (dart == 1) 
	{
		total = 0;
		firstSection.text(text);
		$(secondSection).text('');
		$(thirdSection).text('');
		total = wickets;
		bowler_turn( player, total );
	}
	else if (dart == 2)
	{
		secondSection.text(text);
		$(thirdSection).text('');
		total = total + wickets;
		bowler_turn( player, total );
	}
	else if (dart == 3)
	{
		thirdSection.text(text);
		total = total + wickets;
		bowler_turn( player, total );
		player.bowler_innings.turn_scores.push(player.bowler_innings.turn_score);
		playerGo();
		dart = 0;
	}
}


// FUNCTION TO SHOW HOW MANY WICKETS HAVE BEEN TAKING FOR CURRENT TURN IN TOTAL SECTION
function bowler_turn( player, num )
{
	if (num == 1) 
	{
		$(totalSection).text(num + ' wicket');
	}
	else 
	{
		$(totalSection).text(num + ' wickets');
	}
	player.bowler_innings.turn_score = num + ' wickets';
	
}

// SCORE THE BATSMAN
function score_batsman( player, score, text )
{
	player.batsman_innings.num_darts++;
	dart++;

	if ( check_bully(player, score) ) 
	{
		if (score == 25) 
		{
			text = 'run out';
		}
		else if (score == 50)
		{
			text = '2 run outs';
		}
		wicket_taken();
		score = 0;
	}

	if (dart == 1) 
	{
		player.batsman_innings.turn_score = 0;
		batsman_turn( player, score, text, dart );
		firstSection.text(text);
		$(secondSection).text('');
		$(thirdSection).text('');
	}
	else if (dart == 2) 
	{
		batsman_turn( player, score, text, dart );
		secondSection.text(text);
		$(thirdSection).text('');
	}
	else if (dart == 3)
	{
		batsman_turn( player, score, text, dart );
		thirdSection.text(text);
		playerGo();
		dart = 0;
	}
}

function batsman_turn( player, score, text, dart )
{
	player.batsman_innings.scores.push(score);
	player.batsman_innings.scores_text.push(text);
	player.batsman_innings.turn_score = player.batsman_innings.turn_score + score;
	player.batsman_innings.total_scored = player.batsman_innings.total_scored + score;
	if (dart == 3) 
	{
		if (player.batsman_innings.turn_score > 41) 
		{
			var runs_scored = player.batsman_innings.turn_score - 41;
			player.batsman_innings.over_forty_one++;
		}
		else
		{
			var runs_scored = 0;
			player.batsman_innings.under_forty_one++;
		}

		player.batsman_innings.turn_scores.push(player.batsman_innings.turn_score);
		player.batsman_innings.turn_runs.push(runs_scored);
		player.batsman_innings.runs_scored = player.batsman_innings.runs_scored + runs_scored;
		$(totalSection).text(runs_scored + ' runs scored');
		$(gameScoreSection).text(player.batsman_innings.runs_scored);
		$('#gameWickets').text(player.batsman_innings.wickets_fallen);
		check_batsman_score( player );
	}
}

function check_batsman_score( player )
{
	for (var i = 0; i < wicketScoreSection.length; i++) 
	{
		var section_id = $(wicketScoreSection[i]).attr('id');
		var current_wicket = player.batsman_innings.wickets_fallen + 1;
		if (section_id == current_wicket) 
		{
			$(wicketScoreSection[i]).text(player.batsman_innings.runs_scored);
		}
	}
	// IF PLAYER HAS BOWLED - OPPONENT HAS A SCORE TO BEAT
	if (player.game_stats.bowled > 0)
	{
		// IF GAME IS ONE INNINGS
		if(player.innings == 1) 
		{
		// IF CURRENT RUNS SCORED IS BIGGER THAN OPPONENTS SCORE - PLAYER HAS WON
			if (player.batsman_innings.runs_scored > players.players[0].game_stats.first_innings.score) 
			{
				players.players[0].game_stats.bowled++;
				players.players[1].game_stats.batted++;
				for (var i = 0; i < players.players.length; i++) 
				{
					update_game_stats(players.players[i]);
				}
				check_scores();
			}
		}
		// IF GAME IS TWO INNINGS
			// else if (player.innings == 2) 
			// {
			// 	// GET FIRST PLAYERS TOTAL SCORE AND CURRENT PLAYERS SCORE NOW
			// 	var score_to_beat = players.players[0].game_stats.total_runs;
			// 	var total_score = player.game_stats.total_runs + player.batsman_innings.runs_scored;

			// 	if (total_score > score_to_beat) 
			// 	{
			// 		players.players[0].game_stats.bowled++;
			// 		players.players[1].game_stats.batted++;
			// 		for (var i = 0; i < players.players.length; i++) 
			// 		{
			// 			update_game_stats(players.players[i]);
			// 		}
			// 		check_scores();
			// 	}
			// }
	}
}

// FUNCTION TO CHECK IF SCORE IS EITHER 25 OR 50 (OUTERBULL OR BULLSEYE) = WICKET/ WICKETS TAKEN
function check_bully( player, score )
{
	if (score == 25 || score == 50) 
	{
		if (score == 25) 
		{
			if (player.player_type == 'bowler') 
			{
				player.bowler_innings.outer_bulls++;
				player.bowler_innings.wickets_left--;
				player.bowler_innings.wickets_taken++;

				players.players[1].batsman_innings.wickets_left--;
				players.players[1].batsman_innings.wickets_fallen++;	
			}
			else if (player.player_type == 'batsman')
			{
				player.batsman_innings.run_outs++;
				player.batsman_innings.wickets_left--;
				player.batsman_innings.wickets_fallen++;

				players.players[0].bowler_innings.wickets_left--;
			}
		}
		else
		{
			if (player.player_type == 'bowler') 
			{
				player.bowler_innings.bullseyes++;
				player.bowler_innings.wickets_left = player.bowler_innings.wickets_left - 2;
				player.bowler_innings.wickets_taken = player.bowler_innings.wickets_taken + 2;

				players.players[1].batsman_innings.wickets_left = players.players[1].batsman_innings.wickets_left - 2;
				players.players[1].batsman_innings.wickets_fallen = players.players[1].batsman_innings.wickets_fallen + 2;
			}
			else if (player.player_type == 'batsman')
			{
				player.batsman_innings.run_outs = player.batsman_innings.run_outs + 2;
				player.batsman_innings.wickets_left = player.batsman_innings.wickets_left - 2;
				player.batsman_innings.wickets_fallen = player.batsman_innings.wickets_fallen + 2;

				players.players[0].bowler_innings.wickets_left = players.players[0].bowler_innings.wickets_left + 2;
			}
		}

		// players.players[0].bowler_innings.wickets[players.players[1].batsman_innings.wickets_fallen].score = players.players[1].batsman_innings.runs_scored;
		// wicket_obj['wicket'] = players.players[0].bowler_innings.wickets_taken;
		// wicket_obj['score'] = 
		// players.players[0].bowler_innings.wickets.push(wicket_obj);
		// players.players[1].batsman_innings.wickets.push(wicket_obj);

		wicket_taken();

		return true;
	}
}

// FUNCTION TO FADE OUT THE WICKET THAT HAS BEEN HIT & SCORE RELATING TO THAT WICKET
function wicket_taken()
{
	for (var i = 0; i < wicketSection.length; i++) 
	{
		if (wicketSection[i].textContent == players.players[1].batsman_innings.wickets_fallen) 
		{
			$(wicketSection[i]).css('opacity', '0.2');
			if ($(wicketSection[i]).css('opacity') == '0.2')
			{
				$(wicketSection[i - 1]).css('opacity', '0.2');
			}
			$(gameWicketsSection).text( players.players[1].batsman_innings.wickets_fallen );
			$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);
		}
	}
	// ADD THE TOTAL SCORE WHEN THE WICKET IS TAKEN
	for (var i = 0; i < wicketScoreSection.length; i++) 
	{
		if ($(wicketScoreSection[i]).attr('id') == players.players[1].batsman_innings.wickets_fallen) 
		{
			players.players[0].bowler_innings.wickets[i].score = players.players[1].batsman_innings.runs_scored;
			players.players[1].batsman_innings.wickets[i].score = players.players[1].batsman_innings.runs_scored;

			$(wicketScoreSection[i]).text(players.players[1].batsman_innings.runs_scored);
			$(wicketScoreSection[i]).css('opacity', '0.2');

			if ($(wicketScoreSection[i - 1]).text().length == 0) 
			{
				$(wicketScoreSection[i - 1]).text(players.players[1].batsman_innings.runs_scored);
			}

			if ($(wicketScoreSection[i - 1]).css('opacity') != '0.2' || $(wicketScoreSection[i - 1]).css('opacity') == undefined) 
			{
				$(wicketScoreSection[i - 1]).css('opacity', '0.2');
				if (i > 0) 
				{
					players.players[0].bowler_innings.wickets[i - 1].score = players.players[1].batsman_innings.runs_scored;
					players.players[1].batsman_innings.wickets[i - 1].score = players.players[1].batsman_innings.runs_scored;
				}
				
			}
		}
	}

	

	if (players.players[1].batsman_innings.wickets_left <= 0)
	{
		players.players[0].bowler_innings.wickets_left = 0;
		players.players[1].batsman_innings.wickets_left = 0;
		players.players[1].batsman_innings.wickets_fallen = 10;
		players.players[0].game_stats.bowled++;
		players.players[1].game_stats.batted++;
		for (var i = 0; i < players.players.length; i++) 
		{
			update_game_stats( players.players[i] );
		}
		check_scores();
	}
}
	
function update_game_stats( player )
{
	if (player.player_type == 'bowler') 
	{
		if (player.game_stats.bowled == 1) 
		{
			player.game_stats.first_innings.wickets_taken = player.bowler_innings.wickets_taken;
			player.game_stats.first_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			player.game_stats.first_innings.wicket_difference = 10 - player.game_stats.first_innings.wickets_fallen;
			player.game_stats.first_innings.conceded = player.bowler_innings.runs_conceded;
		}
		else
		{
			player.game_stats.second_innings.wickets_taken = player.bowler_innings.wickets_taken;
			player.game_stats.second_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			player.game_stats.second_innings.wicket_difference = 10 - player.game_stats.second_innings.wickets_fallen;
			player.game_stats.second_innings.conceded = player.bowler_innings.runs_conceded;

		}
		player.game_stats.total_outer_bulls = player.game_stats.total_outer_bulls + player.bowler_innings.outer_bulls;
		player.game_stats.total_bullseyes = player.game_stats.total_bullseyes + player.bowler_innings.bullseyes;
		player.game_stats.total_wides = player.game_stats.total_wides + player.bowler_innings.wides;
		player.game_stats.bowled_darts = player.bowler_innings.num_darts;
		player.game_stats.total_runs_conceded = player.game_stats.first_innings.conceded + player.game_stats.second_innings.conceded;
	}
	else if (player.player_type == 'batsman')
	{
		if (player.game_stats.batted == 1) 
		{
			player.game_stats.first_innings.score = player.batsman_innings.runs_scored;
			player.game_stats.first_innings.wickets_taken = player.bowler_innings.wickets_taken;
			player.game_stats.first_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			player.game_stats.first_innings.wicket_difference = 10 - player.game_stats.first_innings.wickets_fallen;
		}
		else
		{
			player.game_stats.second_innings.score = player.batsman_innings.runs_scored;
			player.game_stats.total_runs = player.game_stats.first_innings.score + player.game_stats.second_innings.score;
			player.game_stats.second_innings.wickets_taken = player.bowler_innings.wickets_taken;
			player.game_stats.second_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			player.game_stats.second_innings.wicket_difference = 10 - player.game_stats.second_innings.wickets_fallen;
		}
		player.game_stats.total_runs = player.game_stats.total_runs + player.batsman_innings.runs_scored;
		player.game_stats.total_over = player.game_stats.total_over + player.batsman_innings.over_forty_one;
		player.game_stats.total_under = player.game_stats.total_under + player.batsman_innings.under_forty_one;
		player.game_stats.total_run_outs = player.game_stats.total_run_outs + player.batsman_innings.run_outs;
		player.game_stats.batted_darts = player.batsman_innings.num_darts;
	}
	player.game_stats.total_wicket_difference = player.game_stats.first_innings.wicket_difference + player.game_stats.second_innings.wicket_difference;
	player.game_stats.total_run_difference = player.game_stats.total_runs - player.game_stats.total_runs_conceded;
	player.game_stats.total_darts = player.game_stats.bowled_darts + player.game_stats.batted_darts;
}

function check_scores()
{
	var player = players.players[0];

	// IF PLAYER HAS BOWLED & BATTED - END OF INNINGS
	if (player.game_stats.bowled == 1 && player.game_stats.batted == 1) 
	{
		players.players[0].game_stats.innings_played = 1;
		players.players[1].game_stats.innings_played = 1;

		var first_player_total = players.players[0].game_stats.first_innings.score;
		var second_player_total = players.players[1].game_stats.first_innings.score;

		// IF FIRST PLAYERS SCORE IS BIGGER THAN SECOND PLAYERS SCORE - FIRST PLAYER HAS WON THE INNINGS & GAME
		if (first_player_total > second_player_total) 
		{
			players.players[0].game_stats.first_innings.outcome = 'won';
			players.players[0].game_stats.first_innings.run_difference = first_player_total - second_player_total;
			if (players.players[0].game_stats.first_innings.wicket_difference <= 0) 
			{
				var method = 'won by ' +  players.players[0].game_stats.first_innings.run_difference + ' runs';
			}
			else
			{
				var method = 'won by ' + players.players[0].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[0].game_stats.first_innings.run_difference + ' runs';
			}
			
			players.players[0].game_stats.first_innings.outcome_method = method;
			players.players[0].game_stats.innings_won = 1;
			players.players[0].game_stats.game_outcome = 'won';

			players.players[1].game_stats.first_innings.outcome = 'lost';
			players.players[1].game_stats.first_innings.run_difference = first_player_total - second_player_total;
			if (players.players[0].game_stats.first_innings.wicket_difference <= 0) 
			{
				var method = 'lost by ' +  players.players[0].game_stats.first_innings.run_difference + ' runs';
			}
			else
			{
				var method = 'lost by ' + players.players[0].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[0].game_stats.first_innings.run_difference + ' runs';
			}
			players.players[1].game_stats.first_innings.outcome_method = method;
			players.players[1].game_stats.game_outcome = 'lost';
		}
		// IF SECOND PLAYERS SCORE IS BIGGER THAN FIRST PLAYERS SCORE - SECOND PLAYER HAS WON THE INNINGS & GAME
		else if (first_player_total < second_player_total) 
		{
			players.players[1].game_stats.first_innings.outcome = 'won';
			players.players[1].game_stats.first_innings.run_difference = second_player_total - first_player_total;
			if (players.players[1].game_stats.first_innings.wicket_difference <= 0) 
			{
				var method = 'won by ' +  players.players[1].game_stats.first_innings.run_difference + ' runs';
			}
			else
			{
				var method = 'won by ' + players.players[1].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[1].game_stats.first_innings.run_difference + ' runs';
			}
			players.players[1].game_stats.first_innings.outcome_method = method;
			players.players[1].game_stats.innings_won = 1;
			players.players[1].game_stats.game_outcome = 'won';

			players.players[0].game_stats.first_innings.outcome = 'lost';
			players.players[0].game_stats.first_innings.run_difference = second_player_total - first_player_total;
			if (players.players[1].game_stats.first_innings.wicket_difference <= 0) 
			{
				var method = 'lost by ' +  players.players[1].game_stats.first_innings.run_difference + ' runs';
			}
			else
			{
				var method = 'lost by ' + players.players[1].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[1].game_stats.first_innings.run_difference + ' runs';
			}
			players.players[0].game_stats.first_innings.outcome_method = method;
			players.players[0].game_stats.game_outcome = 'lost';
		}
		// OTHERWISE THEY SCORED THE SAME - INNINGS & GAME HAS BEEN DRAWN
		else
		{
			players.players[0].game_stats.first_innings.outcome = 'draw';
			players.players[0].game_stats.first_innings.run_difference = 0;
			players.players[0].game_stats.game_outcome = 'draw';
			players.players[1].game_stats.first_innings.outcome = 'draw';
			players.players[1].game_stats.first_innings.run_difference = 0;
			players.players[1].game_stats.game_outcome = 'draw';
		}

		if (player.innings == 1) 
		{
			end_innings();
		}
		
	}
	// IF PLAYER HAS BOWLED TWICE &  BATTED ONCE
		// else if (player.game_stats.bowled == 2 && player.game_stats.batted == 1) 
		// {
		// 	// IF THEIR TOTAL RUNS (FROM TWO INNINGS) IS LESS THAN SECOND PLAYERS TOTAL RUNS (FROM FIRST INNINGS) - END GAME
		// 	if (player.game_stats.total_runs < players.players[1].game_stats.total_runs) 
		// 	{
		// 		end_innings();
		// 	}
		// 	// IF IS DOESNT - CHANGE ORDER & PLAYER TYPES
		// 	else
		// 	{
		// 		change_order();
		// 	}
		// }
		// else if (player.game_stats.bowled == 2 && player.game_stats.batted == 2)
		// {
		// 	player.game_stats.innings_played = 2;
		// 	var first_player_total = players.players[0].game_stats.second_innings.score;
		// 	var second_player_total = players.players[1].game_stats.second_innings.score;

		// 	if (first_player_total > second_player_total) 
		// 	{
		// 		players.players[0].game_stats.second_innings.outcome = 'won';
		// 		players.players[0].game_stats.second_innings.run_difference = first_player_total - second_player_total;
		// 		players.players[0].game_stats.innings_won = 2;
		// 		players.players[1].game_stats.second_innings.outcome = 'lost';
		// 		players.players[1].game_stats.second_innings.run_difference = '-'+first_player_total - second_player_total;
		// 	}
		// 	else if (first_player_total < second_player_total) 
		// 	{
		// 		players.players[1].game_stats.second_innings.outcome = 'won';
		// 		players.players[1].game_stats.second_innings.run_difference = second_player_total - first_player_total;
		// 		players.players[1].game_stats.innings_won = 2;
		// 		players.players[0].game_stats.second_innings.outcome = 'lost';
		// 		players.players[0].game_stats.second_innings.run_difference = '-'+second_player_total - first_player_total;
		// 	}
		// 	else
		// 	{
		// 		players.players[0].game_stats.second_innings.outcome = 'draw';
		// 		players.players[0].game_stats.second_innings.run_difference = 0;
		// 		players.players[1].game_stats.second_innings.outcome = 'draw';
		// 		players.players[1].game_stats.second_innings.run_difference = 0;
		// 	}

		// 	for (var i = 0; i < players.players.length; i++) 
		// 	{
		// 		var first_outcome = players.players[i].game_stats.first_innings.outcome;
		// 		var second_outcome = players.players[i].game_stats.second_innings.outcome;
		// 		if (first_outcome == 'won') 
		// 		{
		// 			if (second_outcome == 'won' || second_outcome == 'draw') 
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'won';
		// 			}
		// 			else
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'draw';
		// 			}
		// 		}
		// 		else if (first_outcome == 'lost')
		// 		{
		// 			if (second_outcome == 'lost' || second_outcome == 'draw') 
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'lost';
		// 			}
		// 			else
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'draw';
		// 			}
		// 		}
		// 		else if (first_outcome == 'draw') 
		// 		{
		// 			if (second_outcome == 'won') 
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'won';
		// 			}
		// 			else if (second_outcome == 'lost')
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'lost';
		// 			}
		// 			else 
		// 			{
		// 				players.players[i].game_stats.game_outcome = 'draw';
		// 			}
		// 		}
		// 	}
		// 	end_innings();
		// }
	else
	{
		change_order();
	}
}

// FUNCTION THAT HAPPENS AFTER INNINGS HAS BEEN WON
function end_innings()
{
	var innings_selected = players.players[0].game_stats.innings_selected;
	var innings_played = players.players[0].game_stats.innings_played;

	var end_game_button = document.createElement('button');
	var next_innings_button = document.createElement('button');
	end_game_button.textContent = 'finish game';
	next_innings_button.textContent = 'start next innings';

	$('.game').hide();
	$('.board').hide();

	// if (innings_played == innings_selected) 
	// {
	// 	$('.page').append(end_game_button);
	// }
	// else
	// {
	// 	$('.page').append(next_innings_button);
	// }

	$('.page').append(end_game_button);

	console.log(players.players[0].game_stats.innings_won);
	console.log(players.players[1].game_stats.innings_won);
	end_game_button.onclick = function()
	{
			// if (innings_played == 2) 
			// {
			// 	players.players[0].game_stats.total_run_difference = players.players[0].game_stats.total_run_difference + players.players[0].game_stats.second_innings.run_difference;
			// 	players.players[1].game_stats.total_run_difference = players.players[0].game_stats.total_run_difference + players.players[1].game_stats.second_innings.run_difference;
			// 	update_inning_db(players.players[0], players.players[0].game_stats.second_innings.outcome);
			// 	update_inning_db(players.players[1], players.players[1].game_stats.second_innings.outcome);
			// }
			// else 
			// {
			// 	players.players[0].game_stats.total_run_difference = players.players[0].game_stats.first_innings.run_difference;
			// 	players.players[1].game_stats.total_run_difference = players.players[1].game_stats.first_innings.run_difference;
			// 	update_inning_db(players.players[0], players.players[0].game_stats.first_innings.outcome);
			// 	update_inning_db(players.players[1], players.players[1].game_stats.first_innings.outcome);
			// }
		players.players[0].game_stats.total_run_difference = players.players[0].game_stats.first_innings.run_difference;
		players.players[1].game_stats.total_run_difference = players.players[1].game_stats.first_innings.run_difference;
		update_inning_db(players.players[0], players.players[0].game_stats.first_innings.outcome);
		update_inning_db(players.players[1], players.players[1].game_stats.first_innings.outcome);

		update_game_db(players.players[0], players.players[0].game_stats.game_outcome);
		update_game_db(players.players[1], players.players[1].game_stats.game_outcome);
		location.replace('account.php');
	}

	// next_innings_button.onclick = function()
	// {
	// 	players.players[0].game_stats.total_run_difference = players.players[0].game_stats.first_innings.run_difference;
	// 	players.players[1].game_stats.total_run_difference = players.players[1].game_stats.first_innings.run_difference;
	// 	update_inning_db(players.players[0], players.players[0].game_stats.first_innings.outcome);
	// 	update_inning_db(players.players[1], players.players[1].game_stats.first_innings.outcome);
	// 	for (var i = 0; i < players.players.length; i++) 
	// 	{
	// 		reset_inning_stats(players.players[i]);
	// 		change_order();
	// 	}
	// 	$(this).remove();
	// 	$('.game').show();
	// 	$('.board').show();
	// 	$('#firstInningsScore').text(players.players[0].game_stats.first_innings.score);
	// 	$('#oppScore').text(players.players[1].game_stats.first_innings.score);
	// }
}

function update_inning_db( player, outcome )
{
	var user_name = localStorage['user'];
	var opp_name = localStorage['opp_name'];
	if ( player.name == user_name) 
	{
		var opp = opp_name;
	}
	else if ( player.name == opp_name )
	{
		var opp = user_name;
	}

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
		'&type=inning'+
		'&opp='+opp+
		'&outcome='+outcome+
		'&method='+player.game_stats.first_innings.outcome_method+
		'&wickets='+player.batsman_innings.wickets_fallen+
		'&outer_bulls='+player.bowler_innings.outer_bulls+
		'&bullseyes='+player.bowler_innings.bullseyes+
		'&wides='+player.bowler_innings.wides+
		'&conceded='+player.bowler_innings.runs_conceded+
		'&runs='+player.batsman_innings.runs_scored+
		'&over='+player.batsman_innings.over_forty_one+
		'&under='+player.batsman_innings.under_forty_one+
		'&run_outs='+player.batsman_innings.run_outs+
		'&bowled_darts='+player.game_stats.bowled_darts+
		'&batted_darts='+player.game_stats.batted_darts
		, true);
	xmlhttp.send();
}

function update_game_db( player, outcome )
{
	var user_name = localStorage['user'];
	var opp_name = localStorage['opp_name'];
	if ( player.name == user_name) 
	{
		var opp = opp_name;
	}
	else if ( player.name == opp_name )
	{
		var opp = user_name;
	}

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
		'&type=game'+
		'&opp='+opp+
		'&innings='+player.innings+
		'$innings_won='+player.game_stats.innings_won+
		'&outcome='+outcome+
		'&wicket_difference='+player.game_stats.total_wicket_difference+
		'&run_difference='+player.game_stats.total_run_difference+
		'&outer_bulls='+player.game_stats.total_outer_bulls+
		'&bullseyes='+player.game_stats.total_bullseyes+
		'&wides='+player.game_stats.total_wides+
		'&conceded='+player.game_stats.total_runs_conceded+
		'&runs='+player.game_stats.total_runs+
		'&over='+player.game_stats.total_over+
		'&under='+player.game_stats.total_under+
		'&run_outs='+player.game_stats.total_run_outs
		, true);
	xmlhttp.send();
}

// USED IN changeOrder funtion TO MOVE ITEMS IN AN ARRAY
function arraymove(arr, fromIndex, toIndex) 
{
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function change_order()
{

	$(oppScoreSection).text(players.players[1].game_stats.first_innings.score);
	$(gameScoreSection).text('');
	$(gameWicketsSection).text('');

	for (var i = 0; i < wicketSection.length; i++) 
	{
		$(wicketSection[i]).css('opacity', '1');
	}
	for (var i = 0; i < wicketScoreSection.length; i++) 
	{
		$(wicketScoreSection[i]).css('opacity', '1');
		$(wicketScoreSection[i]).text('');
	}

	for (var i = 0 ; i < players.players.length; i++) 
	{
		if (i > 0) 
		{
			newIndex = i - 1;
		} 
		else 
		{
			newIndex = 0;
		}
		if (i < players.players.length) 
		{
			newIndex = i + 1;
		} 
		else 
		{
			newIndex = players.players.length - 1;
		}

		arraymove(players.players, i, newIndex );
	}
	players.current = 0;
	players.players[0].player_type = 'bowler';
	players.players[1].player_type = 'batsman';

	$(nameSection).text(players.players[0].name);
	$(playerTypeSection).text(players.players[0].player_type);
	$(firstSection).text('');
	$(secondSection).text('');
	$(thirdSection).text('');
	$(totalSection).text('');
	dart = 0;
}

function reset_inning_stats( player )
{
// BOWLER
	player.bowler_innings.wickets_left = 10;
	player.bowler_innings.wickets_taken = 0;
	player.bowler_innings.wickets = 
		[
			{
				wicket: 1,
				score: ''
			},
			{
				wicket: 2,
				score: ''
			},
			{
				wicket: 3,
				score: ''
			},
			{
				wicket: 4,
				score: ''
			},
			{
				wicket: 5,
				score: ''
			},
			{
				wicket: 6,
				score: ''
			},
			{
				wicket: 7,
				score: ''
			},
			{
				wicket: 8,
				score: ''
			},
			{
				wicket: 9,
				score: ''
			},
			{
				wicket: 10,
				score: ''
			}
		];
	player.bowler_innings.first_dart = 0;
	player.bowler_innings.second_dart = 0;
	player.bowler_innings.third_dart = 0;
	player.bowler_innings.scores = [];
	player.bowler_innings.scores_text = [];
	player.bowler_innings.turn_score = 0;
	player.bowler_innings.turn_scores = [];
	player.bowler_innings.outer_bulls = 0;
	player.bowler_innings.bullseyes = 0;
	player.bowler_innings.wides = 0;
	player.bowler_innings.runs_given = [];
	player.bowler_innings.darts_missed = 0;
	player.bowler_innings.num_darts = 0;
	player.bowler_innings.runs_conceded = 0;
	
// BATSMAN
	player.batsman_innings.wickets_left = 10;
	player.batsman_innings.wickets_fallen = 0;
	player.batsman_innings.wickets =
		[
			{
				wicket: 1,
				score: ''
			},
			{
				wicket: 2,
				score: ''
			},
			{
				wicket: 3,
				score: ''
			},
			{
				wicket: 4,
				score: ''
			},
			{
				wicket: 5,
				score: ''
			},
			{
				wicket: 6,
				score: ''
			},
			{
				wicket: 7,
				score: ''
			},
			{
				wicket: 8,
				score: ''
			},
			{
				wicket: 9,
				score: ''
			},
			{
				wicket: 10,
				score: ''
			}
		];			
	player.batsman_innings.first_dart = 0;
	player.batsman_innings.second_dart = 0;
	player.batsman_innings.third_dart = 0;
	player.batsman_innings.scores = [];
	player.batsman_innings.scores_text = [];
	player.batsman_innings.turn_score = 0;
	player.batsman_innings.turn_scores = [];
	player.batsman_innings.runs_scored = 0;
	player.batsman_innings.turn_runs = [];
	player.batsman_innings.over_forty_one = 0;
	player.batsman_innings.under_forty_one = 0;
	player.batsman_innings.run_outs = 0;
	player.batsman_innings.darts_missed = 0;
	player.batsman_innings.num_darts = 0;
	player.batsman_innings.total_scored = 0;
}

//  UNDO FUNCTION
var undo = $('#undo_score');
undo.on('click', function()
{
	var player = players.players[players.current];
	if (dart == 1) 
	{
		undo_first_dart(player);
	}
	else if (dart == 2)
	{
		undo_second_dart(player);
	}
	else if (dart == 3)
	{
		undo_third_dart(player);
	}
	else
	{
		if (players.players[0].bowler_innings.scores.length > 0) 
		{
			playerGo();
			var previous_player = players.players[players.current];
			undo_change_player( previous_player );
			dart = 3;
		}
		else
		{
			return;
		}
	}
})

// DISPLAYS THE PREVIOUS PLAYERS LAST TURN
function undo_change_player(player)
{
	if (player.player_type == 'bowler') 
	{
		player.bowler_innings.turn_score = player.bowler_innings.turn_scores[player.bowler_innings.turn_scores.length - 1];
		$(totalSection).text(player.bowler_innings.turn_score);

		$(thirdSection).text(player.bowler_innings.scores_text[player.bowler_innings.scores_text.length - 1]);
		$(secondSection).text(player.bowler_innings.scores_text[player.bowler_innings.scores_text.length - 2]);
		$(firstSection).text(player.bowler_innings.scores_text[player.bowler_innings.scores_text.length - 3]);
	}
	else if (player.player_type == 'batsman') 
	{
		var last_runs = player.batsman_innings.turn_runs[player.batsman_innings.turn_runs.length - 1];
		$(totalSection).text(last_runs + ' runs scored');

		$(thirdSection).text(player.batsman_innings.scores_text[player.batsman_innings.scores_text.length - 1]);
		$(secondSection).text(player.batsman_innings.scores_text[player.batsman_innings.scores_text.length - 2]);
		$(firstSection).text(player.batsman_innings.scores_text[player.batsman_innings.scores_text.length - 3]);
	}
}

function undo_first_dart(player)
{
	if (player.player_type == 'bowler') 
	{
		undo_bowler(player);
		player.bowler_innings.turn_score = '';
	}	
	else if (player.player_type == 'batsman')
	{
		undo_batsman(player);
	}
	$(firstSection).text('');
	dart = 0;
}


function undo_second_dart(player)
{
	if (player.player_type == 'bowler') 
	{
		undo_bowler(player);
	}
	else if (player.player_type == 'batsman')
	{
		undo_batsman(player);
	}
	$(secondSection).text('');
	dart = 1;
}

function undo_third_dart(player)
{
	if (player.player_type == 'bowler') 
	{
		player.bowler_innings.turn_scores.pop();
		undo_bowler(player);
	}
	else if (player.player_type == 'batsman')
	{
		var last_runs = player.batsman_innings.turn_runs[player.batsman_innings.turn_runs.length - 1];
		var last_score = player.batsman_innings.scores[player.batsman_innings.scores.length - 1];

		// IF BULLSEYE HAS BEEN HIT
		if (last_score == 0) 
		{
			undo_batsman(player);
		}

		player.batsman_innings.runs_scored = player.batsman_innings.runs_scored - last_runs;
		player.batsman_innings.turn_score = player.batsman_innings.turn_score - last_score;
		player.batsman_innings.total_scored = player.batsman_innings.total_scored - last_score;

		// IF RUNS HAVE BEEN SCORED
		if (last_runs > 0) 
		{
			player.batsman_innings.over_forty_one--;
		}
		else
		{
			player.batsman_innings.under_forty_one--;
		}

 		$(wicketScoreSection[players.players[1].batsman_innings.wickets_fallen]).text(players.players[1].batsman_innings.runs_scored);
		$(gameWicketsSection).text( players.players[1].batsman_innings.wickets_fallen );
		$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);

		// IF SCORE WAS OVER 0 (ANYTHING BUT BULLSEYES OR MISSED HIT), JUST TAKE THE LAST SCORE FROM ARRAYS
		if (last_score > 0) 
		{
			player.batsman_innings.scores.pop();
			player.batsman_innings.scores_text.pop();
			player.batsman_innings.turn_runs.pop();
			player.batsman_innings.turn_scores.pop();
			player.batsman_innings.num_darts--;
		}

		$(totalSection).text('');
	}
	$(thirdSection).text('');
	dart = 2;
}

function undo_bowler(player)
{
	var dart_score = player.bowler_innings.scores[player.bowler_innings.scores.length - 1];
	var wickets = player.bowler_innings.turn_score.split(' ')[0];

	// IF SINGLE, DOUBLE OR BOARD WAS HIT - DART MISSED
	if (dart_score == 0) 
	{
		player.bowler_innings.darts_missed--;
		total = total;
	}
	// IF BULLSEYE WAS HIT - WICKET(S) TAKEN
	else if (dart_score == 25 || dart_score == 50)
	{
		
		if (dart_score == 25) 
		{
			player.bowler_innings.outer_bulls--;
			var new_wickets = Number(wickets) - 1;
			player.bowler_innings.wickets_taken--;
			player.bowler_innings.wickets_left++;
			players.players[1].batsman_innings.wickets_fallen--;
			players.players[1].batsman_innings.wickets_left++;
			total = total - 1;
		}
		else
		{
			player.bowler_innings.bullseyes--;
			var new_wickets = Number(wickets) - 2;
			player.bowler_innings.wickets_taken = player.bowler_innings.wickets_taken - 2;
			player.bowler_innings.wickets_left = player.bowler_innings.wickets_left + 2;
			players.players[1].batsman_innings.wickets_fallen = players.players[1].batsman_innings.wickets_fallen - 2;
			players.players[1].batsman_innings.wickets_left = players.players[1].batsman_innings.wickets_left + 2;
			total = total - 2;
		}
		player.bowler_innings.turn_score = new_wickets + ' wickets';
		change_opacity();
	}
	// IF TREBLE WAS HIT - ADDED SCORES ONTO BATSMAN
	else
	{
		var scores_given = player.bowler_innings.runs_given[player.bowler_innings.runs_given.length - 1];
		players.players[1].batsman_innings.runs_scored = players.players[1].batsman_innings.runs_scored - scores_given;
		player.bowler_innings.runs_given.pop();
		$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);
	}
	$(totalSection).text(player.bowler_innings.turn_score);
	player.bowler_innings.num_darts--;
	player.bowler_innings.scores.pop();
	player.bowler_innings.scores_text.pop();
}

function undo_batsman(player)
{
	var last_score = player.batsman_innings.scores[player.batsman_innings.scores.length - 1];

	// IF WICKET HAS BEEN HIT
	if (last_score == 0) 
	{
		var last_text = player.batsman_innings.scores_text[player.batsman_innings.scores_text.length - 1];
		// OUTERBULL HIT - ONE WICKET TAKEN
		if (last_text == 'run out') 
		{
			player.batsman_innings.run_outs--;
			player.batsman_innings.wickets_fallen--;
			player.batsman_innings.wickets_left++;
			players.players[0].bowler_innings.wickets_left++;
			player.batsman_innings.wickets[player.batsman_innings.wickets_fallen].score = '';
			players.players[0].bowler_innings.wickets[players.players[1].batsman_innings.wickets_fallen].score = '';
		}
		// BULLSEYE HIT - TWO WICKETS TAKEN
		else if (last_text == '2 run outs')
		{
			player.batsman_innings.run_outs = player.batsman_innings.run_outs - 2;
			player.batsman_innings.wickets_fallen = player.batsman_innings.wickets_fallen - 2;
			player.batsman_innings.wickets_left = player.batsman_innings.wickets_left + 2;
			players.players[0].bowler_innings.wickets_left = players.players[0].bowler_innings.wickets_left + 2;
			player.batsman_innings.wickets[players.players[1].batsman_innings.wickets_fallen + 1].score = '';
			players.players[0].bowler_innings.wickets[players.players[1].batsman_innings.wickets_fallen + 1].score = '';
		}
		change_opacity();
	}

	player.batsman_innings.turn_score = player.batsman_innings.turn_score - last_score;
	player.batsman_innings.total_scored = player.batsman_innings.total_scored - last_score;

	player.batsman_innings.scores.pop();
	player.batsman_innings.scores_text.pop();
	player.batsman_innings.turn_runs.pop();
	player.batsman_innings.turn_scores.pop();
	player.batsman_innings.num_darts--;
}

// CHANGE OPACITY OF THE WICKETS & SCORE SECTION
function change_opacity()
{
	// HOW MANY WICKETS HAVE BEEN TAKEN - WICKETS TAKEN ARE OPAQUE
 	for (var i = 0; i < wicketSection.length; i++) 
 	{
 		if (wicketSection[i].textContent == players.players[1].batsman_innings.wickets_fallen + 1) 
 		{
 			$(wicketSection[i]).css('opacity', '1');
 			if ($(wicketSection[i]).css('opacity') == '1')
 			{
 				$(wicketSection[i + 1]).css('opacity', '1');
 			}
 			$(gameWicketsSection).text( players.players[1].batsman_innings.wickets_fallen );
 			$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);

 		}
 	}

 	// SHOWS WHAT SCORE BATSMAN WAS ON WHEN THE CORRESPONDING WICKET WAS TAKEN
 	for (var i = 0; i < wicketScoreSection.length; i++) 
 	{
 		if ($(wicketScoreSection[i]).attr('id') == players.players[1].batsman_innings.wickets_fallen + 1) 
 		{
 			$(wicketScoreSection[i]).css('opacity', '1');
 			$(wicketScoreSection[i]).text('');
 			if ($(wicketScoreSection[i]).css('opacity') == '1')
 			{
 				$(wicketScoreSection[i + 1]).css('opacity', '1');
 				$(wicketScoreSection[i + 1]).text('');
 			}
 			$(gameWicketsSection).text( players.players[1].batsman_innings.wickets_fallen );
 			$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);
 			players.players[0].bowler_innings.wickets[players.players[1].batsman_innings.wickets_fallen].score = '';
 			players.players[0].bowler_innings.wickets[players.players[1].batsman_innings.wickets_fallen + 1].score = '';
 			players.players[1].batsman_innings.wickets[players.players[1].batsman_innings.wickets_fallen].score = '';
 			players.players[1].batsman_innings.wickets[players.players[1].batsman_innings.wickets_fallen + 1].score = '';
 		}
 	}
}

function playerGo() 
{
	if ( players.current >= ( players.players.length - 1 ) ) 
	{
		players.current = 0;
	} 
	else 
	{
		players.current++;
	}
	$('#nameSection').text(players.players[players.current].name);
	$('#playerTypeSection').text(players.players[players.current].player_type);
	$(firstSection).text('');
	$(secondSection).text('');
	$(thirdSection).text('');
	$(totalSection).text('');
};

