<?php

include("../templates.php");
include("../functions.php");

session_start();
getHeader();

$invalidLogin         = false;
$incorrectCredentials = false;

if (isset($_POST['login'])) {
    $email    = $connection->real_escape_string( $_POST['email'] );
    $password = $_POST['password'];

    if (!empty($email) && !empty($password)) {
        if (loginUser( $email, $password )) {
            $_SESSION['email'] = $email;
        } else {
            $incorrectCredentials = true;
        }
    } else {
        $invalidLogin = true;
    }
}

if (isset($_SESSION['email'])) { ?>
    <div class="alert alert-info container">Logged in as with the email <?php echo $_SESSION['email'] ?></div>
<?php } else {

    ?>

    <div class="container">
        <div class="panel col-lg-4 col-sm-6 col-xs-12">
            <div class="panel-body">
                <?php if ($invalidLogin) { ?>
                    <div class="alert alert-danger">
                        Please fill in all the fields correctly
                    </div>
                <?php } ?>

                <?php if ($incorrectCredentials) { ?>
                    <div class="alert alert-danger">
                        Incorrect credentials
                    </div>
                <?php } ?>

                <form action="login.php" method="post">
                    <div class="form-group">
                        <label for="username">Email Address:</label>
                        <input id="username" name="email" placeholder="Email Address" class="form-control" type="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input id="password" name="password" placeholder="Password" class="form-control"
                               type="password">
                    </div>

                    <button class="btn btn-block btn-primary" type="submit" name="login">Log in</button>
                </form>

            </div>
        </div>
    </div>

<?php }

getFooter(); ?>