
var readline = require('readline');

process.stdout.write("Name: ");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line){
    console.log(line);
    process.exit();
})
