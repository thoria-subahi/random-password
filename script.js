const options = {
  numbers: true,
  uppercases: true,
  lowercases: true,
  symbols: true,
  similars: false
}

const numbers = '1234567890'
const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
const symbols = '!?#$%&*+-='

// Similar characters are : 1lI! 0OQ 8B
const numbersNoSimilar = '2345679'
const upperCasesNoSimilar = 'ACDEFGHJKLMNPRSTUVWXYZ'
const lowerCasesNoSimilar = 'abcdefghijkmnopqrstuvwxyz'
const symbolsNoSimilar = '?#$%&*+-='

const PASSWORD_LENGTH = 20

let charPool = numbers + upperCases + lowerCases + symbols

document.getElementById('numbers').addEventListener('change', function () {
  options.numbers = this.checked
  updateCharPool()
  updateSubmitButton()
})

document.getElementById('uppercases').addEventListener('change', function () {
  options.uppercases = this.checked
  updateCharPool()
  updateSubmitButton()
})

document.getElementById('lowercases').addEventListener('change', function () {
  options.lowercases = this.checked
  updateCharPool()
  updateSubmitButton()
})

document.getElementById('symbols').addEventListener('change', function () {
  options.symbols = this.checked
  updateCharPool()
  updateSubmitButton()
})

document.getElementById('similars').addEventListener('change', function () {
  options.similars = this.checked
  updateCharPool()
  updateSubmitButton()
})

document.getElementById('submit-btn').addEventListener('click', generatesRandomPassword)

function generatesRandomPassword() {
  // Create an empty array to store the generated characters
  const passwordCharacters = [];

  // Loop through the desired password length
  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    // Step 1: Get the length of the character pool
    const charPoolLength = charPool.length;

    // Step 2: Generate a random index based on the length of the character pool
    const randomIndex = Math.floor(Math.random() * charPoolLength);

    // Step 3: Use the random index to select a character from the character pool
    const randomCharacter = charPool[randomIndex];
    passwordCharacters.push(randomCharacter);
  }

  // Combine all characters into a single string to form the password
  const randomPassword = passwordCharacters.join('');

  // Display the generated password
  showResult(randomPassword);
}

function updateCharPool() {
  charPool = ''
  if (options.similars) { // if true, we don't include similar characters
    if (options.numbers) { charPool += numbersNoSimilar }
    if (options.uppercases) { charPool += upperCasesNoSimilar }
    if (options.lowercases) { charPool += lowerCasesNoSimilar }
    if (options.symbols) { charPool += symbolsNoSimilar }
  } else {
    if (options.numbers) { charPool += numbers }
    if (options.uppercases) { charPool += upperCases }
    if (options.lowercases) { charPool += lowerCases }
    if (options.symbols) { charPool += symbols }
  }
}

// Deactivate the generate button if the charPool is empty
function updateSubmitButton() {
  if (
    !options.numbers
    && !options.uppercases
    && !options.lowercases
    && !options.symbols
  ) {
    document.getElementById('submit-btn').classList.add('inactive')
  } else {
    document.getElementById('submit-btn').classList.remove('inactive')
  }
}

function showResult(randomPassword) {
  document.getElementById('password').value = randomPassword
}

function copyPassword(password) {
  document.getElementById(password).select()
  document.execCommand('Copy')
}