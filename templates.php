<?php

function getHeader() {
    echo "
<!DOCTYPE html>
<html>
<head>
    <title>MetHotels</title>
    <link rel=\"stylesheet\" href=\"/Hotels/styles/main.css\">
    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.standalone.min.css\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>

<body>
<div class=\"navbar navbar-inverse\">
    <div class=\"container\">
        <div class=\"navbar-header\">
            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar_collapse\">
                <span class=\"sr-only\">Toggle navigation</span>
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
            </button>
            <a class=\"navbar-brand\" href=\"/Hotels\">MetHotels</a>
        </div>

        <div class=\"navbar-collapse collapse\" id=\"navbar_collapse\">

            <a href=\"/Hotels/pages/login.php\" class=\"btn btn-default navbar-btn\">Sign in</a>
            <a href=\"/Hotels/pages/registration.php\" class=\"btn btn-primary navbar-btn\">Register</a>

            <form class=\"navbar-form navbar-right hidden-xs\">
                <div class=\"form-group\">
                    <input type=\"text\" class=\"form-control\" placeholder=\"Search\">
                </div>
                <button type=\"submit\" class=\"btn btn-primary\">Submit</button>
            </form>
        </div>
    </div>
</div>";
}


function getFooter() {
    echo "
    </body>

<script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-2.2.3.min.js\"></script>
<script type=\"text/javascript\" src=\"/Hotels/lib/bootstrap/js/bootstrap.min.js\"></script>
<script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min.js\"></script>
<script type=\"text/javascript\" src=\"/Hotels/scripts/main.js\"></script>
</html>
    ";
}

?>