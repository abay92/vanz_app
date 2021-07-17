function getAllAscii() {
  var allChar = {}
  for (var i = 1; i < 256; i++) {
    allChar[String.fromCharCode(i)] = false
  }

  return allChar
}

function getUnique(input) {
  var ascii = getAllAscii()
  var dataReturn = []

  for (let i = 0; i < input.length; i++) {
    var char = input.charAt(i)

    if (!ascii[char]) {
      dataReturn.push(char)
      ascii[char] = true
    }
  }
  
  return dataReturn.join('')
}

function getLexico(input) {
  var ascii = getAllAscii()
  var dataReturn = []

  for (let i = 0; i < input.length; i++) {
    var char = input.charAt(i)

    if (!ascii[char]) {
      dataReturn.push(char)
      ascii[char] = true
    } else {
      var exKey = dataReturn.indexOf(char);
      var checkReturn = dataReturn.join('')
      if (exKey + 1 < dataReturn.length && checkReturn.charAt(exKey + 1) < char) {
        const index = dataReturn.indexOf(char);
        dataReturn.splice(index, 1)
        dataReturn.push(char)
      }
    }
  }
  
  return dataReturn.join('')
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Silahkan masukan string ----> `, data => {
  console.log(getUnique(data))
  console.log(getLexico(data))

  readline.close()
})
