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
    <h2>Bookings</h2>

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
        <h3>Todays Bookings</h3>
        <tbody id="bookings-list-today">
        </tbody>
    </table>


<?php
include("incl/footer.php");