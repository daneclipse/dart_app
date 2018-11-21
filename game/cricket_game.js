console.log(players);

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
			text = 'WICKET';
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
		wickets = 0;
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
		player.bowler_innings.turn_score = total + ' wickets';
		player.bowler_innings.turn_scores.push(player.bowler_innings.turn_score);
		playerGo();
		dart = 0;
		wickets = 0;
		total = 0;
	}
}

// FUNCTION TO CHECK IF SCORE IS EITHER 25 OR 50 (OUTERBULL OR BULLSEYE) = WICKET/ WICKETS TAKEN
function check_bully( player, score )
{
	if (score == 25 || score == 50) 
	{
		var wicket_obj = {};
		if (score == 25) 
		{
			if (player.player_type == 'bowler') 
			{
				player.bowler_innings.outer_bulls++;
				player.bowler_innings.wickets_left--;
				player.bowler_innings.wickets_taken++;

				players.players[1].batsman_innings.wickets_left = player.bowler_innings.wickets_left;
				players.players[1].batsman_innings.wickets_fallen = player.bowler_innings.wickets_taken;	
			}
			else if (player.player_type == 'batsman')
			{
				player.batsman_innings.run_outs++;
				player.batsman_innings.wickets_left--;
				player.batsman_innings.wickets_fallen++;

				players.players[0].bowler_innings.wickets_left = player.batsman_innings.wickets_left;
				players.players[0].bowler_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			}
		}
		else
		{
			if (player.player_type == 'bowler') 
			{
				player.bowler_innings.bullseyes++;
				player.bowler_innings.wickets_left = player.bowler_innings.wickets_left - 2;
				player.bowler_innings.wickets_taken = player.bowler_innings.wickets_taken + 2;

				players.players[1].batsman_innings.wickets_left = player.bowler_innings.wickets_left;
				players.players[1].batsman_innings.wickets_fallen = player.bowler_innings.wickets_taken;
			}
			else if (player.player_type == 'batsman')
			{
				player.batsman_innings.run_outs = player.batsman_innings.run_outs + 2;
				player.batsman_innings.wickets_left = player.batsman_innings.wickets_left - 2;
				player.batsman_innings.wickets_fallen = player.batsman_innings.wickets_fallen + 2;

				players.players[0].bowler_innings.wickets_left = player.batsman_innings.wickets_left;
				players.players[0].bowler_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			}
		}

		wicket_obj['wicket'] = players.players[0].bowler_innings.wickets_taken;
		wicket_obj['score'] = players.players[1].batsman_innings.runs_scored;
		players.players[0].bowler_innings.wickets.push(wicket_obj);
		players.players[1].batsman_innings.wickets.push(wicket_obj);

		wicket_taken();

		return true;
	}
}

// FUNCTION TO FADE OUT THE WICKET THAT HAS BEEN HIT & SCORE RELATING TO THAT WICKET
function wicket_taken()
{
	for (var i = 0; i < wicketSection.length; i++) 
	{
		if (wicketSection[i].textContent == players.players[0].bowler_innings.wickets_taken) 
		{
			$(wicketSection[i]).css('opacity', '0.2');
			if ($(wicketSection[i]).css('opacity') == '0.2')
			{
				$(wicketSection[i - 1]).css('opacity', '0.2');
			}
			$(gameWicketsSection).text( players.players[0].bowler_innings.wickets_taken );
			$(gameScoreSection).text(players.players[1].batsman_innings.runs_scored);
		}
	}
	// ADD THE TOTAL SCORE WHEN THE WICKET IS TAKEN
	for (var i = 0; i < wicketScoreSection.length; i++) 
	{
		if ($(wicketScoreSection[i]).attr('id') == players.players[1].batsman_innings.wickets_fallen) 
		{
			$(wicketScoreSection[i]).text(players.players[1].batsman_innings.runs_scored);
			$(wicketScoreSection[i]).css('opacity', '0.2');
			if ($(wicketScoreSection[i - 1]).text().length == 0) 
			{
				$(wicketScoreSection[i - 1]).text(players.players[1].batsman_innings.runs_scored);
			}
			if ($(wicketScoreSection[i - 1]).css('opacity') != '0.2' || $(wicketScoreSection[i - 1]).css('opacity') == undefined) 
			{
				$(wicketScoreSection[i - 1]).css('opacity', '0.2');
			}
		}
	}

	if (players.players[0].bowler_innings.wickets_left <= 0)
	{
		players.players[0].bowler_innings.wickets_left = 0;
		players.players[0].bowler_innings.wickets_taken = 10;
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
			player.game_stats.first_innings.wicket_difference = player.game_stats.first_innings.wickets_taken - player.game_stats.first_innings.wickets_fallen;
			player.game_stats.first_innings.conceded = player.bowler_innings.runs_conceded;
		}
		else
		{
			player.game_stats.second_innings.wickets_taken = player.bowler_innings.wickets_taken;
			player.game_stats.second_innings.wickets_fallen = player.batsman_innings.wickets_fallen;
			player.game_stats.second_innings.wicket_difference = player.game_stats.second_innings.wickets_taken - player.game_stats.second_innings.wickets_fallen;
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
		}
		else
		{
			player.game_stats.second_innings.score = player.batsman_innings.runs_scored;
			player.game_stats.total_runs = player.game_stats.first_innings.score + player.game_stats.second_innings.score;
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
		// IF INNINGS SELECTED == 1
		if (player.game_stats.innings_selected == player.game_stats.innings_played) 
		{
			var first_player_total = players.players[0].game_stats.first_innings.score;
			var second_player_total = players.players[1].game_stats.first_innings.score;

			if (first_player_total > second_player_total) 
			{
				players.players[0].game_stats.first_innings.outcome = 'won';
				players.players[0].game_stats.first_innings.run_difference = first_player_total - second_player_total;
				if (players.players[0].game_stats.first_innings.wicket_difference == 0) 
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
				if (players.players[0].game_stats.first_innings.wicket_difference == 0) 
				{
					var method = 'lost by ' +  players.players[1].game_stats.first_innings.run_difference + ' runs';
				}
				else
				{
					var method = 'lost by ' + players.players[1].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[1].game_stats.first_innings.run_difference + ' runs';
				}
				players.players[1].game_stats.first_innings.outcome_method = method;
				players.players[1].game_stats.game_outcome = 'lost';
			}
			else if (first_player_total < second_player_total) 
			{
				players.players[1].game_stats.first_innings.outcome = 'won';
				players.players[1].game_stats.first_innings.run_difference = second_player_total - first_player_total;
				if (players.players[1].game_stats.first_innings.wicket_difference == 0) 
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
				if (players.players[1].game_stats.first_innings.wicket_difference == 0) 
				{
					var method = 'lost by ' +  players.players[0].game_stats.first_innings.run_difference + ' runs';
				}
				else
				{
					var method = 'lost by ' + players.players[0].game_stats.first_innings.wicket_difference + ' wickets and ' + players.players[1].game_stats.first_innings.run_difference + ' runs';
				}
				players.players[0].game_stats.first_innings.outcome_method = method;
				players.players[0].game_stats.game_outcome = 'lost';
			}
			else
			{
				players.players[0].game_stats.first_innings.outcome = 'draw';
				players.players[0].game_stats.first_innings.run_difference = 0;
				players.players[0].game_stats.game_outcome = 'draw';
				players.players[1].game_stats.first_innings.outcome = 'draw';
				players.players[1].game_stats.first_innings.run_difference = 0;
				players.players[1].game_stats.game_outcome = 'draw';
			}

			end_innings();
			// end_game();
		}
		// IF INNINGS SELECTED == 2 - CHANGE ORDER OF THROW & PLAYER TYPES - RESET INNING STATS
		else
		{
			for (var i = 0; i < players.players.length; i++) 
			{
				update_inning_db(players.players[i], players.players[i].game_stats.first_innings.outcome);
				change_order(i);
				reset_inning_stats(players.players[i]);
			}
			
		}
	}
	// IF PLAYER HAS BOWLED TWICE &  BATTED ONCE
	else if (player.game_stats.bowled == 2 && player.game_stats.batted == 1) 
	{
		// IF THEIR TOTAL RUNS (FROM TWO INNINGS) IS LESS THAN SECOND PLAYERS TOTAL RUNS (FROM FIRST INNINGS) - END GAME
		if (player.game_stats.total_runs < players.players[1].game_stats.total_runs) 
		{
			end_game();
		}
		// IF IS DOESNT - CHANGE ORDER & PLAYER TYPES
		else
		{
			for (var i = 0; i < players.players.length; i++) 
			{
				change_order(i);
			}
		}
	}
	else if (player.game_stats.bowled == 2 && player.game_stats.batted == 2)
	{
		player.game_stats.innings_played = 2;
		var first_player_total = players.players[0].game_stats.second_innings.score;
		var second_player_total = players.players[1].game_stats.second_innings.score;

		if (first_player_total > second_player_total) 
		{
			players.players[0].game_stats.second_innings.outcome = 'won';
			players.players[0].game_stats.second_innings.run_difference = first_player_total - second_player_total;
			players.players[0].game_stats.innings_won = 2;
			players.players[1].game_stats.second_innings.outcome = 'lost';
			players.players[1].game_stats.second_innings.run_difference = '-'+first_player_total - second_player_total;
		}
		else if (first_player_total < second_player_total) 
		{
			players.players[1].game_stats.second_innings.outcome = 'won';
			players.players[1].game_stats.second_innings.run_difference = second_player_total - first_player_total;
			players.players[1].game_stats.innings_won = 2;
			players.players[0].game_stats.second_innings.outcome = 'lost';
			players.players[0].game_stats.second_innings.run_difference = '-'+second_player_total - first_player_total;
		}
		else
		{
			players.players[0].game_stats.second_innings.outcome = 'draw';
			players.players[0].game_stats.second_innings.run_difference = 0;
			players.players[1].game_stats.second_innings.outcome = 'draw';
			players.players[1].game_stats.second_innings.run_difference = 0;
		}

		for (var i = 0; i < players.players.length; i++) 
		{
			update_inning_db(players.players[i], players.players[i].game_stats.second_innings.outcome);

			var first_outcome = players.players[i].game_stats.first_innings.outcome;
			var second_outcome = players.players[i].game_stats.second_innings.outcome;
			if (first_outcome == 'won') 
			{
				if (second_outcome == 'won' || second_outcome == 'draw') 
				{
					players.players[i].game_stats.game_outcome = 'won';
				}
				else
				{
					players.players[i].game_stats.game_outcome = 'draw';
				}
			}
			else if (first_outcome == 'lost')
			{
				if (second_outcome == 'lost' || second_outcome == 'draw') 
				{
					players.players[i].game_stats.game_outcome = 'lost';
				}
				else
				{
					players.players[i].game_stats.game_outcome = 'draw';
				}
			}
			else if (first_outcome == 'draw') 
			{
				if (second_outcome == 'won') 
				{
					players.players[i].game_stats.game_outcome = 'won';
				}
				else if (second_outcome == 'lost')
				{
					players.players[i].game_stats.game_outcome = 'lost';
				}
				else 
				{
					players.players[i].game_stats.game_outcome = 'draw';
				}
			}
			update_game_db(players.players[i], players.players[i].game_stats.game_outcome);
		}
		end_game();
	}
	else
	{
		$(oppScoreSection).text(players.players[1].game_stats.first_innings.score);
		$(gameScoreSection).text('');
		$(gameWicketsSection).text('');
		for (var i = 0; i < players.players.length; i++) 
		{
			change_order(i);
		}

		for (var i = 0; i < wicketSection.length; i++) 
		{
			$(wicketSection[i]).css('opacity', '1');
		}
		for (var i = 0; i < wicketScoreSection.length; i++) 
		{
			$(wicketScoreSection[i]).css('opacity', '1');
			$(wicketScoreSection[i]).text('');
		}

		$(nameSection).text(players.players[0].name);
		$(playerTypeSection).text(players.players[0].player_type);
		$(firstSection).text('');
		$(secondSection).text('');
		$(thirdSection).text('');
		$(totalSection).text('');
		dart = 0;
	}
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

function change_order( index )
{
	if (index > 0) 
	{
		newIndex = index - 1;
	} 
	else 
	{
		newIndex = 0;
	}
	if (index < players.players.length) 
	{
		newIndex = index + 1;
	} 
	else 
	{
		newIndex = players.players.length - 1;
	}
	arraymove(players.players, index, newIndex );
	players.current = 0;
	players.players[0].player_type = 'bowler';
	players.players[1].player_type = 'batsman';
}

function reset_inning_stats( player )
{
// BOWLER
	player.bowler_innings.wickets_left = 10;
	player.bowler_innings.wickets_taken = 0;
	player.bowler_innings.wickets = [];
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
	player.batsman_innings.wickets = [];			
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

// FUNCTION TO SHOW HOW MANY WICKETS HAVE BEEN TAKING FOR CURRENT TURN IN TOTAL SECTION
function bowler_turn( player, total )
{
	if (total > 0) 
	{
		if (total > 1) 
		{
			$(totalSection).text(total + ' wickets');
		}
		else
		{
			$(totalSection).text(total + ' wicket');
		}
	}
	else
	{
		$(totalSection).text('0 wickets');
	}
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
		else (score == 50)
		{
			text = '2 run outs';
		}
		wicket_taken();
		score = 0;
	}

	if (dart == 1) 
	{
		player.batsman_innings.turn_score = 0;
		check_batsman_score( player, score, text, player.batsman_innings.first_dart );
		firstSection.text(text);
		$(secondSection).text('');
		$(thirdSection).text('');
	}
	else if (dart == 2) 
	{
		check_batsman_score( player, score, text, player.batsman_innings.second_dart );
		secondSection.text(text);
		$(thirdSection).text('');
	}
	else if (dart == 3)
	{
		check_batsman_score( player, score, text, player.batsman_innings.third_dart );
		thirdSection.text(text);
		playerGo();
		dart = 0;
	}
}

function check_batsman_score( player, score, text, dart_num )
{
	dart_num = score;
	player.batsman_innings.turn_score = player.batsman_innings.turn_score + score;
	player.batsman_innings.scores.push(score);
	player.batsman_innings.scores_text.push(text);
	batsman_turn( player, dart );
	
	// IF PLAYER HAS BOWLED - OPPONENT HAS A SCORE TO BEAT
	if (player.game_stats.bowled > 0) 
	{
		// IF TURN SCORE IS OVER 41 - PLAYER HAS SCORED RUNS
		if (player.batsman_innings.turn_score > 41) 
		{
			// var scored = player.batsman_innings.turn_score - 41;
			// player.batsman_innings.runs_scored = player.batsman_innings.runs_scored + scored;
			var current_total = player.batsman_innings.runs_scored;

			// IF PLAYER TOTAL IS BIGGER THAN OPPONENTS TOTAL SCORE - PLAYER HAS WON
			if (current_total > players.players[0].game_stats.first_innings.score) 
			{
				if (dart == 1 || dart == 2) 
				{
					player.batsman_innings.turn_runs.push(scored);
					player.batsman_innings.turn_scores.push(player.batsman_innings.turn_score);
				}
				players.players[0].game_stats.bowled++;
				players.players[1].game_stats.batted++;
				for (var i = 0; i < players.players.length; i++) 
				{
					update_game_stats(players.players[i]);
				}
				check_scores();
			}
		}
	}
}

function batsman_turn( player, dart_num )
{
	if (player.batsman_innings.turn_score > 41) 
	{
		var runs = player.batsman_innings.turn_score - 41;
		player.batsman_innings.runs_scored = player.batsman_innings.runs_scored + runs;
		player.batsman_innings.total_scored = player.batsman_innings.total_scored + player.batsman_innings.turn_score;
		if (dart_num == 3) 
		{
			player.batsman_innings.over_forty_one++;
			player.batsman_innings.turn_scores.push(player.batsman_innings.turn_score);
			player.batsman_innings.turn_runs.push(runs);
		}
	}
	else
	{
		var runs = 0;
		player.batsman_innings.runs_scored = player.batsman_innings.runs_scored + runs;
		player.batsman_innings.total_scored = player.batsman_innings.total_scored + player.batsman_innings.turn_score;
		if (dart_num == 3) 
		{
			player.batsman_innings.under_forty_one++;
		}
		
	}
	$(totalSection).text(runs + ' runs scored');
	$(gameScoreSection).text(player.batsman_innings.runs_scored);
	$('#gameWickets').text(player.batsman_innings.wickets_fallen);
	players.players[0].bowler_innings.runs_conceded = players.players[0].bowler_innings.runs_conceded + runs;
	for (var i = 0; i < wicketScoreSection.length; i++) 
	{
		if ($(wicketScoreSection[i]).attr('id') == 11 - player.batsman_innings.wickets_left) 
		{
			$(wicketScoreSection[i]).text(players.players[1].batsman_innings.runs_scored);
			if ($(wicketScoreSection[i - 1]).text().length == 0) 
			{
				$(wicketScoreSection[i - 1]).text(players.players[1].batsman_innings.runs_scored);
			}
		}
	}
}

function end_innings()
{
	var innings_selected = players.players[0].game_stats.innings_selected;
	var innings_played = players.players[0].game_stats.innings_played;

	var button = document.createElement('button');

	$('.game').hide();
	$('.board').hide();

	if (innings_played == innings_selected) 
	{
		button.textContent = 'finish game';
	}
	else
	{
		button.textContent = 'start next innings';
	}
	$('.page').append(button);
	console.log(players.players[0].game_stats.innings_won);
	console.log(players.players[1].game_stats.innings_won);
	button.onclick = function()
	{
			players.players[0].game_stats.total_run_difference = players.players[0].game_stats.first_innings.run_difference;
			players.players[1].game_stats.total_run_difference = players.players[1].game_stats.first_innings.run_difference;
			update_inning_db(players.players[0], players.players[0].game_stats.first_innings.outcome);
			update_game_db(players.players[0], players.players[0].game_stats.game_outcome);
			update_inning_db(players.players[1], players.players[1].game_stats.first_innings.outcome);
			update_game_db(players.players[1], players.players[1].game_stats.game_outcome);
		if ($(button).text('finish game')) 
		{
			location.replace('account.php');
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
};

