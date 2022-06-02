<?php
include_once("incl/config.php");
// check to see if user is logged in
if (!isset($_SESSION["admin"])) {
    header("Location: index.php");
}

$page_title = "Dashboard";
include("incl/header.php");

// populate dropdown with img files
$thelist = '<option value=""></option>';
if ($handle = opendir('img/')) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $thelist .= '<option value="'.$file.'">'.$file.'</option>';
        }
    }
    closedir($handle);
}


?>

<!-- section main -->
<section id="main">
    <h2>Meny:n</h2>
    <p>Här ser du alla alternativ i menu.</p>
    <div id="instructions">
        <p><span class="bold">Uppdatera: </span>Webbplasten använder "content-edible" redigering. Gör ändringar direkt in i tabellen och sedan spara ändringar. </p>
        <p><span class="bold">Lägga till: </span>Steg 1 är att ladda upp en bild. Steg två är att fylla i formuläret. Steg 3: tryck på "lägg till" knappen.</p>
        <p><span class="bold">Ta-bort: </span>Klicka på ta-bort knappen. </p>
        <!-- message -->
        <span class="errormsg">
            <?php
            if(isset($_SESSION['msg'])) {
                echo $_SESSION['msg'];
            }
            unset($_SESSION['msg']);
            ?>
        </span>
    </div>




<!-- upload files -->
    <section id="upload-file">
        <h3>Ladda up en bild</h3>
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <label class="dont-show" for="fileToUpload">Välj fil:</label>
            <input type="file" name="fileToUpload" id="fileToUpload">
            <input type="submit" value="ok" name="submit" id="fileupload">
        </form>
    </section>

    <section id="add-newItem">
        <h3>Lägga till en ny meny alt.</h3>
        <form id="addNew" method="POST">
            <table>
                <thead>
                    <tr>
                        <th class="centered">Id</th>
                        <th class="centered"><label for="nameInput">Namn:</label></th>
                        <th class="centered"><label for="categoryInput">Kategori:</label></th>
                        <th class="centered desc"><label for="descInput">Beskrivningen</label></th>
                        <th class="centered"><label for="imgInput">Bild Filnamn:</label></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="item">
                        <td></td>
                        <td><input type="text" name="nameInput" id="nameInput"></td>
                        <td><select id="categoryInput" name="categoryInput">
                            <option value="burgare">burgare</option>
                            <option value="beer">beer</option>
                            <option value="sides">sides</option>
                            <option value="läsk">läsk</option>
                            <option value="lättöl">lättöl</option>
                            <option value="efterrätt">efterrätt</option>
                            </select></td>
                        <td><input type="text" name="descInput" id="descInput"></td>
                        <td>
                        <select id="imgInput" name="imgInput">
                            <?php echo $thelist; ?>
                        </select>
                        </td>
                        <td><input class="btn" type="submit" id="submit-addnew" value="Lägg till"></input></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </section>

    <section id="MenuItems">
        <h3>Alla meny alternativ</h3>
        <table>
            <thead>
                <tr>
                    <th class="centered">Id</th>
                    <th class="centered">Namn</th>
                    <th class="centered">Kategori</th>
                    <th class="centered desc">Beskrivning</th>
                    <th class="centered">Bild</th>
                    <th class="centered">Dagens Lunch</th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="menu-list">
            </tbody>
        </table>
    </section>
    <!-- modal section -->
    <div class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h3>Redigera menyalternativ</h3>
            <form id="modal">
            </form>
        </div>
    </div>
</section><!-- main section closing tag -->


<?php
include("incl/footer.php");