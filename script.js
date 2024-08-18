// Define options for generating the password
const options = {
  numbers: true,
  uppercases: true,
  lowercases: true,
  symbols: true,
  similars: false
}

// Define character sets
const numbers = '1234567890';
const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCases = 'abcdefghijklmnopqrstuvwxyz';
const symbols = '!?#$%&*+-=';

// Character sets without similar characters (to avoid confusion)
const numbersNoSimilar = '2345679';
const upperCasesNoSimilar = 'ACDEFGHJKLMNPRSTUVWXYZ';
const lowerCasesNoSimilar = 'abcdefghijkmnopqrstuvwxyz';
const symbolsNoSimilar = '?#$%&*+-=';

// Desired password length
const passwordLength = 20;

// Variable to store the current range of characters used for generating passwords
let characterRange = numbers + upperCases + lowerCases + symbols;

// Update the character range based on user options.
const updatecharacterRange = () => {
  characterRange = ''; // Reset the character range

  if (options.similars) { // If similar characters are excluded
    if (options.numbers) { characterRange += numbersNoSimilar; }
    if (options.uppercases) { characterRange += upperCasesNoSimilar; }
    if (options.lowercases) { characterRange += lowerCasesNoSimilar; }
    if (options.symbols) { characterRange += symbolsNoSimilar; }
  } else {
    if (options.numbers) { characterRange += numbers; }
    if (options.uppercases) { characterRange += upperCases; }
    if (options.lowercases) { characterRange += lowerCases; }
    if (options.symbols) { characterRange += symbols; }
  }
}

// Update the state of the generate button based on selected options.
const updateSubmitButton = () => {
  const submitButton = document.getElementById('submit-btn');
  
  // If no options are selected, disable the button
  if (
    !options.numbers
    && !options.uppercases
    && !options.lowercases
    && !options.symbols
  ) {
    submitButton.classList.add('inactive');
  } else {
    submitButton.classList.remove('inactive');
  }
}

// Display the generated password in the input field.
const showResult = (randomPassword) => {
  document.getElementById('password').value = randomPassword;
}

// Copy the password to the clipboard.
const copyPassword = (password) => {
  document.getElementById(password).select();
  document.execCommand('Copy');
}

// Generate a random password based on the current character range and length.
const generatesRandomPassword = () => {
  // Array to hold the generated characters
  const passwordCharacters = [];

  // Generate characters until the desired password length is reached
  for (let i = 0; i < passwordLength; i++) {
    // Get a random index from the character range
    const characterRangeLength = characterRange.length;
    const randomIndex = Math.floor(Math.random() * characterRangeLength);

    // Add the random character to the password array
    const randomCharacter = characterRange[randomIndex];
    passwordCharacters.push(randomCharacter);
  }

  // Join all characters to form the final password
  const randomPassword = passwordCharacters.join('');

  // Display the generated password
  showResult(randomPassword);
}

// Event listeners for checkbox changes to update options and button state
document.getElementById('numbers').addEventListener('change', function () {
  options.numbers = this.checked;
  updatecharacterRange();
  updateSubmitButton();
});

document.getElementById('uppercases').addEventListener('change', function () {
  options.uppercases = this.checked;
  updatecharacterRange();
  updateSubmitButton();
});

document.getElementById('lowercases').addEventListener('change', function () {
  options.lowercases = this.checked;
  updatecharacterRange();
  updateSubmitButton();
});

document.getElementById('symbols').addEventListener('change', function () {
  options.symbols = this.checked;
  updatecharacterRange();
  updateSubmitButton();
});

document.getElementById('similars').addEventListener('change', function () {
  options.similars = this.checked;
  updatecharacterRange();
  updateSubmitButton();
});

// Event listener for the generate password button
document.getElementById('submit-btn').addEventListener('click', generatesRandomPassword);