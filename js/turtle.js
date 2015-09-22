window.svg;
window.turtle;

var processingInstruction = false;

var house = [
    {"name": "move", "value": 200}, {"name": "turn", "value": 90}, {"name": "move", "value": 200},
    {"name": "speed", "value": 1}, {"name": "turn", "value": 45}, {"name": "move", "value": Math.hypot(100, 200)},
    {"name": "turn", "value": 45}, {"name": "move", "value": 200}, {"name": "turn", "value": 45},
    {"name": "move", "value": Math.hypot(100, 200)}, {"name": "turn", "value": 45},
    {"name": "move", "value": 200}, {"name": "turn", "value": 90}, {"name": "move", "value": 267},
    {"name": "turn", "value": 90}, {"name": "move", "value": 100}, {"name": "turn", "value": -90},
    {"name": "move", "value": 50}, {"name": "turn", "value": -90}, {"name": "move", "value": 100},
    {"name": "pen", "value": false}, {"name": "turn", "value": 180}, {"name": "move", "value": 150}
];

function addElement(element, attributes) {
    var svgElement = $(document.createElementNS('http://www.w3.org/2000/svg', element));
    svgElement.attr(attributes).prependTo(svg);
}

function addLine(x1, y1, x2, y2) {
    addElement('line', {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'stroke': '#000000', 'stroke-width': 1});
}

function addTempLine(x1, y1, x2, y2) {
    addElement('line', {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'stroke': '#000000', 'stroke-width': 1, 'temporary': true});
}

function replaceTempLines() {
    var tempLines = $(svg).find("line[temporary=true]");
    var first = $(tempLines).last();
    var x1 = $(first).attr("x1"), y1 = $(first).attr("y1");
    var last = $(tempLines).first();
    var x2 = $(last).attr("x2"), y2 = $(last).attr("y2");
    addLine(x1, y1, x2, y2);
    $(tempLines).remove();
}

function executeInstructions(instructions) {
    var i = 0;
    var instructionsInterval = setInterval(function() {
        if (i >= instructions.length) {
            clearInterval(instructionsInterval);
        }
        else {
            if (!processingInstruction) {
                processingInstruction = true;
                $.when(executeInstruction(instructions[i])).done(i++);
            }
        }
    }, 10);
}

function executeInstruction(instruction) {
    switch (instruction.name) {
        case "move":
            $(turtle).moveForward(instruction.value);
            break;
        case "turn":
            $(turtle).rotate(instruction.value);
            break;
        case "pen":
            $(turtle).setPen(instruction.value);
            break;
        case "speed":
            $(turtle).setSpeed(instruction.value);
            break;
    }
}

$.fn.setAttributes = function(distance, theta) {
    var x1 = parseFloat($(this).attr("x")), y1 = parseFloat($(this).attr("y"));
    var x2 = x1, y2 = y1;
    var angle = -parseInt($(this).attr("angle"));
    
    if (distance != 0) {
        x2 += Math.cos(angle * Math.PI / 180) * distance;
        y2 -= Math.sin(angle * Math.PI / 180) * distance;
    }
    if (theta != 0) {
        angle = (angle + theta) % 360;
    }
    
    $(this).attr({
        'x': x2,
        'y': y2,
        'angle': -angle,
        'transform': 'translate(' + x2 + ',' + y2 + ') rotate(' + -angle + ')'
    });
    
    if ($(this).attr("pen") == "true") {
        addTempLine(x1, y1, x2, y2);
    }
}

$.fn.moveForward = function(distance) {
    var i = 0;
    var moveInterval = setInterval(function() {
        if (i >= distance) {
            clearInterval(moveInterval);
            replaceTempLines();
            processingInstruction = false;
        }
        else {
            $(turtle).setAttributes(1, 0);
            i++;
        }
    }, 1 / parseFloat($(turtle).attr("speed")));
}

$.fn.rotate = function(theta) {
    var i = 0;
    var rotateInterval = setInterval(function() {
        if (i >= Math.abs(theta)) {
            clearInterval(rotateInterval);
            processingInstruction = false;
        }
        else {
            $(turtle).setAttributes(0, Math.sign(theta));
            i++;
        }
    }, 1 / parseFloat($(turtle).attr("speed")));
}

$.fn.setPen = function(value) {
    $(this).attr("pen", value);
    processingInstruction = false;
}

$.fn.setSpeed = function(value) {
    if (0 < value && value <= 1) {
        $(this).attr("speed", value);
    }
    processingInstruction = false;
}

$(function () {
    svg = $('svg');
    turtle = $('svg').find("#turtle");
    var instructions = house;
    executeInstructions(instructions);
    /*setInterval(function() {
        turtle.moveForward(1);
        turtle.rotate(1);
    }, 10);
    */
    console.log("Page Weight:" + $('*').length);
});