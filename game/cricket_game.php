<?php

session_start();
$user_username = $_SESSION['username'];
$game = $_SESSION['game'];

// GET THE OPPONENT NAME FROM SESSION
if (isset($_SESSION['opponent_user'])) 
{
	$opponent = $_SESSION['opponent_user'];
}
else if (isset($_SESSION['opponent_guest']))
{
	$opponent = $_SESSION['opponent_guest'];
}

?>

<link rel="stylesheet" type="text/css" href="css/general.css">
<style type="text/css">
	.account_buttons
	{
		display: none;
	}

	.quit_game, .game_buttons
	{
		margin-right: 20px;
	}

	.quit_game
	{
		font-size: 30px;
	}

	.quit_game:hover
	{
		cursor: pointer;
	}

	.player_order
	{
		width: 400px;
		height: 400px;
		margin: 0 auto;
		text-align: center;
	}

	.players_to_order li
	{
		width: 100%;
		height: 90px;
		line-height: 90px;
		font-size: 30px;
		list-style-type: none;
		background-color: #fff;
		margin-top: 10px;
		text-align: left;
		padding-left: 10px;
	}

	.players_to_order button
	{
		height: 90px;
		width: 90px;
	}

	.game
	{
		width: 35%;
		height: 100%;
		float: left;
	}

	.board
	{
		width: 50%;
		float: right;
	}

	.scoreboard
	{
		width: 100%;
		height: 150px;
	}

	.inner_scoreboard
	{
		width: 20%;
		height: 100px;
		float: left;
		background-color: #333;
		border: 2px solid #f7f5fa;
		color: #eee;
		line-height: 100px;
		font-size: 30px;
		text-align: center;
	}

	.inner_scoreboard:nth-of-type(1)
	{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #ccc;
		text-align: left;
		padding-left: 10px;
	}

	.half_scoreboard
	{
		width: 50%;
		float: left;
	}
</style>

<!-- HTML - INSIDE DIV WITH CLASS PAGE -->
<h1>CRICKET GAME</h1>
<span class="quit_game right">X</span>

<div class="player_order">
	<div class="players_to_order"></div><!-- CLOSE DIV WITH CLASS PLAYERS_TO_ORDER -->
</div><!-- CLOSE DIV WITH CLASS PLAYER_ORDER -->

<div class="game">
	<div class="game_scoreboard">
		<h3 class="inner_game_scoreboard" id="gameInnings">First Innings</p>
		<h3 class="inner_game_scoreboard half_inner">Total <p class="enter_score" id="game_score">0</p></h3>
		<h3 class="inner_game_scoreboard half_inner">Wickets <p class="enter_score" id="gameWickets">0</p></h3>
		<h3 class="inner_game_scoreboard clear">First Innings <p class="enter_score" id="firstInningsScore">0</p></h3>
		<h3 class="inner_game_scoreboard clear">Opponent Score <p class="enter_score" id="oppScore">0</p></h3>
	</div>
	<div class="half_scoreboard bowlerArea">
		<div class="inner_half"><p class="bowler_score" id="bowlerOne">1</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerTwo">2</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerThree">3</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerFour">4</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerFive">5</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerSix">6</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerSeven">7</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerEight">8</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerNine">9</div>
		<div class="inner_half"><p class="bowler_score" id="bowlerTen">10</div>
	</div>
	<div class="half_scoreboard batterArea">
		<div class="inner_half"><p class="batter_score" id="1"></p></div>
		<div class="inner_half"><p class="batter_score" id="2"></p></div>
		<div class="inner_half"><p class="batter_score" id="3"></p></div>
		<div class="inner_half"><p class="batter_score" id="4"></p></div>
		<div class="inner_half"><p class="batter_score" id="5"></p></div>
		<div class="inner_half"><p class="batter_score" id="6"></p></div>
		<div class="inner_half"><p class="batter_score" id="7"></p></div>
		<div class="inner_half"><p class="batter_score" id="8"></p></div>
		<div class="inner_half"><p class="batter_score" id="9"></p></div>
		<div class="inner_half"><p class="batter_score" id="10"></p></div>
	</div>
	<div class="scoreboard" id="cricketScoreboard">
		<div class="inner_scoreboard"><p id="nameSection"></p></div>
		<div class="inner_scoreboard"><p id="playerTypeSection" style="color:#fff;"></p></div>
		<div class="inner_scoreboard"><p id="firstSection" style="color:#fff;"></p></div>
		<div class="inner_scoreboard"><p id="secondSection" style="color:#fff;"></p></div>
		<div class="inner_scoreboard"><p id="thirdSection" style="color:#fff;"></p></div>
		<div class="inner_scoreboard"><p id="totalSection" style="color:#fff;"></p></div>
	</div>
</div><!-- CLOSE DIV WITH CLASS GAME -->

<div class="board" id="board">
	<svg height="100%" version="1.1" viewBox="-225 -225 450 450" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

	  <defs>
	    <line id="refwire" stroke="Silver" stroke-width="1" x1="2.566" x2="26.52" y1="16.20" y2="167.4"/>
	    <path d="M 0 0 L 15.64 98.77 A 100 100 0 0 1 -15.64 98.77 Z" id="SLICE" stroke-width="0"/>
	    <use id="double" transform="scale(1.695)" xlink:href="#SLICE"/>
	    <use id="outer" transform="scale(1.605)" xlink:href="#SLICE"/>
	    <use id="triple" transform="scale(1.065)" xlink:href="#SLICE"/>
	    <use id="inner" transform="scale(0.975)" xlink:href="#SLICE"/>
	  </defs>

	  <g transform="scale(1,-1)">
	    <circle class="black" r="226"/>
	    <g id="dartboard">
	      <g>
	        <use class="red double scalable" data-value="20" xlink:href="#double" id="d20"/>
	        <use class="black single" data-value="20" xlink:href="#outer" id="s20"/>
	        <use class="red treble scalable" data-value="20" xlink:href="#triple" id="t20"/>
	        <use class="black single" data-value="20" xlink:href="#inner" id="s20"/>
	      </g><!-- 20 AREA -->
	      <g transform="rotate(18)">
	        <use class="green double scalable" data-value="5" xlink:href="#double" id="d5"/>
	        <use class="white single" data-value="5" xlink:href="#outer" id="s5"/>
	        <use class="green treble scalable" data-value="5" xlink:href="#triple" id="t5"/>
	        <use class="white single" data-value="5" xlink:href="#inner"/>
	      </g><!-- 5 AREA -->
	      <g transform="rotate(36)">
	        <use class="red double scalable" data-value="12" xlink:href="#double" id="d12"/>
	        <use class="black single" data-value="12" xlink:href="#outer" id="s12"/>
	        <use class="red treble scalable" data-value="12" xlink:href="#triple" id="t12"/>
	        <use class="black single" data-value="12" xlink:href="#inner"/>
	      </g><!-- 12 AREA -->
	      <g transform="rotate(54)">
	        <use class="green double scalable" data-value="9" xlink:href="#double" id="d9"/>
	        <use class="white single" data-value="9" xlink:href="#outer" id="s9"/>
	        <use class="green treble scalable" data-value="9" xlink:href="#triple" id="t9"/>
	        <use class="white single" data-value="9" xlink:href="#inner"/>
	      </g><!-- 9 AREA -->
	      <g transform="rotate(72)">
	        <use class="red double scalable" data-value="14" xlink:href="#double" id="d14"/>
	        <use class="black single" data-value="14" xlink:href="#outer" id="s14"/>
	        <use class="red treble scalable" data-value="14" xlink:href="#triple" id="t14"/>
	        <use class="black single" data-value="14" xlink:href="#inner"/>
	      </g><!-- 14 AREA -->
	      <g transform="rotate(90)">
	        <use class="green double scalable" data-value="11" xlink:href="#double" id="d11"/>
	        <use class="white single" data-value="11" xlink:href="#outer" id="s11"/>
	        <use class="green treble scalable" data-value="11" xlink:href="#triple" id="t11"/>
	        <use class="white single" data-value="11" xlink:href="#inner"/>
	      </g><!-- 11 AREA -->
	      <g transform="rotate(108)">
	        <use class="red double scalable" data-value="8" xlink:href="#double" id="d8"/>
	        <use class="black single" data-value="8" xlink:href="#outer" id="s8"/>
	        <use class="red treble scalable" data-value="8" xlink:href="#triple" id="t8"/>
	        <use class="black single" data-value="8" xlink:href="#inner"/>
	      </g><!-- 8 AREA -->
	      <g transform="rotate(126)">
	        <use class="green double scalable" data-value="16" xlink:href="#double" id="d16"/>
	        <use class="white single" data-value="16" xlink:href="#outer" id="s16"/>
	        <use class="green treble scalable" data-value="16" xlink:href="#triple" id="t16"/>
	        <use class="white single" data-value="16" xlink:href="#inner"/>
	      </g><!-- 16 AREA -->
	      <g transform="rotate(144)">
	        <use class="red double scalable" data-value="7" xlink:href="#double" id="d7"/>
	        <use class="black single" data-value="7" xlink:href="#outer" id="s7"/>
	        <use class="red treble scalable" data-value="7" xlink:href="#triple" id="t7"/>
	        <use class="black single" data-value="7" xlink:href="#inner"/>
	      </g><!-- 7 AREA -->
	      <g transform="rotate(162)">
	        <use class="green double scalable" data-value="19" xlink:href="#double" id="d19"/>
	        <use class="white single" data-value="19" xlink:href="#outer" id="s19"/>
	        <use class="green treble scalable" data-value="19" xlink:href="#triple" id="t19"/>
	        <use class="white single" data-value="19" xlink:href="#inner"/>
	      </g><!-- 19 AREA -->
	      <g transform="rotate(180)">
	        <use class="red double scalable" data-value="3" xlink:href="#double" id="d3"/>
	        <use class="black single" data-value="3" xlink:href="#outer" id="s3"/>
	        <use class="red treble scalable" data-value="3" xlink:href="#triple" id="t3"/>
	        <use class="black single" data-value="3" xlink:href="#inner"/>
	      </g><!-- 3 AREA -->
	      <g transform="rotate(198)">
	        <use class="green double scalable" data-value="17" xlink:href="#double" id="d17"/>
	        <use class="white single" data-value="17" xlink:href="#outer" id="s17"/>
	        <use class="green treble scalable" data-value="17" xlink:href="#triple" id="t17"/>
	        <use class="white single" data-value="17" xlink:href="#inner"/>
	      </g><!-- 17 AREA -->
	      <g transform="rotate(216)">
	        <use class="red double scalable" data-value="2" xlink:href="#double" id="d2"/>
	        <use class="black single" data-value="2" xlink:href="#outer" id="s2"/>
	        <use class="red treble scalable" data-value="2" xlink:href="#triple" id="t2"/>
	        <use class="black single" data-value="2" xlink:href="#inner"/>
	      </g><!-- 2 AREA -->
	      <g transform="rotate(234)">
	        <use class="green double scalable" data-value="15" xlink:href="#double" id="d15"/>
	        <use class="white single" data-value="15" xlink:href="#outer" id="s15"/>
	        <use class="green treble scalable" data-value="15" xlink:href="#triple" id="t15"/>
	        <use class="white single" data-value="15" xlink:href="#inner"/>
	      </g><!-- 15 AREA -->
	      <g transform="rotate(252)">
	        <use class="red double scalable" data-value="10" xlink:href="#double" id="d10"/>
	        <use class="black single" data-value="10" xlink:href="#outer" id="s10"/>
	        <use class="red treble scalable" data-value="10" xlink:href="#triple" id="t10"/>
	        <use class="black single" data-value="10" xlink:href="#inner"/>
	      </g><!-- 10 AREA -->
	      <g transform="rotate(270)">
	        <use class="green double scalable" data-value="6" xlink:href="#double" id="d6"/>
	        <use class="white single" data-value="6" xlink:href="#outer" id="s6"/>
	        <use class="green treble scalable" data-value="6" xlink:href="#triple" id="t6"/>
	        <use class="white single" data-value="6" xlink:href="#inner"/>
	      </g><!-- 6 AREA -->
	      <g transform="rotate(288)">
	        <use class="red double scalable" data-value="13" xlink:href="#double" id="d13"/>
	        <use class="black single" data-value="13" xlink:href="#outer" id="s13"/>
	        <use class="red treble scalable" data-value="13" xlink:href="#triple" id="t13"/>
	        <use class="black single" data-value="13" xlink:href="#inner"/>
	      </g><!-- 13 AREA -->
	      <g transform="rotate(306)">
	        <use class="green double scalable" data-value="4" xlink:href="#double" id="d4"/>
	        <use class="white single" data-value="4" xlink:href="#outer" id="s4"/>
	        <use class="green treble scalable" data-value="4" xlink:href="#triple" id="t4"/>
	        <use class="white single" data-value="4" xlink:href="#inner"/>
	      </g><!-- 4 AREA -->
	      <g transform="rotate(324)">
	        <use class="red double scalable" data-value="18" xlink:href="#double" id="d18"/>
	        <use class="black single" data-value="18" xlink:href="#outer" id="s18"/>
	        <use class="red treble scalable" data-value="18" xlink:href="#triple" id="t18"/>
	        <use class="black single" data-value="18" xlink:href="#inner"/>
	      </g><!-- 18 AREA -->
	      <g transform="rotate(342)">
	        <use class="green double scalable" data-value="1" xlink:href="#double" id="d1"/>
	        <use class="white single" data-value="1" xlink:href="#outer" id="s1"/>
	        <use class="green treble scalable" data-value="1" xlink:href="#triple" id="t1"/>
	        <use class="white single" data-value="1" xlink:href="#inner"/>
	      </g><!-- 1 AREA -->
	      <g class="scalable">
		      <circle class="green single scaleTwo" data-value="25" r="16.4" stroke-width="0" id="s25"/>
		      <circle class="red double scaleTwo" data-value="25" r="6.85" stroke-width="0" id="bullseye"/>
		  </g><!-- BULLSEYE AREA -->
	      <g class="scalable" id="grid">
	        <use xlink:href="#refwire"/>
	        <use transform="rotate(18)" xlink:href="#refwire"/>
	        <use transform="rotate(36)" xlink:href="#refwire"/>
	        <use transform="rotate(54)" xlink:href="#refwire"/>
	        <use transform="rotate(72)" xlink:href="#refwire"/>
	        <use transform="rotate(90)" xlink:href="#refwire"/>
	        <use transform="rotate(108)" xlink:href="#refwire"/>
	        <use transform="rotate(126)" xlink:href="#refwire"/>
	        <use transform="rotate(144)" xlink:href="#refwire"/>
	        <use transform="rotate(162)" xlink:href="#refwire"/>
	        <use transform="rotate(180)" xlink:href="#refwire"/>
	        <use transform="rotate(198)" xlink:href="#refwire"/>
	        <use transform="rotate(216)" xlink:href="#refwire"/>
	        <use transform="rotate(234)" xlink:href="#refwire"/>
	        <use transform="rotate(252)" xlink:href="#refwire"/>
	        <use transform="rotate(270)" xlink:href="#refwire"/>
	        <use transform="rotate(288)" xlink:href="#refwire"/>
	        <use transform="rotate(306)" xlink:href="#refwire"/>
	        <use transform="rotate(324)" xlink:href="#refwire"/>
	        <use transform="rotate(342)" xlink:href="#refwire"/>
	        <!-- from here down some bytes could be saved with CSS -->
	        <circle fill="none" r="169.5" stroke="Silver" stroke-width="1"/>
	        <circle class="dontScale" fill="none" r="160.5" stroke="Silver" stroke-width="1"/>
	        <circle fill="none" r="106.5" stroke="Silver" stroke-width="1"/>
	        <circle class="dontScale" fill="none" r="97.5" stroke="Silver" stroke-width="1"/>
	        <circle class="scaleTwo" fill="none" r="16.4" stroke="Silver" stroke-width="1"/>
	        <circle class="scaleTwo" fill="none" r="6.85" stroke="Silver" stroke-width="1"/>
	      </g><!-- WIRES/ OUTER RINGS -->
	    </g><!-- CLOSE G WITH ID DARTBOARD -->
	  </g><!-- CLOSE G WITH TRANSFORM SCALE -->

	  <g id="numbers">
	    <!-- alignment-baseline:middle; doesn't do what i expected it too, therefore i've changed y="200" to y="220" as a ugly hack -->
	    <!-- the characters should be about the same thickness as the wiring, cause in reality they're made from wiring -->
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-270)" y="-204">6</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-288)" y="-204">13</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-306)" y="-204">4</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-324)" y="-204">18</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-342)" y="-204">1</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" y="-204">20</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-18)" y="-204">5</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-36)" y="-204">12</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-54)" y="-204">9</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-72)" y="-204">14</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-90)" y="-204">11</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(72)" y="208">8</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(54)" y="208">16</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(36)" y="208">7</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(18)" y="208">19</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" y="208">3</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-18)" y="208">17</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-36)" y="208">2</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-54)" y="208">15</text>
	    <text fill="Silver" font-size="30" style="text-anchor:middle;font-weight:200;alignment-baseline:middle;" transform="rotate(-72)" y="208">10</text>
	  </g><!-- CLOSE G WITH ID NUMBERS -->
	</svg><!-- CLOSE SVG/ DARTBOARD -->
</div><!-- CLOSE DIV WITH CLASS BOARD -->
	<div class="game_buttons right">
		<button class="button red_button" id="undo_score">undo</button>
		<button class="button green_button" id="friendly">friendly</button>
	</div><!-- CLOSE DIV WITH CLASS GAME BUTTONS -->

	<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript">

	// SET LOCAL STORAGE OPPONENT & USER - THEN ABLE TO USE IT IN JQUERY
	localStorage['opp_name'] = '<?=$opponent;?>';
	localStorage['user'] = '<?=$user_username;?>';

	// GOES BACK TO ACCOUNT OF USER IF YOU QUIT THE GAME
	$('.quit_game').on('click', function()
	{
		var quit = confirm('are you sure you want to quit? game data will be lost');
		if (quit) 
		{
			location.replace('account.php');
		}
	})

	// LOCAL STORAGE VARIABLES
	var user_name = localStorage['user'];

	// NOT GETTING INNINGS - NaN
	var innings = Number(localStorage['innings']);

	// PLAYERS ARRAY
	var players = 
	{
		current: 0,
		players: []
	}

	// FUNCTION TO CREATE PLAYERS
	function createPlayer( name, opponent, innings )
	{
		var player = 
		{
			name: name,
			opponent: opponent,
			innings: innings,
			player_type: '',
			bowler_innings:
			{
				wickets_left: 10,
				wickets_taken: 0,
				wickets: 
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
				],
				first_dart: 0,
				second_dart: 0,
				third_dart: 0,
				scores: [],
				scores_text: [],
				turn_score: 0,
				turn_scores: [],
				outer_bulls: 0,
				bullseyes: 0,
				wides: 0,
				runs_given: [],
				darts_missed: 0,
				num_darts: 0,
				runs_conceded: 0
			},
			batsman_innings:
			{
				wickets_left: 10,
				wickets_fallen: 0,
				wickets:
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
				],				
				first_dart: 0,
				second_dart: 0,
				third_dart: 0,
				dart_runs: 0,
				scores: [],
				scores_text: [],
				turn_score: 0,
				turn_scores: [],
				runs_scored: 0,
				turn_runs: [],
				over_forty_one: 0,
				under_forty_one: 0,
				run_outs: 0,
				darts_missed: 0,
				num_darts: 0,
				total_scored: 0,
			},
			game_stats: 
			{
				bowled: 0,
				bowled_darts: 0,
				batted: 0,
				batted_darts: 0,
				innings_selected: innings,
				innings_played: 0,
				innings_won: 0,
				first_innings:
				{
					score: 0,
					conceded: 0,
					run_difference: 0,
					wickets_taken: 0,
					wickets_fallen: 0,
					wicket_difference: 0,
					outcome: '',
					outcome_method: ''
				},
				second_innings:
				{
					score: 0,
					conceded: 0,
					run_difference: 0,
					wickets_taken: 0,
					wickets_fallen: 0,
					wicket_difference: 0,
					outcome: '',
					outcome_method: ''
				},
				total_runs: 0,
				total_runs_conceded: 0,
				total_run_difference: 0,
				total_wickets_taken: 0,
				total_wickets_left: 0,
				total_wicket_difference: 0,
				total_outer_bulls: 0,
				total_bullseyes: 0,
				total_wides: 0,
				total_over: 0,
				total_under: 0,
				total_run_outs: 0,
				game_outcome: '',
				outcome_method: '',
				total_darts: 0
			}
		}
		players.players.push(player);
		localStorage['players'] = JSON.stringify(players.players);
	}

	var playerOrder = $('.player_order');
	var playersToOrder = $('.players_to_order');
	var submitOrder = document.createElement('button');
	$(submitOrder).addClass('button green_button');

	// FUNCTION TO MOVE AN ITEM IN THE ARRAY TO ANOTHER INDEX
	function arraymove(arr, fromIndex, toIndex) 
	{
	    var element = arr[fromIndex];
	    arr.splice(fromIndex, 1);
	    arr.splice(toIndex, 0, element);
	}

	// FUNCTION TO LIST PLAYERS WITH OWN SECTION AND BUTTONS TO CHANGE ORDER OF THROW
	function create_order( player, index )
	{
		var section = document.createElement('li');
		var moveUp = document.createElement('button');
		var moveDown = document.createElement('button');
		var buttons = document.createElement('div');
		$(moveUp).addClass('button green_button fa fa-angle-up');
		$(moveDown).addClass('button red_button fa fa-angle-down');
		$(buttons).addClass('right');
		section.textContent = player.name;
		$(section).css('text-transform', 'uppercase');
		if (index == 0) 
		{
			$(buttons).append(moveDown);
		}
		else
		{
			$(buttons).append(moveUp)
		}
		section.append(buttons);

		playersToOrder.append(section);

		moveUp.onclick = function()
		{
			var current = $(this).closest('li');
			var previous = current.prev('li');
			if (index > 0) 
			{
				newIndex = index - 1;
			} 
			else 
			{
				newIndex = 0;
			}
			arraymove(players.players, index, newIndex );
			// var index = $(this).index();
			if (previous.length !== 0) 
			{
				current.insertBefore(previous);
				$(current).children().empty();
				$(current).children().append(moveDown);
				$(previous).children().empty();
				$(previous).children().append(moveUp);
			}
			localStorage.players = JSON.stringify(players.players);
			return false;
		}

		moveDown.onclick = function()
		{
			var current = $(this).closest('li');
			var next = current.next('li');
			if (index < players.players.length) 
			{
				newIndex = index + 1;
			} 
			else 
			{
				newIndex = players.players.length - 1;
			}
			arraymove(players.players, index, newIndex );
			// var index = $(this).index();
			if (next.length !== 0) 
			{
				current.insertAfter(next);
				$(current).children().empty();
				$(current).children().append(moveUp);
				$(next).children().empty();
				$(next).children().append(moveDown);
			}
			localStorage.players = JSON.stringify(players.players);
			return false;
		}
	}

	function order_selection()
	{
		$('.game').hide();
		$('.board').hide();
		$('.game_buttons').hide();
		$(submitOrder).text('submit order');
		playerOrder.prepend(submitOrder);
		for (var i = 0; i < players.players.length; i++) 
		{
			create_order(players.players[i], i);
		}
		submitOrder.onclick = function()
		{
			var x = confirm('are you happy with the order of throw?');
			if (x) 
			{
				$('.game').show();
				$('.board').show();
				$('.game_buttons').show();
				players.players[0].player_type = 'bowler';
				players.players[1].player_type = 'batsman';
				localStorage.players = JSON.stringify(players.players);
				playerOrder.remove();
				$(this).remove();
				$.getScript('game/cricket_game.js');
			}
		}
	}

	// IF OPPONENT IS NOT NONE (SINGLE PLAYER) THEN CREATE THE OPPONENT
	if (localStorage['opp_name']) 
	{
		var opp_name = localStorage['opp_name'];
		if (opp_name != 'none') 
		{
			createPlayer( user_name, opp_name, innings );
			createPlayer( opp_name, user_name, innings );
			order_selection();
		}
		else
		{
			createPlayer( user_name, opp_name, innings );
			$('.player_order').hide();
			$('.game').show();
			$('.board').show();
			$('.game_buttons').show();
			$.getScript('game/cricket_game.js');
		}
	}

</script>
