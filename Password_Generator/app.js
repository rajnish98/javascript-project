const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".GenerateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// ste strength circle color to grey

// set passwordLength
function handleSlider() { //handleslider function used to reflect the password on ui
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber() {
  return getRndInteger(0, 9);

}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));

}

function generateupperCase() {
  return String.fromCharCode(getRndInteger(65, 91));

}

function generateSymbol() {
  const randNom = getRndInteger(0, symbol.length);
  return symbol.charAt(randNom);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNumber = true;
  if (symbolsCheck.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";

  }
  catch (e) {
    copyMsg.innerText = "Failed";
  }

  // to make copy span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  },2000);

}

function shufflePassword(array){
  // Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
   }
   let str = "";
   array.forEach((el) => 
    (str += el))
    return str;


}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkBox) => {
    if (checkBox.checked)
      checkCount++;
  });

  // special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value)
    copyContent();
});

generateBtn.addEventListener('click', () => {
  // none of the checkbox are selected

  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // let's start the journey to find new password
  console.log("strarting the journey");

  // remove old password
  password = "";

  // let put the stuff mentioned by checkboxes

  // if (uppercaseCheck.checked) {
  //   password += generateupperCase();
  // }

  // if (uppercaseCheck.checked) {
  //   password += generateLowerCase();
  // }

  // if (numbersCheck.checked) {
  //   password += generateRandomNumber();
  // }

  // if (symbolsCheck.checked) {
  //   password += generateSymbol();
  // }

  let funArr = [];

  if (uppercaseCheck.checked)
    funArr.push(generateupperCase);

  if (lowercaseCheck.checked)
    funArr.push(generateLowerCase);

  if (numbersCheck.checked)
    funArr.push(generateRandomNumber);

  if (symbolsCheck.checked)
    funArr.push(generateSymbol);

  
  // compulsory addition
  for(let i = 0; i<funArr.length; i++ ){
    password += funArr[i]();
  }
  console.log("compulasrty addition done");
  // remainng addition
  for(let i = 0; i<passwordLength-funArr.length; i++ ){
    let randIndex = getRndInteger(0, funArr.length);
    console.log("randIndex" + randIndex);
    password += funArr[randIndex]();
  }
  console.log("remaing additoin done");

  // shuffle the password

  password = shufflePassword(Array.from(password));
  console.log("shuffling done");

  // show the UI

  passwordDisplay.value = password;
  console.log("UI addition done");

// calculate strength
calcStrength();


});