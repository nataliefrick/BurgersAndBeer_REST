<?php 
$page_title = "Logged In";
include("incl/header.php"); 

if(!isset($_POST['username'])) // if a username has not been used to login
{
    header("Location: login.php"); // load login_form.php
} else {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // create new instance of the user class (a new user object)
    $user = new User();

    // checks to see if username and password are filled in 
    if($user->setUsername($username) && $user->setPassword($password)){
        // if they hold string values, true is returned
        
        // check to see if credentials are on list
        if(!$user->loginUser()) { 
            // if not true write out error msg 
            $_SESSION['msg'] .= "Please try again.";
            header("Location: login.php"); // load login_form.php
        } else { 
            // returned value 'true', user is now logged in.
            header("Location: admin.php"); // load admin
        }

    } else { // write out error msg 
        $_SESSION['msg'] = "Please log in with your username and password.";
        header("Location: login.php");
    }
}

?>