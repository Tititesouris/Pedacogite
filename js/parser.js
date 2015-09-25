window.script_input;
window.script_output;
window.export_box;
window.play_btn;
window.pause_btn;
window.stop_btn;

function isInt(n) {
    return +n === n && !(n % 1);
}

function println(text) {
    $(script_output).html($(script_output).html() + '<br />' + text);
}

function turtleInit(x, y, angle) {
    $(export_box).parseInstruction("init", x + "&" + y + "&" + angle);
}

function turtlePrint(text) {
    $(export_box).parseInstruction("print", text);
}

function turtleMove(distance) {
    $(export_box).parseInstruction("move", distance);
}

function turtleTurn(angle) {
    $(export_box).parseInstruction("turn", angle);
}

function turtlePenUpDown(value) {
    $(export_box).parseInstruction("pen", value);
}

$.fn.parse = function() {
    var initRegex = /^init\((\d+), *(\d+), *(\d+)\)$/i;
    var commentRegex = /^#+/i;
    var printRegex = /^print\("(.*)"\)$/i;
    var moveRegex = /^move\((\d*)\)$/i;
    var turnRegex = /^turn\((-?\d*)\)$/i;
    var penUpDownRegex = /^pen(Up|Down)\(\)$/i;
    
    var lines = $(this).val().split('\n').filter(function(l) { return l != ""});
    var firstLine = $.trim(lines[0]);
    var init = initRegex.exec(firstLine);
    if (init != null) {
        turtleInit(init[1], init[2], init[3])
    }
    for (var i = 0; i < lines.length; i++) {
        var line = $.trim(lines[i]);
        var comment = commentRegex.exec(line);
        if (comment != null) {
            continue;
        }
        
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
    var quotes = (isInt(value)) ? '' : '"';
    $(this).text($(this).text().slice(0,-1) + comma + '{"name": "' + name + '", "value": ' + quotes + value + quotes + '}]');
}

$(function () {
    script_input = $("#script-input");
    script_output = $("#script-output");
    export_box = $("#export-box");
    play_btn = $("#play-btn");
    pause_btn = $("#pause-btn");
    stop_btn = $("#stop-btn");
    
    play_btn.click(function() {
        stopped = false;
        if (turtle.isPaused()) {
            turtle.pause(false);
        }
        else {
            script_output.text('-- TurtleScript v1.0 --');
            export_box.text('[]');
            script_input.parse();
            executeInstructions(export_box.parseInstructions());
        }
        $(this).hide();
        pause_btn.show();
    });
    
    pause_btn.click(function() {
        turtle.pause(true);
        $(this).hide();
        play_btn.show();
    });
    
    stop_btn.click(function() {
        stopped = true;
        turtle.reset();
    });
});