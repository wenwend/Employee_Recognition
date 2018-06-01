var exec = require('child_process').exec, child;

//SOURCE https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
child = exec('pdflatex ../../award.tex',
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });