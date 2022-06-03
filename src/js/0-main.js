"use strict";

//let urlMenu = "http://localhost/173%20project/webservice/site-api.php";
let urlMenu = "https://nataliesalomons.com/miun/dt173g/project/webservice/site-api.php";
let urlBookings = "https://nataliesalomons.com/miun/dt173g/project/webservice/bookings-admin.php";

window.onload = init;

function init() {
    // fetch data from database
    getMenu();
    getBookings();
}
