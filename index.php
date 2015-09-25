<?php
    $turtle_size = 5;
?>
<!DOCTYPE html>
    <html lang="fr">
    <head>
        <title>Pedacogite</title>

        <meta charset="utf-8" />
        <meta name="description" content="Pedacogite is an interactive way to learn programming with Turtle." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="./css/materialize.min.css" rel="stylesheet" media="all" />
        <link href="./css/icons.css" rel="stylesheet" media="all" />
        <link href="./css/main.css" rel="stylesheet" media="all" />

    </head>

    <body>
        <textarea id="input-box" cols="40" rows="50">import turtle&#13;&#10;t = turtle.Turtle()&#13;&#10;t.forward(100)&#13;&#10;print "Hello World"</textarea>
        
            <div id="button-box">
                    <a id="play-btn" class="btn-floating btn-large green"><i class="material-icons">play_arrow</i></a>
                    <a id="pause-btn" class="btn-floating btn-large orange darken-3" style="display: none;"><i class="material-icons">pause</i></a>
                    <a id="stop-btn" class="btn-floating btn-large red"><i class="material-icons">stop</i></a>
                </div>
        <div id="output-box"></div>
        
        <div id="canvas"></div>
        
        <footer>
            <script src="./js/jquery-1.11.3.min.js" type="text/javascript"></script>
            <script src="./js/materialize.min.js" type="text/javascript"></script>
            <script src="./js/skulpt.min.js" type="text/javascript"></script>
            <script src="./js/skulpt-stdlib.js" type="text/javascript"></script>
            <script src="./js/website.js" type="text/javascript"></script>
        </footer>
    </body>
</html>