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

// DISPLAY PLAYER NAMES AND MARKERS
var first_player = players.players[0];
var second_player = players.players[1];

$('#first_player_name').text(first_player.name + ' - ' + first_player.marker);
$('#second_player_name').text(second_player.name + ' - ' + second_player.marker);

var first_score_area = $('#first_player_score');
var second_score_area = $('#second_player_score');

var board_targets = [];

var board_sections = $('.inner_target');
$(board_sections).css('color', '#f7f5fa');

var top_row = $('.row_one');
var middle_row = $('.row_two');
var bottom_row = $('.row_three');
var left_col = $('.col_one');
var middle_col = $('.col_two');
var right_col = $('.col_three');
var diag_one = $('.diag_one');
var diag_two = $('.diag_two');

// dim out previous player - to clarify it is not their go
function dimPlayer( player )
{
	$(player.nameSection).css('opacity', '0.2');
	$(player.firstSection).css('opacity', '0.2');
	$(player.secondSection).css('opacity', '0.2');
	$(player.thirdSection).css('opacity', '0.2');
}

// makes scoreboard empty and highlights current player
function highlightPlayer( player )
{
	$(player.firstSection).text('');
	$(player.secondSection).text('');
	$(player.thirdSection).text('');
	$(player.nameSection).css('opacity', '1');
	$(player.firstSection).css('opacity', '1');
	$(player.secondSection).css('opacity', '1');
	$(player.thirdSection).css('opacity', '1');
}

function new_board()
{
	board_targets = [];
	for (var i = 0; i < board_sections.length; i++) 
	{
		$(board_sections[i]).css(
		{
			'color': '#f7f5fa',
			'font-size': '40px'
		});
		var random_target = possible_targets[Math.floor(Math.random() * possible_targets.length)].target;
		// CHECK IF RANDOM_TARGET IS ALREADY IN THE BOARD_TARGETS ARRAY - ONLY WANT ONE OF EACH TARGET IN BOARD_TARGETS
		if ($.inArray(random_target, board_targets) > 1) 
		{
			// GET NEW RANDOM NUMBER
			var new_random_target = possible_targets[Math.floor(Math.random() * possible_targets.length)].target;
			board_targets.push(new_random_target);
			$(board_sections[i]).text(new_random_target);
		}
		else
		{
			board_targets.push(random_target);
			$(board_sections[i]).text(random_target);
		}
	}

	for (var i = 0; i < players.players.length; i++) 
	{
		reset_board_stats( players.players[i] );
	}
	dart = 0;
}

new_board();

// CREATE SCOREBOARD FOR EACH PLAYER
function create_scoreboard( player )
{
	var section = document.createElement('div');
	var name_section = document.createElement('div');
	var first_section = document.createElement('div');
	var second_section = document.createElement('div');
	var third_section = document.createElement('div');

	$(section).addClass('scoreboard');
	$(name_section).addClass('inner_scoreboard');
	$(first_section).addClass('inner_scoreboard');
	$(second_section).addClass('inner_scoreboard');
	$(third_section).addClass('inner_scoreboard');

	name_section.textContent = player.name;
	first_section.textContent = '';
	second_section.textContent = '';
	third_section.textContent = '';

	player.section = section;
	player.nameSection = name_section;
	player.firstSection = first_section;
	player.secondSection = second_section;
	player.thirdSection = third_section;

	$(section).append(name_section);
	$(section).append(first_section);
	$(section).append(second_section);
	$(section).append(third_section);

	$('.game').append(section);
	highlightPlayer(players.players[0]);
	dimPlayer(players.players[1]);
	
}

for (var i = 0; i < players.players.length; i++) 
{
	create_scoreboard( players.players[i] );
}

$('#new_board').on('click', function()
{
	new_board();
})

var single = $('.single');
var double = $('.double');
var treble = $('.treble');
var dart = 0;

single.on('click', function(e)
{
	var current_player = players.players[players.current];
	e.stopPropagation();
	var hit = 's' + $(this).attr('data-value');
	score_dart( current_player, board_targets, hit );
})

function score_dart( player, targets, target_hit )
{
	if (target_hit == 's25')
	{
		target_hit = 'outerbull';
	}
	else if (target_hit == 'd25')
	{
		target_hit = 'bullseye';
	}
	// IF TARGET_HIT IS SHOWN ON THE TARGETS BOARD (IN BOARD_TARGETS ARRAY)
	if ($.inArray(target_hit, targets) > -1) 
	{
		// IF TARGET HAS ALREADY BEEN HIT (IN PLAYER.TARGETS_HIT ARRAY)
		if ($.inArray(target_hit, player.board_game.targets_hit) > -1) 
		{
			target_hit = 'miss';
			player.board_game.missed_darts++;
		}
		else
		{
			player.board_game.targets_hit.push(target_hit);
			player.board_game.num_targets++;
		}
	}
	else 
	{
		target_hit = 'miss';
		player.board_game.missed_darts++;
	}

	check_dart( player, target_hit );
}

// FUNCTION TO CHECK THE DART & ADD TARGET_HIT TEXT TO RELEVANT SECTION OF SCOREBOARD
function check_dart( player, target_hit )
{
	player.board_game.scores.push(target_hit);
	player.board_game.darts_used++;
	dart++;
	if (dart <= 3) 
	{
		if (dart == 1) 
		{
			$(player.firstSection).text(target_hit);
		}
		else if (dart == 2)
		{
			$(player.secondSection).text(target_hit);
		}
		else
		{
			$(player.thirdSection).text(target_hit);
			dart = 0;
			change_player( player );
		}
		change_text( player, target_hit );
	}
}

// IF A TARGET HAS BEEN HIT - CHANGE THE TEXT IN THAT SECTION TO THE PLAYERS MARKER
function change_text( player, target_hit )
{
	for (var i = 0; i < board_sections.length; i++) 
	{
		var section_text = $(board_sections[i]).text();
		if (target_hit == section_text) 
		{
			if (player.marker == 'X') 
			{
				$(board_sections[i]).css('color', '#91c46b');
				$(board_sections[i]).text('X');

			}
			else if (player.marker == 'O')
			{
				$(board_sections[i]).css('color', '#d9534f');
				$(board_sections[i]).text('O');
			}
		}
	}
	check_game( player );
}

function check_game(player)
{
	check_board(top_row, player);
	check_board(middle_row, player);
	check_board(bottom_row, player);
	check_board(left_col, player);
	check_board(middle_col, player);
	check_board(right_col, player);
	check_board(diag_one, player);
	check_board(diag_two, player);
}


// CHECKS THE BOARD TO SEE IF THERE ARE 3 OF THE SAME MARKER
function check_board(area, player)
{
	var first = $(area[0]).text();
	var second = $(area[1]).text();
	var third = $(area[2]).text();

	if (first == second || first == third || second == third) 
	{
		if (second == third && third == first) 
		{
			players.players[0].overall_game.boards_played++;
			players.players[1].overall_game.boards_played++;
			player.overall_game.boards_won++;

			alert(player.name + ' has three in a row');

			var complete_board = document.createElement('button');
			$(complete_board).text('complete board');
			$(complete_board).addClass('button green_button complete_board');

			$('.board').hide();
			$('.page').append(complete_board);

			$(complete_board).on('click', function()
			{
				update_overall_stats(players.players[0]);
				update_overall_stats(players.players[1]);

				update_board_db(players.players[0]);
				update_board_db(players.players[1]);

				$('#first_player_score').text(players.players[0].overall_game.boards_won);
				$('#second_player_score').text(players.players[1].overall_game.boards_won);

				if (player.overall_game.boards_won == player.boards_needed) 
				{
					console.log('end_game(');
				}
				else
				{
					new_game();
				}
			})
		}
	}
}

function update_overall_stats( player )
{
	player.overall_game.darts_used = player.overall_game.darts_used + player.board_game.darts_used;
	player.overall_game.missed_darts = player.overall_game.missed_darts + player.board_game.missed_darts;
	player.overall_game.num_targets = player.overall_game.num_targets + player.board_game.num_targets;

	for (var i = 0; i < player.board_game.targets_hit.length; i++) 
	{
		player.overall_game.targets_hit.push(player.board_game.targets_hit[i]);
	}
	
}

function update_board_db( player )
{
	var targets = player.board_game.targets_hit;
	var tone = targets[0];
	var ttwo = targets[1];
	var tthree = targets[2];
	var tfour = targets[3];
	var tfive = targets[4];
	var tsix = targets[5];

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
		'&type=board'+
		'&opp='+player.opponent+
		'&marker='+player.marker+
		'&darts='+player.board_game.darts_used+
		'&hit='+player.board_game.num_targets+
		'&one='+tone+
		'&two='+ttwo+
		'&three='+tthree+
		'&four='+tfour+
		'&five='+tfive+
		'&six='+tsix+
		'&missed='+player.board_game.missed_darts, true);
	xmlhttp.send();
}

function new_game()
{
	if (players.players[0].overall_game.boards_played > 0) 
	{
		change_order();
	}

	new_board();
	highlightPlayer(players.players[0]);
	dimPlayer(players.players[1]);

	$('.complete_board').remove();
	$('.board').show();
}

/* USED IN CHANGE_ORDER TO MOVE ITEMS IN AN ARRAY */
function arraymove(arr, fromIndex, toIndex) 
{
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function change_order()
{
	for (var i = 0 ; i < players.players.length; i++) 
	{
		reset_board_stats(players.players[i]);
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
}

function reset_board_stats( player )
{
	player.board_game.darts_used = 0;
	player.board_game.scores = [];
	player.board_game.targets_hit = [];
	player.board_game.num_targets = 0;
	player.board_game.missed_darts = 0;

	$(player.firstSection).text('');
	$(player.secondSection).text('');
	$(player.thirdSection).text('');
}


/* --- FUNCTION TO CHANGE PLAYER
- DIMS CURRENT PLAYER - PLAYER WHO JUST THREW
- USE PLAYERGO FUNCTION TO CHANGE PLAYER
--- */

function change_player( current_player )
{
	dimPlayer(current_player);
	playerGo();
	var next_player = players.players[players.current];
	highlightPlayer(next_player);
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




