<?php include_once("incl/config.php"); 
$user = new User();
$user->logoutUser();
header('location: login.php');