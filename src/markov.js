var MAXGEN = 10000;
var NOWORD = '\n';

var Parser = function(){
  
};

Parser.prototype = {
  reWord: /[\w\d]+(?:'\w*)?\.?/g,

  state: {},
  
  /**
  Function: parse
    Consumes words.
  Parameters:
    - fn - (Function) - An iterator that returns a word at a time.
  */ 
  parse: function(fn){
    var w1 = NOWORD;
    var w2 = NOWORD;
    var w = fn();
    while (w){
      insert.call(this, prefix(w1, w2), w);
      w1 = w2;
      w2 = w;
      w = fn();
    }
  },
  
  /**
  Function: parseString
    Consumes words from the passed in string.
  Parameters:
    - s - (String) - The source string to consume.
  */
  parseString: function(s){
    this.parse(stringIterator.call(this, s));
  },
  
  /**
  Function: parseFile
    Consumes words from the passed in file.
  Parameters:
    - s - (String) - The file path of the file to consume.
  */
  parseFile: function(){
    //todo:...
  },
  
  /**
  Function generate
    Generate a string from the consumed words.
  Parameters:
    - len - (Number) - The number of words to return.
  */
  generate: function(len, w1, w2){
    w1 = w1 || NOWORD;
    w2 = w2 || NOWORD;
    if (!len || len > MAXGEN) len = MAXGEN;
    var words = [];
    var list, r, nextword;
    for (var i=0; i<len; i++){
      list = this.state[prefix(w1, w2)];
      if (!list) return words.join(' ');
      r = Math.floor(Math.random() * list.length);
      nextword = list[r];
      if (nextword == NOWORD) return words.join(' ');
      words.push(nextword);
      w1 = w2;
      w2 = nextword;
    }
    return words.join(' ');
  }
};

function prefix(w1, w2){
  return w1 + ' ' + w2;
}

function insert(index, value){
  var list = this.state[index];
  if (!list){
    this.state[index] = new Array(value);
  }
  else{
    list.push(value);
  }
}

function stringIterator(s){
  var m = s.match(this.reWord);
  var i = 0;
  return function(){
    return m[++i];
  };
}

exports.Parser = Parser;

exports.createParser = function(){
  return new Parser();
};