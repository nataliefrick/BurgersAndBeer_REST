<?php

class User {

    // variables
    private $username;
    private $password;
    private $name;
    private $avatar;
    private $users = array();

    // methods
    function __construct() {
        // log in to database
        $this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);
        if($this->db->connect_errno > 0) {
            die("Error connecting to database: " . $this->db->connect_error);
        }
    }

    // set-method
    function setUsername(string $username) : bool { // : bool ... return false returns false if username is not a string

        // check to see is string variable has content
        if(strlen($username) > 0) {
            //sanitize input
            $username = $this->db->real_escape_string($username);
            $this->username = $username;
            return true;
        }

        return false;
    }

    function setPassword(string $password) : bool { // : bool ... return false returns false if password is not a string

        // check to see is string variable has content
        if(strlen($password) > 0) {
            //sanitize input
            $password = $this->db->real_escape_string($password);
            $this->password = $password;
            return true;
        }

        return false;
    }

    function setName(string $name) : bool { 
        // check to see is string variable has content
        if(strlen($name) > 0) {
            //sanitize input
            $name = $this->db->real_escape_string($name);
            $this->name = $name;
            return true;
        }

        return false;
    }



    /** login user
     *  @param string $username, string $password
     *  @return boolean
    */ 
    function loginUser() : bool {
        // hard login
        // if($this->username == "natalie" && $this->password == "password") {
        //     // fill variable with content, i.e. user is logged in.
        //     $_SESSION['username'] = $this->username; 
        //     return true;
        // } else { return false; }

        // get registered users
        $sql = "SELECT * FROM user;";
        $result = mysqli_query($this->db, $sql); //(send query: database connection, query)
        $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $usernameSuccess = false; 
        $passwordSuccess = false; 
        // check in database of registered users
        foreach($users as $user) {
            if($this->username == $user['username']) {
                $usernameSuccess = true; // if username matches
                if (password_verify($this->password, $user['password'])) {
                    // fill variable with content, i.e. user is logged in.
                    $passwordSuccess = true;
                    $_SESSION['name'] = ucwords(strtok($user['name'],  ' '));//
                    $_SESSION['username'] = $this->username;
                } 
            } 
        } 
        
        if($usernameSuccess == true && $passwordSuccess == true) {
            return true;
        } elseif ($usernameSuccess == true && $passwordSuccess != true) { 
            $_SESSION['msg'] = "Incorrect password. ";
            return false; 
        } elseif ($usernameSuccess != true) {
            $_SESSION['msg'] = "Unrecognized username. ";
            return false; 
        }
    }

    /** check to see if user is logged in
     *  @return boolean
    */ 
    function isLoggedIn() : bool {
        // if $_SESSION['name'] variable holds content, i.e. user is logged in.
        if(isset($_SESSION['name'])) {
            return true;
        } else { return false; }
    }    

        // get list of registered users
    function getRegisteredUsers() : array {
            //SQL Query
            $sql = "SELECT * FROM user ORDER BY name;";
            $users = mysqli_query($this->db, $sql); //(send query: database connection, query)
            return mysqli_fetch_all($users, MYSQLI_ASSOC);
    }
       
    function getAuthorName(int $id) : string {
         $sql = "
            SELECT name 
            FROM user
            WHERE id=" . $id . "; 
        ";
        $authorName = mysqli_query($this->db, $sql); 
        
        $author = mysqli_fetch_array($authorName);
        return $author['name']; 
    }

    function getAuthorAvatar(int $id) : string {
        $sql = "
        SELECT avatar 
        FROM user
        WHERE id=" . $id . "; 
        ";
        $authorAvatar = mysqli_query($this->db, $sql); 
        
        $author = mysqli_fetch_array($authorAvatar);
        return $author['avatar']; 
    }

    function getUserById(int $id) : array {
        $sql = "
        SELECT * 
        FROM user
        WHERE id=" . $id . "; 
        ";

        $user = mysqli_query($this->db, $sql);
        return $user->fetch_assoc();
    }

    /** check to see if user is logged in
     *  redirect for not logged in
    */ 
    function restrictPage() : bool {
        // if $_SESSION['username'] variable is empty, i.e. user is not logged in.
        if(!isset($_SESSION['username'])) {
            // if 'false' write out error msg 
            $_SESSION['msg'] = "You need to be logged in for access.";
            header("Location: login.php"); // load login_form.php
            exit;
        } else {
            return true;
        }
        
    }     

    function logoutUser() {
        session_destroy();
        header("Location: login.php");
        exit;
    }

    
}