window.script_input;
window.script_output;
window.export_box;
window.start_btn;
window.stop_btn;

function turtlePrint(text) {
    $(script_output).html($(script_output).html() + '<br />' + text);
}

function turtleMove(distance) {
    $(export_box).parseInstruction("move", distance);
    turtlePrint("Avance de " + distance);
}

function turtleTurn(angle) {
    $(export_box).parseInstruction("turn", angle);
    turtlePrint("Tourne de " + angle + " degrés.");
}

function turtlePenUpDown(value) {
    $(export_box).parseInstruction("pen", value);
    console.log(value);
    turtlePrint("Lève le crayon.");
}

$.fn.parse = function() {
    var printRegex = /^print\("(.*)"\)$/i;
    var moveRegex = /^move\((\d*)\)$/;
    var turnRegex = /^turn\((-?\d*)\)$/;
    var penUpDownRegex = /^pen(Up|Down)\(\)$/;
    
    var lines = $(this).val().split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = $.trim(lines[i]);
        
        var text = printRegex.exec(line);
        if (text != null) {
            turtlePrint(text[1]);
            continue;
        }
        
        var distance = moveRegex.exec(line);
        if (distance != null) {
            turtleMove(distance[1]);
            continue;
        }
        
        var angle = turnRegex.exec(line);
        if (angle != null) {
            turtleTurn(angle[1]);
            continue;
        }
        
        var penUpDown = penUpDownRegex.exec(line);
        if (penUpDown != null) {
            turtlePenUpDown(penUpDown[1] == "Down");
            continue;
        }
    }
}

$.fn.parseInstructions = function() {
    return $.parseJSON($(this).text());
}

$.fn.parseInstruction = function(name, value) {
    var comma = ($(this).text().charAt(1) == ']') ? '' : ', ';
    var quotes = (value || $.isNumeric(value)) ? '' : '"';
    $(this).text($(this).text().slice(0,-1) + comma + '{"name": "' + name + '", "value": ' + quotes + value + quotes + '}]');
}

$(function () {
    script_input = $("#script-input");
    script_output = $("#script-output");
    export_box = $("#export-box");
    start_btn = $("#start-btn");
    stop_btn = $("#stop-btn");
    
    start_btn.click(function() {
        script_output.text('-- TurtleScript v1.0 --');
        export_box.text('[]');
        script_input.parse();
        executeInstructions(export_box.parseInstructions());
    });
});