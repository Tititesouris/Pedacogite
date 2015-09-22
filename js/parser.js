window.script_input;
window.script_output;
window.start_btn;
window.stop_btn;

function turtlePrint(text) {
    console.log(text);
    $(script_output).html($(script_output).html() + '<br />' + text);
}

$.fn.parse = function() {
    var printRegex = /^print\("(.*)"\)$/i;
    
    var lines = $(this).val().split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = $.trim(lines[i]);
        var text = printRegex.exec(line);
        if (text != null) {
            turtlePrint(text[1]);
        }
    }
}

$(function () {
    script_input = $("#script-input");
    script_output = $("#script-output");
    start_btn = $("#start-btn");
    stop_btn = $("#stop-btn");
    
    start_btn.click(function() {
        script_input.parse();
    });
});