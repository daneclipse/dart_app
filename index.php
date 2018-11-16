<?php

include('connection.php');
session_start();

// GETS RID OF LAST USER LOGGED IN & OPPONENT
unset($_SESSION['username']);
unset($_SESSION['opp_user']);
unset($_SESSION['opp_guest']);

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/general.css">
</head>
<body>

	<div class="page">
		<?php
			if ($_SERVER['REQUEST_METHOD'] == 'POST') 
			{
				$user_username = $_POST['username'];
				$user_password = $_POST['password'];
				if (empty($user_username) || empty($user_password)) 
				{
					echo '<p class="alert_message red_button">Please fill out all fields</p>';
				}
				else
				{
					$user_search = "SELECT * FROM users WHERE username = '$user_username'";
					$user_query = mysqli_query($dbc, $user_search);
					$user_rows = mysqli_num_rows($user_query);
					if ($user_rows > 0) 
					{
						while($user_row = mysqli_fetch_array($user_query))
						{
							$db_password = $user_row['password'];
						}
						if ($user_password == $db_password) 
						{
							$_SESSION['username'] = $user_username;
							header('Location: account.php');
						}
						else
						{
							echo '<p class="alert_message red_button">Incorrect Password</p>';
						}
					}
					else
					{
						echo '<p class="alert_message red_button">Username Incorrect</p>';
					}
				}
			}
		?>
		<form action="index.php" method="post" class="form small_form">
			<input type="text" name="username" placeholder="Username" class="form_input">
			<input type="password" name="password" placeholder="Password" class="form_input">
			<input type="submit" name="login" value="Login" class="button green_button">
		</form>

		<a href="register.php">dont have an account? Sign up</a>
	</div>


</body>
</html>