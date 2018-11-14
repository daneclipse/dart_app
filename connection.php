<?php

$hostname = 'localhost';
$username = 'root';
$password = 'root';
$dbname = 'dart_app';

$dbc = mysqli_connect($hostname, $username, $password, $dbname) OR die ('could not connect ' . mysqli_connect_error());

?>