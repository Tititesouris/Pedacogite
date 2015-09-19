window.svg;
window.turtle;

function addElement(element, attributes) {
    var svgElement = $(document.createElementNS('http://www.w3.org/2000/svg', element));
    svgElement.attr(attributes).appendTo(svg);
}

function addLine(x1, y1, x2, y2) {
    addElement('line', {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'stroke': '#000000', 'stroke-width': 1});
}

$.fn.setAttributes = function(distance, theta) {
    var x = parseFloat($(this).attr("x")), y = parseFloat($(this).attr("y"));
    var angle = -parseInt($(this).attr("angle"));
    
    if (distance != 0) {
        x += Math.cos(angle * Math.PI / 180) * distance;
        y -= Math.sin(angle * Math.PI / 180) * distance;
    }
    if (theta != 0) {
        angle = (angle + theta) % 360;
    }
    
    $(this).attr({
        'x': x,
        'y': y,
        'angle': -angle,
        'transform': 'translate(' + x + ',' + y + ') rotate(' + -angle + ')'
    });
}

$.fn.moveForward = function(distance) {
    $(this).setAttributes(distance, 0);
}

$.fn.rotate = function(theta) {
    $(this).setAttributes(0, theta);
}
    
$(function () {
    svg = $('svg');
    turtle = $('svg').find("#turtle");
    setInterval(function() {
        turtle.moveForward(1);
        turtle.rotate(1);
    }, 10);
    
});