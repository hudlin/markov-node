var markov = require('./../src/markov.js');
var fs = require('fs');

var parser = markov.createParser();

console.log('--');
fs.realpath('./tests/data/aliceinwonderland.txt', function(err, resolvedPath){
  if (err) throw err;
  fs.readFile(resolvedPath, 'utf8', function(err, data){
    if (err) throw err;
    parser.parseString(data);
    
    console.log(parser.generate(300));
  
    console.log('--');
  });
});
