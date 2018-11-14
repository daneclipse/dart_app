<?php

include('connection.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
	$user_username = $_POST['username'];
	$user_password = $_POST['password'];
	if (!isset($user_username) || !isset($user_password)) 
	{
		echo 'Please fill out all fields';
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
				echo 'Incorrect Password';
			}
		}
		else
		{
			echo 'Username Incorrect';
		}
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<form action="index.php" method="post">
		<input type="text" name="username" placeholder="Username">
		<input type="password" name="password" placeholder="Password">
		<input type="submit" name="login" value="Login">
	</form>

	<a href="register.php">dont have an account?, sign up</a>


</body>
</html>