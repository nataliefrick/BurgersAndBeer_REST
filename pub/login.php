<?php 
$page_title = "Login Page";
include("incl/header.php"); 
?>
<section id="login-section">
    <h2 class="dont-show">Log in</h2>
    <form id="login-form" method="POST">
        <h2>Login</h2>
        <label for="username">Username</label>
        <br>
        <input type="text" name="username" id="username-1">
        <br>
        <label for="password">Password:</label>
        <br>
        <input type="password" name="password" id="password-1">
        <br>
        <br>
        <input class="btn" type="submit" formaction="login-handler.php" value="Log in"><br>
        <span class="errormsg">
            <?php
            if(isset($_SESSION['msg'])) {
                echo $_SESSION['msg'];
            }
            unset($_SESSION['msg']);
            ?>
        </span>
    </form>
    <form id="register-form" method="POST"> 
        <h2>Register a new user</h2>
        <label for="username">Username</label>
        <br>
        <input type="text" name="username">
        <br>
        <label for="password">Password:</label>
        <br>
        <input type="password" name="password">
        <br>
        <label for="name">Your full name:</label>
        <br>
        <input type="text" name="name">
        <br>
        <br>
        <input class="btn" type="submit" formaction="register-handler.php" value="Register"><br>
        <span class="errormsg">
            <?php
            if(isset($_SESSION['msg-reg'])) {
                echo $_SESSION['msg-reg'];
            }
            unset($_SESSION['msg-reg']);
            ?>
        </span>
    </form>

</section><!-- /maincontent -->

<?php
include("incl/footer.php");