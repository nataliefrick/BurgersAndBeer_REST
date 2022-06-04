<?php
include_once("incl/config.php");
// check to see if user is logged in
if (!isset($_SESSION["admin"])) {
    header("Location: index.php");
}

$page_title = "Dashboard";
include("incl/header.php");
?>

<!-- section main -->
<section id="main">
    <h2>Bokningar</h2>
    <h3>Idag</h3>
    <table id="bookings-list-today"></table>
    <h3>Imorgon</h3>
    <table id="bookings-list-tomorrow"></table>
    <h3>I över morgon</h3>
    <table id="bookings-list-third"></table>
    <h3>Senare</h3>
    <table id="bookings-list-later"></table>
    <div class="dont-show" id="submit-addnew"></div>
    <div class="dont-show close-button" id="close-button"></div>
<?php
include("incl/footer.php");