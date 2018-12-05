wicket has been taken



check_scores();


function check_current_scores()
{
	if (players.players[0].innings == 1) 
	{
		// IF FIRST PLAYER HAS BOWLED OUT THE SECOND PLAYER
		if (players.players[0].game_stats.bowled == 1) 
		{
			var score_to_beat = players.players[1].batsman_innings.runs_scored;
			players.players[1].game_stats.first_innings.score = score_to_beat;

			var current_score = players.players[0].batsman_innings.runs_scored;

			// IF FIRST PLAYERS SCORE IS BIGGER THAN SECOND PLAYERS SCORE - FIRST PLAYER HAS WON WITH WICKETS LEFT
			if (current_score > score_to_beat) 
			{
				players.players[0].game_stats.first_innings.score = current_score;
				players.players[0].game_stats.first_innings.outcome = 'won';
				players.players[0].game_stats.first_innings.wickets_fallen = players.players.batsman_innings.wickets_fallen;
				players.players[0].game_stats.first_innings.wickets_taken = players.players[0].bowler_innings.wickets_taken;

				players.players[1].game_stats.first_innings.outcome = 'lost';
				players.players[1].game_stats.first_innings.wickets_fallen = 10;
				players.players[1].game_stats.first_innings.wickets_taken = players.players[1].bowler_innings.wickets_taken;
				end_game();
			}
			else
			{
				// IF FIRST PLAYER HAS BOWLED & BATTED - FIND THE WINNER
				if (players.players[0].game_stats.batted == 1) 
				{
					var first_player_score = players.players[0].batsman_innings.runs_scored;
					var second_player_score = players.players[1].batsman_innings.runs_scored;
					if (first_player_score > second_player_score) 
					{
						players.players[0].game_stats.first_innings.outcome = 'won';
						players.players[1].game_stats.first_innings.outcome = 'lost';

						players.players[0].game_stats.first_innings.wickets_fallen = 10;
						players.players[0].game_stats.first_innings.wickets_taken = players.players[0].bowler_innings.wickets_taken;
						players.players[1].game_stats.first_innings.wickets_fallen = 10;
						players.players[1].game_stats.first_innings.wickets_taken = players.players[1].bowler_innings.wickets_taken;
					}
					else if (first_player_score < second_player_score)
					{
						players.players[0].game_stats.first_innings.outcome = 'lost';
						players.players[1].game_stats.first_innings.outcome = 'won';

						players.players[0].game_stats.first_innings.wickets_fallen = 10;
						players.players[0].game_stats.first_innings.wickets_taken = players.players[0].bowler_innings.wickets_taken;
						players.players[1].game_stats.first_innings.wickets_fallen = 10;
						players.players[1].game_stats.first_innings.wickets_taken = players.players[1].bowler_innings.wickets_taken;
					}
					else
					{
						players.players[0].game_stats.first_innings.outcome = 'draw';
						players.players[1].game_stats.first_innings.outcome = 'draw';

						players.players[0].game_stats.first_innings.wickets_fallen = 10;
						players.players[0].game_stats.first_innings.wickets_taken = players.players[0].bowler_innings.wickets_taken;
						players.players[1].game_stats.first_innings.wickets_fallen = 10;
						players.players[1].game_stats.first_innings.wickets_taken = players.players[1].bowler_innings.wickets_taken;
					}
					end_game();
				}
			}
		}
		else
		{
			// IF BATSMAN HAS BEEN BOWLED ALL OUT
			if (players.players[1].batsman_innings.wickets_left <= 0) 
			{
				players.players[1].batsman_innings.wickets_left = 0;
				players.players[1].batsman_innings.wicekts_fallen = 10;

				players.players[0].bowler_innings.wickets_left = 0;

				players.players[1].game_stats.batted++
				players.players[0].game_stats.bowled++
			}
		}
	}
}
// else if (players.players[0].innings == 2)
// {
// 	if (players.players[1].batsman_innings.wickets_left <= 0) 
// 	{
// 		players.players[1].batsman_innings.wickets_left = 0;
// 		players.players[1].batsman_innings.wicekts_fallen = 10;

// 		players.players[0].bowler_innings.wickets_left = 0;

// 		players.players[1].game_stats.batted++
// 		players.players[0].game_stats.bowled++
// 	}

// 	if (players.players[0].game_stats.bowled == 1 && players.players[0].game_stats.batted == 1) 
// 	{

// 	}
// 	else
// 	{
// 		change_order();
// 	}
// }





