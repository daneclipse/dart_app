<?php

include('connection.php');
session_start();

$user_username = $_SESSION['username'];

?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<h1><?=$user_username;?></h1>

	<a href="index.php">Logout</a>

</body>
</html>