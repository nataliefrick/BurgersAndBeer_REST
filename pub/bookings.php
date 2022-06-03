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
    <table>
        <thead>
            <tr>
                <th class="centered">Id</th>
                <th class="centered">Datum</th>
                <th class="centered">Tid</th>
                <th class="centered desc">Antal P</th>
                <th class="centered">Namn</th>
                <th class="centered">Telefon</th>
                <th class="centered">Epost</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="bookings-list-today">
        </tbody>
    </table>
    <h3>Imorgon</h3>
    <table>
        <thead>
            <tr>
                <th class="centered">Id</th>
                <th class="centered">Datum</th>
                <th class="centered">Tid</th>
                <th class="centered desc">Antal P</th>
                <th class="centered">Namn</th>
                <th class="centered">Telefon</th>
                <th class="centered">Epost</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="bookings-list-tomorrow">
        </tbody>
    </table>
    <h3>I över morgon</h3>
    <table>
        <thead>
            <tr>
                <th class="centered">Id</th>
                <th class="centered">Datum</th>
                <th class="centered">Tid</th>
                <th class="centered desc">Antal P</th>
                <th class="centered">Namn</th>
                <th class="centered">Telefon</th>
                <th class="centered">Epost</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="bookings-list-third">
        </tbody>
    </table>
    <h3>Senare</h3>
    <table>
        <thead>
            <tr>
                <th class="centered">Id</th>
                <th class="centered">Datum</th>
                <th class="centered">Tid</th>
                <th class="centered desc">Antal P</th>
                <th class="centered">Namn</th>
                <th class="centered">Telefon</th>
                <th class="centered">Epost</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="bookings-list-later">
        </tbody>
    </table>
    <div class="dont-show" id="submit-addnew"></div>
    <div class="dont-show close-button" id="close-button"></div>
<?php
include("incl/footer.php");