var MAXGEN = 10000;
var NOWORD = '\n';

var reWord = /\w/;

var state = {};

function prefix(w1, w2){
  return w1 + ' ' + w2;
}

function insert(index, value){
  var list = state[index];
  if (!list){
    state[index] = [value];
  }
  else{
    list.push(value);
  }
}

/**
Function: digest
  Consumes words.
Parameters:
  - fn - (Function) - An iterator that returns a word at a time.
*/
var digest = exports.digest = function(fn){
  var w1 = NOWORD;
  var w2 = NOWORD;
  var w = fn();
  while (w){
    insert(prefix(w1, w2), w);
    w1 = w2;
    w2 = w;
    w = fn();
  }
};

function stringIterator(s){
  var m = /\w+/.exec(s);
  var i = 0;
  return function(){
    var r = m[i];
    i++;
    return r;
  };
}

/**
Function: digestString
  Consumes words from the passed in string.
Parameters:
  - s - (String) - The source string to consume.
*/
exports.digestString = function(s){
  digest(stringIterator(s));
};

/**
Function: digestFile
  Consumes words from the passed in file.
Parameters:
  - s - (String) - The file path of the file to consume.
*/
exports.digestFile = function(){};

/**
Function generate
  Generate a string from the consumed words.
Parameters:
  - len - (Number) - The number of words to return.
*/
exports.generate = function(len, w1, w2){
  w1 = w1 || NOWORD;
  w2 = w2 || NOWORD;
  if (len > MAXGEN) len = MAXGEN;
  var words = [];
  var list, r, nextword;
  for (var i=0; i<len; i++){
    list = state[prefix(w1, w2)];
    r = Math.floor(Math.random() * list.length);
    nextword = list[r];
    if (nextword == NOWORD) return words.join(' ');
    words.push(nextword);
  }
  return words.join(' ');
};