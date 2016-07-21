<?php

include("../templates.php");
include("../functions.php");

$registrationSuccess = false;
$invalidRegistration = false;
$userExists          = false;

if (isset($_POST['register'])) {
    $firstName = $_POST['firstname'];
    $lastName  = $_POST['lastname'];
    $email     = $_POST['email'];
    $password  = $_POST['password'];

    if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($password)) {
        if (register( $firstName, $lastName, $email, $password )) {
            header( "refresh:5;url=login.php" );
            $registrationSuccess = true;
        } else {
            $userExists = true;
        }
    } else {
        $invalidRegistration = true;
    }
}
?>


<?php getHeader() ?>

    <div class="container">
        <div class="panel col-lg-4 col-sm-6 col-xs-12">
            <div class="panel-body">
                <?php if ($invalidRegistration) { ?>
                    <div class="alert alert-danger">
                        Please fill in all the fields correctly
                    </div>
                <?php } ?>

                <?php if ($userExists) { ?>
                    <div class="alert alert-danger">
                        A user with the email you specified already exists
                    </div>
                <?php } ?>

                <?php if ($registrationSuccess) { ?>
                    <div class="alert alert-info">
                        Successfully registered. You will be redirected to the login page in a moment.
                    </div>
                <?php } ?>
                <form action="registration.php" method="post">
                    <div class="form-group">
                        <label for="first_name">First Name:</label>
                        <input id="first_name" name="firstname" class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name:</label>
                        <input id="last_name" name="lastname" class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <label for="username">Email Address:</label>
                        <input id="username" name="email" class="form-control" type="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input id="password" name="password" class="form-control" type="password">
                    </div>

                    <button class="btn btn-block btn-primary" type="submit" name="register">Register</button>
                </form>

            </div>
        </div>
    </div>

<?php getFooter() ?>