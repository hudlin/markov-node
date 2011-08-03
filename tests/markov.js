var markov = require('./../src/markov.js');

var text = 'Computer displays are made up from grids of small rectangular cells called pixels. The picture is built up from these cells. The smaller and closer the cells are together, the better the quality of the image, but the bigger the file needed to store the data. If the number of pixels is kept constant, the size of each pixel will grow and the image becomes grainy (pixellated) when magnified, as the resolution of the eye enables it to pick out individual pixels.Vector graphics files store the lines, shapes and colors that make up an image as mathematical formulae. A vector graphics program uses these mathematical formulae to construct the screen image, building the best quality image possible, given the screen resolution. The mathematical formulae determine where the dots that make up the image should be placed for the best results when displaying the image. Since these formulae can produce an image scalable to any size and detail, the quality of the image is limited only by the resolution of the display, and the file size of vector data generating the image stays the same. Printing the image to paper will usually give a sharper, higher resolution output than printing it to the screen but can use exactly the same vector data file.';

markov.digestString(text);

console.log('--');

console.log(markov.generate());