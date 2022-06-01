<?php
include_once("incl/config.php");

//$url = "http://localhost/173%20project/webservice/login.php";
$url = "https://nataliesalomons.com/miun/dt173g/project/webservice/login.php";

$page_title = "Login";
include("incl/header.php");

// Check to see if user is logged in
if (isset($_SESSION["admin"])) { // if yes - direct to admin.php dashboard
    header("Location: admin.php");
}

// Check to see if this is a redirect with info from POST form
if (isset($_POST['username'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check att fields are filled in
    if (empty($username) || empty($password)) {
        $errormsg = "<p class='error'><strong>Fyll i användarnamn och lösenord!</strong></p>";
    } else {
        // If both fields have data, check with the database with a cURL call

        //POST with cURL
        $curl = curl_init();
        // array
        $user = array("username" => $username, "password" => $password);
        // convert to json
        $json_string = json_encode($user);
        // cURL setup
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // Response and status codes
        $data = json_decode(curl_exec($curl), true);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        
        // If user is found in database
        if($httpcode === 200) {
            $_SESSION['admin'] = $username;

            header("Location: admin.php");
        } else {
            $errormsg = "<p class='error'><strong>Felaktigt användarnamn eller lösenord!</strong></p>";
        }
    }
}

?>
<div class="container">
    <?php
    if (isset($errormsg)) {
        echo $errormsg;
    }
    ?>
    <form action="index.php" method="post">
        <label for="username">Användarnamn:</label>
        <br>
        <input type="text" name="username" id="username">
        <br>
        <label for="password">Lösenord:</label>
        <br>
        <input type="password" name="password" id="password">
        <br>
        <input class="btn" type="submit" value="Logga in">
    </form>





<?php
include("incl/footer.php");