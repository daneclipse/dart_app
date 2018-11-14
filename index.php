<?php

include('connection.php');

$user_username = $_POST['username'];
$user_email = $_POST['email'];
if (!isset($user_username)) 
{
	echo 'You need to register';
}
else
{
	$email_search = "SELECT * FROM users WHERE email = '$user_email'";
	$email_query = mysqli_query($dbc, $email_search);
	$search_rows = mysqli_num_rows($email_query);
	if ($search_rows > 0) 
	{
		echo 'Email already being used';
	}
	else
	{
		$name_search = "SELECT * FROM users WHERE username = '$user_username'";
		$name_query = mysqli_query($dbc, $name_search);
		$name_rows = mysqli_num_rows($name_query);
		if ($name_rows > 0) 
		{
			echo 'Username taken';
		}
		else
		{
			$user_password = $_POST['password'];
			$insert = "INSERT INTO users (email, username, password, signed_up) VALUES ('$user_email', '$user_username', '$user_password', NOW())";
			$inser_query = mysqli_query($dbc, $insert);
			$num_rows = mysqli_affected_rows($dbc);
			if ($num_rows > 0) 
			{
				echo 'User added';
			}
			else
			{
				echo 'User not added';
			}
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
		<input type="email" name="email" placeholder="Email">
		<input type="text" name="username" placeholder="Username">
		<input type="password" name="password" placeholder="Password">
		<input type="submit" name="login" value="Register">
	</form>


</body>
</html>