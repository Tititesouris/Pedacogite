function output(text) { 
    $('#output-box').append(text);
} 

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

$(function() {
    $('#play-btn').click(function() {
        var inputBox = $('#input-box').text();
        Sk.div = "output-box";
        Sk.configure({output: output, read: builtinRead});
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'canvas';
        var myPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, inputBox, true);
        });
        myPromise.then(function(mod) {
            console.log('success');
        }, function(err) {
            console.log(err.toString());
        });
    });
});