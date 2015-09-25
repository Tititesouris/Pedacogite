function outf(text) { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text; 
} 

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

$(function() {
    $('#run-btn').click(function() {
        var prog = $('#yourcode').text();
        var mypre = $('#output');
        mypre.innerHTML = '';
        Sk.pre = "output";
        Sk.configure({output:outf, read:builtinRead});
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'canvas';
        var myPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });
        myPromise.then(function(mod) {
            console.log('success');
        }, function(err) {
            console.log(err.toString());
        });
    });
});