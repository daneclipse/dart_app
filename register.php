<?php

include('connection.php');
session_start();

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
			$user_email = $_POST['email'];
			$user_password = $_POST['password'];
			if (empty($user_username) || empty($user_email) || empty($user_password)) 
			{
				echo '<p class="alert_message red_button">Please fill out all fields</p>';
			}
			else
			{
				$email_search = "SELECT * FROM users WHERE email = '$user_email'";
				$email_query = mysqli_query($dbc, $email_search);
				$search_rows = mysqli_num_rows($email_query);
				if ($search_rows > 0) 
				{
					echo '<p class="alert_message red_button">Email already being used</p>';
				}
				else
				{
					$name_search = "SELECT * FROM users WHERE username = '$user_username'";
					$name_query = mysqli_query($dbc, $name_search);
					$name_rows = mysqli_num_rows($name_query);
					if ($name_rows > 0) 
					{
						echo '<p class="alert_message red_button">Username taken</p>';
					}
					else
					{
						$insert = "INSERT INTO users (email, username, password, signed_up) VALUES ('$user_email', '$user_username', '$user_password', NOW())";
						$inser_query = mysqli_query($dbc, $insert);
						$num_rows = mysqli_affected_rows($dbc);
						if ($num_rows > 0) 
						{
							$_SESSION['username'] = $user_username;
							header('Location: account.php');
						}
						else
						{
							echo 'User not added';
						}
					}
				}
			}
		}
	?>
	<form action="register.php" method="post" class="form">
		<input type="email" name="email" placeholder="Email" class="form_input">
		<input type="text" name="username" placeholder="Username" class="form_input">
		<input type="password" name="password" placeholder="Password" class="form_input">
		<input type="submit" name="register" value="Register" class="button green_button">
	</form>
	<a href="index.php">already have an account? Login</a>
</div>


</body>
</html>