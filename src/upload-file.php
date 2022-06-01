<?php
include_once("incl/config.php");
// check to see if user is logged in
// $user = new User();
// $user->restrictPage();

$page_title = "Upload a file";
include("incl/header.php");
?><div class="empty-space"></div>

<section class="container" id="uploadFile">

<h3>Upload a image file</h3>

<span class="errormsg">
    <?php
    if(isset($_SESSION['msg'])) {
        echo $_SESSION['msg'];
    }
    unset($_SESSION['msg']);
    ?>
</span>
<p>Once the file is uploaded it can be found in the image link section of the add recipe or update user forms.</p>
<form action="upload.php" method="post" enctype="multipart/form-data">
    <label for="fileToUpload">Select image to upload:</label>
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit" id="fileupload">
</form>