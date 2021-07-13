function onlyUnique(x, y, z) {
  y = x.length;
  while (z = --y)
    while (z--) x[y] !== x[z] || x.splice(z, 1);
  return x
}

var permArr = [],
  usedChars = [];

function permute(input) {
  var i, h;
  for (i = 0; i < input.length; i++) {
    h = input.splice(i, 1)[0];
    usedChars.push(h);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, h);
    usedChars.pop();
  }
  return permArr
};

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Silahkan masukan string ----> `, data => {
  let split = data.split('')
  console.log(permute(onlyUnique(split)))

  readline.close()
})
