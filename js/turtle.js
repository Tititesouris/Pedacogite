window.svg;
window.turtle;

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
    var first = $(tempLines).first();
    var x1 = $(first).attr("x1"), y1 = $(first).attr("y1");
    var last = $(tempLines).last();
    var x2 = $(last).attr("x2"), y2 = $(last).attr("y2");
    addLine(x1, y1, x2, y2);
    $(tempLines).remove();
}

function executeInstructions(instructions) {
    executeInstruction(instructions[0]);
}

function executeInstruction(instruction) {
    switch (instruction.name) {
        case "move":
            $(turtle).moveForward(instruction.value);
            break;
        case "turn":
            $(turtle).rotate(instruction.value);
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
    
    if ($(this).attr("pen")) {
        addTempLine(x1, y1, x2, y2);
    }
}

$.fn.moveForward = function(distance) {
    var i = 0;
    var moveInterval = setInterval(function() {
        if (i >= distance) {
            clearInterval(moveInterval);
            replaceTempLines();
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
        }
        else {
            $(turtle).setAttributes(0, Math.sign(theta));
            i++;
        }
    }, 1 / parseFloat($(turtle).attr("speed")));
}

$.fn.setPen = function(value) {
    $(this).attr("pen", value);
}

$.fn.setSpeed = function(value) {
    if (0 < speed && speed <= 1) {
        $(this).attr("speed", value);
    }
}
    
$(function () {
    svg = $('svg');
    turtle = $('svg').find("#turtle");
    var instructions = [{"name": "move", "value": 100}, {"name": "turn", "value": 90}, {"name": "move", "value": 500}];
    executeInstructions(instructions);
    /*setInterval(function() {
        turtle.moveForward(1);
        turtle.rotate(1);
    }, 10);
    */
    console.log("Page Weight:" + $('*').length);
});