<?php
    $turtle_size = 5;
?>
<!DOCTYPE html>
    <html lang="fr" style="height: 90%;">
    <head>
        <title>Pedacogite</title>

        <meta charset="utf-8" />
        <meta name="description" content="Pedacogite is an interactive way to learn programming with Turtle." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="./css/materialize.min.css" rel="stylesheet" media="all" />
        <link href="./css/icons.css" rel="stylesheet" media="all" />
        <link href="./css/main.css" rel="stylesheet" media="all" />

    </head>

    <body style="height: 100%;" class="orange lighten-4">
        <br />
        <div class="row" style="height: 100%;">
            <div class="col s6 m6 l6" style="height: 100%;">
                <div id="canvas">
                    <svg x="0px" y="0px" version="1.1" baseProfile="full" width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <g id="turtle" transform="translate(500,500) rotate(0)" x="500" y="500" angle="0" pen="true" speed="0.1" pause="false">
                            <circle cx="<?php echo 2 * $turtle_size; ?>" cy="0" r="<?php echo $turtle_size; ?>" fill="#538a44" stroke="#544a2c" stroke-width="2" />
                            <circle cx="0" cy="0" r="<?php echo 2 * $turtle_size; ?>" fill="#544a2c" stroke="#242a0c" stroke-width="2" />
                            <circle cx="-<?php echo $turtle_size - 2; ?>" cy="-<?php echo $turtle_size - 2; ?>" r="<?php echo $turtle_size / 2; ?>" fill="#ad953e" stroke="#8d650e" stroke-width="<?php echo $turtle_size / 5; ?>" />
                            <circle cx="-<?php echo $turtle_size - 2; ?>" cy="<?php echo $turtle_size - 2; ?>" r="<?php echo $turtle_size / 2; ?>" fill="#ad953e" stroke="#8d650e" stroke-width="<?php echo $turtle_size / 5; ?>" />
                            <circle cx="<?php echo $turtle_size - 2; ?>" cy="-<?php echo $turtle_size - 2; ?>" r="<?php echo $turtle_size / 2; ?>" fill="#ad953e" stroke="#8d650e" stroke-width="<?php echo $turtle_size / 5; ?>" />
                            <circle cx="<?php echo $turtle_size - 2; ?>" cy="<?php echo $turtle_size - 2; ?>" r="<?php echo $turtle_size / 2; ?>" fill="#ad953e" stroke="#8d650e" stroke-width="<?php echo $turtle_size / 5; ?>" />
                            <circle cx="0" cy="0" r="<?php echo $turtle_size / 2; ?>" fill="#ad953e" stroke="#8d650e" stroke-width="<?php echo $turtle_size / 5; ?>" />
                        </g>
                    </svg>
                </div>
                <div id="button-box">
                    <a id="play-btn" class="btn-floating btn-large green"><i class="material-icons">play_arrow</i></a>
                    <a id="pause-btn" class="btn-floating btn-large orange darken-3" style="display: none;"><i class="material-icons">pause</i></a>
                    <a id="stop-btn" class="btn-floating btn-large red"><i class="material-icons">stop</i></a>
                </div>
            </div>
            <div class="col s6 m6 l6" style="height: 100%;">
                <textarea id="script-input">print("Hello World!")&#13;&#10;move(50)&#13;&#10;turn(50)&#13;&#10;move(50)&#13;&#10;penUp()&#13;&#10;move(50)&#13;&#10;penDown()&#13;&#10;move(100)</textarea>
                <div id="script-output">-- TurtleScript v1.0 --</div>
            </div>
        </div>
                <div id="export-box">[]</div>
        <footer>
            <script src="./js/jquery-1.11.3.min.js"></script>
            <script src="./js/materialize.min.js"></script>
            <script src="./js/turtle.js"></script>
            <script src="./js/parser.js"></script>
        </footer>
    </body>
</html>