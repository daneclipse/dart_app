if (localStorage['players']) 
{
	players.players = JSON.parse(localStorage['players']);
}

// CREATE SCOREBOARD FOR EACH PLAYER
function create_scoreboard( player )
{
	var section = document.createElement('div');
	var name_section = document.createElement('div');
	var first_section = document.createElement('div');
	var second_section = document.createElement('div');
	var third_section = document.createElement('div');
	var total_section = document.createElement('div');
	var target_section = document.createElement('div');

	$(section).addClass('scoreboard');
	$(name_section).addClass('inner_scoreboard');
	$(first_section).addClass('inner_scoreboard');
	$(second_section).addClass('inner_scoreboard');
	$(third_section).addClass('inner_scoreboard');
	$(total_section).addClass('inner_scoreboard');
	$(target_section).addClass('inner_scoreboard');

	name_section.textContent = player.name;
	first_section.textContent = '';
	second_section.textContent = '';
	third_section.textContent = '';
	total_section.textContent = '';
	target_section.textContent = player.target;

	player.section = section;
	player.nameSection = name_section;
	player.firstSection = first_section;
	player.secondSection = second_section;
	player.thirdSection = third_section;
	player.totalSection = total_section;
	player.targetSection = target_section;

	$(section).append(name_section);
	$(section).append(first_section);
	$(section).append(second_section);
	$(section).append(third_section);
	$(section).append(total_section);
	$(section).append(target_section);

	$('.game').append(section);
}

for (var i = 0; i < players.players.length; i++) 
{
	create_scoreboard( players.players[i] );
}

// MAKES DOUBLES, TREBLES & BULLSEYE BIGGER
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

// VARIABLES
var dart = 0;
var doubleClicked = false;

var single = $('.single');
var double = $('.double');
var treble = $('.treble');
var board = $('.board');
var undo = $('#undo_score');

// CHANGE COLOUR OF NAME SECTION - TO SHOW WHOS THROW IT IS
$(players.players[0].nameSection).css('background-color', '#91c46b');
if (players.players.length > 1) 
{
	dimPlayer( players.players[1] );
}


// WHEN AREAS OF THE DART BOARD ARE CLICKED (SINGLE, DOUBLE, TREBLE, BOARD(MISS))
single.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var score = Number($(this).attr('data-value'));
	var text = 's' + $(this).attr('data-value');
	doubleClicked = false;
	currentPlayer.leg_stats.scores.push(score);
	currentPlayer.leg_stats.scores_text.push(text);
	checkDart( score, text );
});

double.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var score = Number($(this).attr('data-value') * 2);
	var text = 'd' + $(this).attr('data-value');
	doubleClicked = true;
	currentPlayer.leg_stats.scores.push(score);
	currentPlayer.leg_stats.scores_text.push(text);
	checkDart( score, text );
});

treble.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var score = Number($(this).attr('data-value') * 3);
	var text = 't' + $(this).attr('data-value');
	doubleClicked = false;
	currentPlayer.leg_stats.scores.push(score);
	currentPlayer.leg_stats.scores_text.push(text);
	checkDart( score, text );
});

board.on('click', function(e)
{
	var currentPlayer = players.players[players.current];
	e.stopPropagation();
	var score = 0;
	var text = 'miss';
	doubleClicked = false;
	currentPlayer.leg_stats.scores.push(score);
	currentPlayer.leg_stats.scores_text.push(text);
	currentPlayer.leg_stats.darts_missed++;
	checkDart( score, text );
});

// FUNCTION TO CHECK THE CURRENT DART THROWN, IF OVER 3, DART = 0
function checkDart( score, text )
{
	var currentPlayer = players.players[players.current];
	if ( dart >= 3 ) 
	{
		dart = 0;
		currentPlayer.firstSection.textContent = '';
		currentPlayer.secondSection.textContent = '';
		currentPlayer.thirdSection.textContent = '';
		currentPlayer.totalSection.textContent = '';
	}
	dart++;
	scorer( currentPlayer, score, text );
}

// WORKS OUT THE DART NUMBER THEN USES THE RELEVANT FUNCTION TO SCORE FOR THAT DART
// WORKS OUT IF BUST AND RUNS THE BUST FUNCTION
// IF DOUBLE IS CLICKED & SCORE = 0 THEN LEG HAS BEEN WON
function scorer( player, score, text )
{
	if ( dart == 1 )
	{
		if (player.leg_stats.target_left - score >= 2) 
		{
			scoreFirstDart( player, score, text );
		}
		else if (player.leg_stats.target_left - score === 0) 
		{
			if (doubleClicked) 
			{
				scoreFirstDart( player, score, text );
				var doubleHit = score / 2;
				player.leg_stats.double_hit = doubleHit;
				leg_winner( player );
			}
			else
			{
				alert('bust');
				bust(player, 1);
			}
		}
		else
		{
			alert('BUST!');
			bust(player, 1);
		}
	}
	else if ( dart == 2 ) 
	{
		if (player.leg_stats.target_left - score >= 2) 
		{
			scoreSecondDart( player, score, text );
		}
		else if (player.leg_stats.target_left - score === 0) 
		{
			if (doubleClicked) 
			{
				scoreSecondDart( player, score, text );
				var doubleHit = score / 2;
				player.leg_stats.double_hit = doubleHit;
				leg_winner( player );
			}
			else
			{			
				alert('bust');
				bust(player, 2);
			}
		}
		else
		{
			alert('BUST!');
			bust(player, 2);
		}
	}
	else if ( dart == 3 )
	{
		if (player.leg_stats.target_left - score >= 2 ) 
		{
			scoreThirdDart( player, score, text );
			playerGo();
			var nextPlayer = players.players[players.current];
			// checkCheckout(0, nextPlayer);
			dimPlayer(player);
			highlightPlayer(nextPlayer);
		}
		else if (player.leg_stats.target_left - score === 0) 
		{
			if (doubleClicked) 
			{
				scoreThirdDart( player, score, text );
				var doubleHit = score / 2;
				player.leg_stats.double_hit = doubleHit;
				leg_winner( player );
			}
			else
			{			
				alert('bust');
				bust(player, 3);
			}
		}
		else
		{
			alert("BUST!");
			bust(player, 3);
		}
	}
}

function scoreFirstDart( player, score, text )
{
	player.leg_stats.num_darts++;
	player.leg_stats.total_scored = player.leg_stats.total_scored + score;
	player.first_dart = score;
	player.firstSection.textContent = text;
	player.leg_stats.turn_score = score;
	player.totalSection.textContent = player.leg_stats.turn_score;
	if (player.leg_stats.target_left == 50 || player.leg_stats.target_left <= 40 ) 
	{
		if(player.leg_stats.target_left % 2 == 0)
		{
			player.leg_stats.darts_at_double++;	
		}
	}
	player.leg_stats.target_left = player.leg_stats.target_left - score;
	player.targetSection.textContent = player.leg_stats.target_left;
	// CHECKOUT WITH TWO DARTS LEFT
	// checkCheckout(1, player);
}

function scoreSecondDart( player, score, text )
{
	player.leg_stats.num_darts++;
	player.leg_stats.total_scored = player.leg_stats.total_scored + score;
	player.leg_stats.second_dart = score;
	player.secondSection.textContent = text;
	player.leg_stats.turn_score = player.leg_stats.turn_score + score;
	player.totalSection.textContent = player.leg_stats.turn_score;
	if (player.leg_stats.target_left == 50 || player.leg_stats.target_left <= 40 ) 
	{
		if(player.leg_stats.target_left % 2 == 0)
		{
			player.leg_stats.darts_at_double++;	
		}
	}
	player.leg_stats.target_left = player.leg_stats.target_left - score;
	player.targetSection.textContent = player.leg_stats.target_left;
	// CHECKOUT WITH ONE DART LEFT
	// checkCheckout(2, player);
}

function scoreThirdDart( player, score, text )
{
	player.leg_stats.num_darts++;
	player.leg_stats.total_scored = player.leg_stats.total_scored + score;
	player.leg_stats.third_dart = score;
	player.thirdSection.textContent = text;
	player.leg_stats.turn_score = player.leg_stats.turn_score + score;
	if (player.leg_stats.turn_score > player.leg_stats.high_score) 
	{
		player.leg_stats.high_score = player.leg_stats.turn_score;
	}
	mark_turn_score( player, player.leg_stats.turn_score );
	player.totalSection.textContent = player.leg_stats.turn_score;
	player.leg_stats.previous_turn = player.leg_stats.turn_score;
	if (player.leg_stats.target_left == 50 || player.leg_stats.target_left <= 40 ) 
	{
		if(player.leg_stats.target_left % 2 == 0)
		{
			player.leg_stats.darts_at_double++;	
		}
	}
	player.leg_stats.target_left = player.leg_stats.target_left - score;
	player.targetSection.textContent = player.leg_stats.target_left;
	// CHECKOUT WITH THREE DARTS LEFT
}

// NEEDS TURN SCORE AND THEN MARKS DOWN DEPENDING ON SCORE
function mark_turn_score( player, turn_score )
{
	if (turn_score >= 20) 
	{
		if (turn_score >= 40) 
		{
			if (turn_score >= 60) 
			{
				if (turn_score >= 100) 
				{
					if (turn_score >= 140) 
					{
						if (turn_score == 180) 
						{
							player.leg_stats.one_eighties++;
						}
						else
						{
							player.leg_stats.one_forty_over++;
						}
					}
					else
					{
						player.leg_stats.hundred_over++;
					}
				}
				else
				{
					player.leg_stats.sixty_over++;
				}
			}
			else
			{
				player.leg_stats.under_sixty++;
			}
		}
		else
		{
			player.leg_stats.under_forty++;
		}
	}
	else
	{
		player.leg_stats.under_twenty++;
	}
}

/* --- BUST FUNCTION --- */
function bust( player, dartNum )
{
	player.leg_stats.num_darts++;
	player.leg_stats.times_bust++;
	if (player.leg_stats.target_left <= 40 && player.targetLeft % 2 == 0) 
	{
		player.leg_stats.darts_at_double++;
	}
	player.first_dart = 0;
	player.second_dart = 0;
	player.third_dart = 0;
	if (dartNum == 1) 
	{
		player.leg_stats.scores.pop();
		player.leg_stats.scores_text.pop();
		resetBustedScores( player );
	}
	else if (dartNum == 2) 
	{
		player.leg_stats.scores.splice(-2, 2);
		player.leg_stats.scores_text.splice(-2, 2);
		resetBustedScores( player );
	}
	else if (dartNum == 3)
	{
		player.leg_stats.scores.splice(-3, 3);
		player.leg_stats.scores_text.splice(-3, 3);
		resetBustedScores( player );
	}
	if (player.leg_stats.target_left >= player.leg_stats.target) 
	{
		player.leg_stats.target_left = player.leg_stats.target;
		player.leg_stats.total_scored = 0;
	}
	player.leg_stats.turn_score = 0;
	player.leg_stats.previous_turn = 0;
	player.firstSection.textContent = '';
	player.secondSection.textContent = '';
	player.thirdSection.textContent = '';
	player.totalSection.textContent = '';
	player.targetSection.textContent = player.leg_stats.target_left;
	player.leg_stats.times_bust++;
	dart = 0;
	changePlayer( player );
}

function resetBustedScores( player )
{
	player.leg_stats.total_scored = 0;
	for (var i = 0; i < player.leg_stats.scores.length; i++) 
	{
		player.leg_stats.total_scored += player.leg_stats.scores[i];
	}
	player.leg_stats.target_left = player.leg_stats.target - player.leg_stats.total_scored;
}

undo.on('click', function()
{
	var currentPlayer = players.players[players.current];
	// IF BOARD IS HIDDEN
	if ($('.board').is(':hidden')) 
	{
		$('.board').show();
		$('.game').show();
		// $('#checkoutArea').show();
		// $('#friendly').show();
		// $('.statsArea').remove();
		// $('.nextLegButton').remove();
		// $(completeGameButton).remove();
		if (players.players.length > 1) 
		{
			for (var i = 0; i < players.players.length; i++) 
			{
				players.players[i].leg_stats.leg_outcome = '';
				changeOrder(i);
			}
		}
		var player = players.players[players.current];
		player.leg_stats.leg_outcome = '';
		player.leg_stats.average = 0;
		player.leg_stats.checkout = 0;
		player.leg_stats.darts_at_double--;
		player.leg_stats.double_percent = 0;
		undo_score( player );
		player.thirdDart = 0;
		var lastThrow = player.leg_stats.scores_text[player.leg_stats.scores_text.length - 1];
		var secondLastThrow = player.leg_stats.scores_text[player.leg_stats.scores_text.length - 2];

		$(player.firstSection).text( secondLastThrow );
		$(player.secondSection).text( lastThrow );
		$(player.totalSection).text( player.leg_stats.total_scored );
		$(player.targetSection).text( player.leg_stats.target_left );
		// checkCheckout( 2, player );
		dart = 2;
		// $('.legWonBox')[$('.legWonBox').length - 1].remove();
	}
	else 
	{
		if (dart == 1) 
		{
			// if ( currentPlayer.legsWon == currentPlayer.legsToWin ) 
			// {
			// 	currentPlayer.legsWon--;
			// 	$(completeGameButton).remove();
			// }
			undo_score( currentPlayer );
			currentPlayer.leg_stats.first_dart = 0;
			currentPlayer.firstSection.textContent = '';
			currentPlayer.totalSection.textContent = '';
			currentPlayer.targetSection.textContent = currentPlayer.leg_stats.target_left;
			// checkCheckout(0, currentPlayer);
			dart = 3;
		}
		else if (dart == 2)
		{
			// if ( currentPlayer.legsWon == currentPlayer.legsToWin ) 
			// {
			// 	currentPlayer.legsWon--;
			// 	$(completeGameButton).remove();
			// }
			undo_score( currentPlayer );
			currentPlayer.leg_stats.second_dart = 0;
			currentPlayer.secondSection.textContent = '';
			currentPlayer.totalSection.textContent = currentPlayer.leg_stats.turn_score;
			currentPlayer.targetSection.textContent = currentPlayer.leg_stats.target_left;
			// checkCheckout(1, currentPlayer);
			dart = 1;
		}
		else
		{
			if (players.players[0].leg_stats.target_left == players.players[0].target && players.players[0].leg_stats.scores.length == 0) 
			{
				dart = 0;
				return;
			}
			// if ( currentPlayer.legsWon == currentPlayer.legsToWin ) 
			// {
			// 	currentPlayer.legsWon--;
			// 	$(completeGameButton).remove();
			// }
			dimPlayer( currentPlayer );
			playerGo();
			var prevPlayer = players.players[players.current];
			var last_throw = prevPlayer.leg_stats.scores[prevPlayer.leg_stats.scores.length - 1];
			var second_last = prevPlayer.leg_stats.scores[prevPlayer.leg_stats.scores.length - 2];
			var third_last = prevPlayer.leg_stats.scores[prevPlayer.leg_stats.scores.length - 3];
			var previous_turn = last_throw + second_last + third_last;
			prevPlayer.leg_stats.previous_turn = previous_turn;
			highlightPlayer( prevPlayer );
			undo_turn_score( prevPlayer, prevPlayer.leg_stats.previous_turn );
			undo_score( prevPlayer );
			prevPlayer.leg_stats.third_dart = 0;
			prevPlayer.thirdSection.textContent = '';
			prevPlayer.firstSection.textContent = prevPlayer.leg_stats.scores_text[prevPlayer.leg_stats.scores_text.length - 2];
			prevPlayer.secondSection.textContent = prevPlayer.leg_stats.scores_text[prevPlayer.leg_stats.scores_text.length - 1];
			prevPlayer.totalSection.textContent = prevPlayer.leg_stats.turn_score;
			prevPlayer.targetSection.textContent = prevPlayer.leg_stats.target_left;
			// checkCheckout(2, prevPlayer);
			dart = 2;
		}
	}
})

function undo_score( player )
{
	player.leg_stats.num_darts--;
	player.leg_stats.target_left = player.leg_stats.target_left + player.leg_stats.scores[player.leg_stats.scores.length - 1];
	player.leg_stats.turn_score = player.leg_stats.turn_score - player.leg_stats.scores[player.leg_stats.scores.length - 1];
	player.leg_stats.total_scored = player.leg_stats.total_scored - player.leg_stats.scores[player.leg_stats.scores.length - 1];
	player.leg_stats.scores.pop();
	player.leg_stats.scores_text.pop();
}

// NEEDS TURN SCORE AND THEN MARKS DOWN DEPENDING ON SCORE
function undo_turn_score( player, score )
{
	if (score >= 20) 
	{
		if (score >= 40) 
		{
			if (score >= 60) 
			{
				if (score >= 100) 
				{
					if (score >= 140) 
					{
						if (score == 180) 
						{
							player.leg_stats.one_eighties--;
						}
						else
						{
							player.leg_stats.one_forty_over--;
						}
					}
					else
					{
						player.leg_stats.hundred_over--;
					}
				}
				else
				{
					player.leg_stats.sixty_over--;
				}
			}
			else
			{
				player.leg_stats.under_sixty--;
			}
		}
		else
		{
			player.leg_stats.under_forty--;
		}
	}
	else
	{
		player.leg_stats.under_twenty--;
	}

	if ( player.leg_stats.previous_turn >= player.leg_stats.high_score ) 
	{
		player.leg_stats.high_score = 0;
	}
	player.leg_stats.turn_score = player.leg_stats.previous_turn;
	player.leg_stats.previous_turn = 0;
}

/* --- FUNCTION TO CHANGE PLAYER
- DIMS CURRENT PLAYER - PLAYER WHO JUST THREW
- USE PLAYERGO FUNCTION TO CHANGE PLAYER
- CHECK CHECKOUT & HIGHLIGHTS NEXT PLAYER
--- */
function changePlayer( currentPlayer )
{
	dimPlayer(currentPlayer);
	playerGo();
	var nextPlayer = players.players[players.current];
	// checkCheckout(0, nextPlayer);
	highlightPlayer(nextPlayer);
}

// dim out previous player - to clarify it is not their go
function dimPlayer( player )
{
	$(player.nameSection).css('opacity', '0.2');
	$(player.firstSection).css('opacity', '0.2');
	$(player.secondSection).css('opacity', '0.2');
	$(player.thirdSection).css('opacity', '0.2');
	$(player.totalSection).css('opacity', '0.2');
	$(player.targetSection).css('opacity', '0.2');
}

// makes scoreboard empty and highlights current player
function highlightPlayer( player )
{
	$(player.firstSection).text('');
	$(player.secondSection).text('');
	$(player.thirdSection).text('');
	$(player.totalSection).text('');
	$(player.nameSection).css('opacity', '1');
	$(player.firstSection).css('opacity', '1');
	$(player.secondSection).css('opacity', '1');
	$(player.thirdSection).css('opacity', '1');
	$(player.totalSection).css('opacity', '1');
	$(player.targetSection).css('opacity', '1');
}

// CHANGES THE INDEX OF PLAYERS ALLOWING THE ORDER OF THROW TO BE CHANGED
function changeOrder(index)
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
	$(players.players[0].nameSection).css('background-color', '#91c46b');
	highlightPlayer(players.players[0]);
	$(players.players[1].nameSection).css('background-color', '#ccc');
	dimPlayer(players.players[1]);
	players.current = 0;
	dart = 0;
}

// CHANGES THE PLAYERS GO
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
};

// RUNS WHEN LEG HAS BEEN WON
function leg_winner( player )
{
	alert( player.name + ' won the leg');
	player.leg_stats.leg_outcome = 'won';
	player.game_stats.legs_won++;
	player.leg_stats.checkout = player.leg_stats.turn_score;
	var finish_leg = document.createElement('button');
	$('.game').hide();
	$('.board').hide();
	// update_leg_stats
	update_leg_stats();
	// show_stats
	if ( player.game_stats.legs_won == player.game_stats.legs_needed ) 
	{
		// won the game
		// update_game_stats
		player.game_stats.game_outcome = 'won';
		finish_leg.textContent = 'finish game';
		$('.page').prepend( finish_leg );
		finish_leg.onclick = function()
		{
			update_game_db();
			location.replace('account.php');
		}
	}
	else
	{
		finish_leg.textContent = 'start next leg';
		$('.page').prepend( finish_leg );
		finish_leg.onclick = function()
		{
			reset_leg_stats();
			for (var i = 0; i < players.players.length; i++) 
			{
				changeOrder(i);
			}
			$('.game').show();
			$('.board').show();
			$(this).remove();
		}
	}
}

// UPDATES PLAYERS LEG STATS AFTER EVERY LEG
function update_leg_stats()
{
	for (var i = 0; i < players.players.length; i++) 
	{
		var player = players.players[i];
		if ( player.leg_stats.leg_outcome == '') 
		{
			player.leg_stats.leg_outcome = 'lost';
		}
		var avg = player.leg_stats.total_scored / player.leg_stats.num_darts;
		var average = avg * 3;
		player.leg_stats.average = Number(average.toFixed(2));
		player.game_stats.leg_scores.push( player.leg_stats.total_scored );
		player.game_stats.leg_darts.push ( player.leg_stats.num_darts );
		player.game_stats.leg_averages.push( player.leg_stats.average );
		// if ( player.leg_stats.scores.length > 8 ) 
		// {
		// 	var nine_total = 0;
		// 	for (var i = 0; i < player.leg_stats.scores.length; i++) 
		// 	{
		// 		nine_total += player.leg_stats.scores[i];
		// 		return nine_total;
		// 	}
		// 	var nine_avg = nine_total / 9;
		// 	var nine_average = nine_avg.toFixed(2);
		// 	player.leg_stats.nine_average = nine_average;
		// 	player.game_stats.leg_nine_avg.push( nine_average );
		// }
		player.game_stats.leg_checkouts.push( player.leg_stats.checkout );
		player.game_stats.leg_doubles.push( player.leg_stats.double_hit );
		if (player.leg_stats.darts_at_double < 1) 
		{
			player.leg_stats.darts_at_double = 0;
			player.leg_stats.double_percent = 0;
		}
		else
		{
			var double_perc = (1 / player.leg_stats.darts_at_double) * 100;
			player.leg_stats.double_percent = double_perc;
		}
		player.game_stats.double_percents.push( player.leg_stats.double_percent );
		player.game_stats.under_twenty += player.leg_stats.under_twenty;
		player.game_stats.under_forty += player.leg_stats.under_forty;
		player.game_stats.under_sixty += player.leg_stats.under_sixty;
		player.game_stats.sixty_over += player.leg_stats.sixty_over;
		player.game_stats.hundred_over += player.leg_stats.hundred_over;
		player.game_stats.one_forty_over += player.leg_stats.one_forty_over;
		player.game_stats.one_eighties += player.leg_stats.one_eighties;

		update_leg_db( player );
		update_game_stats( player );
	}
}

// UPDATES THE PLAYERS GAME STATS
function update_game_stats( player )
{
	player.game_stats.legs_played++;
	if ( player.leg_stats.high_score > player.game_stats.high_score ) 
	{
		player.game_stats.high_score = player.leg_stats.high_score;
	}

	var latest_checkout = player.game_stats.leg_checkouts[player.game_stats.leg_checkouts.length - 1];
	if ( latest_checkout > player.game_stats.biggest_checkout) 
	{
		player.game_stats.biggest_checkout = latest_checkout;
	}

	var d_percents = 0;
	for (var i = 0; i < player.game_stats.double_percents.length; i++) 
	{
		d_percents += player.game_stats.double_percents[i];
		var percent = d_percents / player.game_stats.legs_won;
		player.game_stats.double_percent = percent;
	}
	
	var g_average = 0;
	for (var i = 0; i < player.game_stats.leg_averages.length; i++) 
	{
		g_average += player.game_stats.leg_averages[i];
		var average = g_average / player.game_stats.legs_played;
		player.game_stats.game_average = average;
	}
	
	var g_darts = 0;
	for (var i = 0; i < player.game_stats.leg_darts.length; i++) 
	{
		g_darts += player.game_stats.leg_darts[i];
		player.game_stats.total_darts = g_darts;
	}
	
	var total = 0;
	for (var i = 0; i < player.game_stats.leg_scores.length; i++) 
	{
		total += player.game_stats.leg_scores[i];
		player.game_stats.total_scored = total;
	}
	
}

// UPDATES AND ADDS PLAYERS LEG STATS TO LEG DATABASE
function update_leg_db( player )
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

	if ( player.game_stats.game_outcome != 'won' ) 
	{
		player.game_stats.game_outcome = 'lost';
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
		'&type=leg'+
		'&opp='+opp+
		'&target='+player.target+
		'&u20='+player.leg_stats.under_twenty+
		'&u40='+player.leg_stats.under_forty+
		'&u60='+player.leg_stats.under_sixty+
		'&o60='+player.leg_stats.sixty_over+
		'&0100='+player.leg_stats.hundred_over+
		'&o140='+player.leg_stats.one_forty_over+
		'&max='+player.leg_stats.one_eighties+
		'&highest='+player.leg_stats.high_score+
		'&total='+player.leg_stats.total_scored+
		'&darts='+player.leg_stats.num_darts+
		'&average='+player.leg_stats.average+
		'&checkout='+player.leg_stats.checkout+
		'&double='+player.leg_stats.double_hit+
		'&percent='+player.leg_stats.double_percent+
		'&outcome='+player.leg_stats.leg_outcome, true);
	xmlhttp.send();
}

// UPDATES AND ADDS PLAYERS GAME STATS TO GAME DATABASE
function update_game_db()
{
	for (var i = 0; i < players.players.length; i++) 
	{
		var player = players.players[i];
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
			'&target='+player.target+
			'&legs_needed='+player.game_stats.legs_needed+
			'&legs_won='+player.game_stats.legs_won+
			'&outcome='+player.game_stats.game_outcome+
			'&u20='+player.game_stats.under_twenty+
			'&u40='+player.game_stats.under_forty+
			'&u60='+player.game_stats.under_sixty+
			'&o60='+player.game_stats.sixty_over+
			'&0100='+player.game_stats.hundred_over+
			'&o140='+player.game_stats.one_forty_over+
			'&max='+player.game_stats.one_eighties+
			'&highest='+player.game_stats.high_score+
			'&total='+player.game_stats.total_scored+
			'&darts='+player.game_stats.total_darts+
			'&average='+player.game_stats.game_average+
			'&percent='+player.game_stats.double_percent+
			'&checkout='+player.game_stats.biggest_checkout, true);
		xmlhttp.send();
	}
}

// RESETS THE PLAYERS LEG STATS & SECTIONS TEXT
function reset_leg_stats()
{
	for (var i = 0; i < players.players.length; i++) 
	{
		var player = players.players[i];
		player.leg_stats.first_dart = 0;
		player.leg_stats.second_dart = 0;
		player.leg_stats.third_dart = 0;
		player.leg_stats.scores = [];
		player.leg_stats.scores_text = [];
		player.leg_stats.turn_score = 0;
		player.leg_stats.under_twenty = 0;
		player.leg_stats.under_forty = 0;
		player.leg_stats.under_sixty = 0;
		player.leg_stats.sixty_over = 0;
		player.leg_stats.hundred_over = 0;
		player.leg_stats.one_forty_over = 0;
		player.leg_stats.one_eighties = 0;
		player.leg_stats.high_score = 0;
		player.leg_stats.previous_turn = 0;
		player.leg_stats.target_left = player.target;
		player.leg_stats.total_scored = 0;
		player.leg_stats.checkout = 0;
		player.leg_stats.num_darts = 0;
		player.leg_stats.darts_missed = 0;
		player.leg_stats.times_bust = 0;
		player.leg_stats.average = 0;
		player.leg_stats.nine_average = 0;
		player.leg_stats.double_hit = 0;
		player.leg_stats.darts_at_double = 0;
		player.leg_stats.double_percent = 0;

		player.firstSection.textContent = '';
		player.secondSection.textContent = '';
		player.thirdSection.textContent = '';
		player.totalSection.textContent = '';
		player.targetSection.textContent = player.target;
	}
}




