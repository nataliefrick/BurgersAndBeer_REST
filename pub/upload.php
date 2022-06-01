<?php


include_once("incl/config.php"); 
$_SESSION['msg'] = "";

    if(isset($_POST["submit"])) {
        if(!isset($_FILES["fileToUpload"]["tmp_name"])) // check to see if file selected
        {
            $_SESSION['msg'] .= "Please select a file.";
            header("Location: admin.php"); 
        }
  // } else {
      
        $target_dir = "img/";
        $target_file = basename($_FILES["fileToUpload"]["name"]);
        $target_file_thumbnail = "thumb_" . basename($_FILES["fileToUpload"]["name"]);
        
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_dir . $target_file,PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
          $uploadOk = 1;
        } else {
          $_SESSION['msg'] .= "File is not an image.";
          $uploadOk = 0;
        }


        // Check if file already exists
        if (file_exists($target_dir . $target_file)) {
            $_SESSION['msg'] .= "Sorry, file already exists.";
          $uploadOk = 0;
        }

        // Check file size <500KB
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            $_SESSION['msg'] .= "Sorry, your file is too large.";
          $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
          $_SESSION['msg'] .= "Sorry, only JPG, JPEG & PNG files are allowed.";
          $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
          $_SESSION['msg'] .= " Your file was not uploaded.";
          header("Location: admin.php"); 
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . $target_file)) {

              //Save name of orignal and thumbnail in temp variable
              //$storedfile = $_FILES["file"]["name"];
              //$thumbnail = "thumb_" . $_FILES["file"]["name"];

              //Set max size for thumbnails
              $width_thumbnail = 350;
              $height_thumbnail = 100;
                              

              //Read in orignal size of upload and save info
              list($width_thumbnail_orig, $height_thumbnail_orig) = getimagesize($target_dir . $target_file);
              
              //Calc ratio to apply to thumbnails
              $ratio_orig = $width_thumbnail_orig / $height_thumbnail_orig;				                       
              
              //Räknar ut storlek på miniatyr
              if ($width_thumbnail / $height_thumbnail > $ratio_orig) {
                  $width_thumbnail = $height_thumbnail * $ratio_orig;
                  $height_thumbnail = $width_thumbnail / $ratio_orig;
              } else {
                  $height_thumbnail = $width_thumbnail / $ratio_orig;
                  $width_thumbnail = $height_thumbnail * $ratio_orig;
              }

              //Generate thumbnail with correct dimensions
              $image_p = imagecreatetruecolor($width_thumbnail, $height_thumbnail);
              $image = imagecreatefromjpeg($target_dir . $target_file);
              imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width_thumbnail, $height_thumbnail, $width_thumbnail_orig, $height_thumbnail_orig);

              //Save thumbnail
              imagejpeg($image_p, $target_dir . $target_file_thumbnail);

              





              // $_SESSION['msg'] .= "<a href='$target_file' title='Öppna originalbild'><img src='$target_dir$target_file_thumbnail' alt='$target_file' /></a><br><br>\n";
              $_SESSION['msg'] .= " The file <em>". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). "</em> has been uploaded.\n";
              $_SESSION['filename'] = $target_file; // send back file name to link in db
              header("Location: admin.php"); 
            } else {
              $_SESSION['msg'] .= " Sorry, there was an error uploading your file.";
              header("Location: admin.php"); 
            }
        }
    // }
}
?>