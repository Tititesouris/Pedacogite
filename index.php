<!DOCTYPE html>
    <html lang="fr">

    <head>
        <title>Pedacogite</title>

        <meta charset="utf-8" />
        <meta name="description" content="Pedacogite" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="./css/materialize.min.css" rel="stylesheet" media="all" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" media="all" />
        <link href="./css/main.css" rel="stylesheet" media="all" />

    </head>

    <body>
        <div id="canvas" style="width: 600px; height: 600px; border: 1px solid black;">
            <svg x="0px" y="0px" version="1.1" baseProfile="full" width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" fill="#d2b3c5">
                <g id="turtle" transform="translate(500,500) rotate(0)" x="500" y="500" angle="0">
                    <circle cx="10" cy="0" r="5" fill="#33dd44" stroke="#544a2c" stroke-width="2" />
                    <circle cx="0" cy="0" r="10" fill="#544a2c" stroke="#242a0c" stroke-width="2" />
                    <circle cx="-4" cy="-4" r="2" fill="#ad953e" stroke="#8d650e" stroke-width="1" />
                    <circle cx="-4" cy="4" r="2" fill="#ad953e" stroke="#8d650e" stroke-width="1" />
                    <circle cx="4" cy="-4" r="2" fill="#ad953e" stroke="#8d650e" stroke-width="1" />
                    <circle cx="4" cy="4" r="2" fill="#ad953e" stroke="#8d650e" stroke-width="1" />
                    <circle cx="0" cy="0" r="2" fill="#ad953e" stroke="#8d650e" stroke-width="1" />
                </g>
            </svg>
        </div>
        <footer>
            <script src="./js/jquery-1.11.3.min.js"></script>
            <script src="./js/materialize.min.js"></script>
            <script src="./js/turtle.js"></script>
        </footer>
    </body>
</html>