<?php
    $site_title = "Burgers & Beer";
    $divider = " | ";

    // Aktivera felrapportering
    // error_reporting(-1);
    // ini_set("display_errors", 1);
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
    
    // Auto including of classes'
    spl_autoload_register(function ($class_name) {
        include 'classes/' . $class_name . '.class.php';
    });

    // start session
    session_start();

