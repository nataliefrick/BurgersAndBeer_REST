<?php 
include_once("incl/config.php"); 
?>
<!DOCTYPE html>
<html lang="se">
<head>
    
    <title><?= $page_title . $divider . $site_title; ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Style Sheets -->
    <link rel="stylesheet" href="css/variables.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200;400;500;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <header id="header">
        <div class="logo">
            <img src="img/logo-orange.webp" alt="logo of burgerandbeers">
        </div>
        <div class="nav-bar">
            <a href="book.html" class="boka-bord-btn">
                <h2>Boka bord</h2>
            </a>
            <nav id="hamburger-menu">
                <!-- The overlay -->
                <div id="myNav" class="overlay">
        
                    <!-- Button to close the overlay navigation -->
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        
                    <!-- Overlay content -->
                    <div class="overlay-content">
                        <a href="index.html">Start</a>
                        <a href="admin.php">Admin Dashboard</a>
                        <a href="upload-file.php">Upload Image</a>
                    </div>
                </div>
        
                <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
                <a href="javascript:void(0);" class="icon" onclick="openNav()">
                    <i class="fa fa-bars"></i>
                </a>
            </nav>
        </div>
    </header>
    <main>
        <!-- Section title -->
        <section id="title">
            <h2>Dashboard</h2>
        </section>