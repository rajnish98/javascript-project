const countValue = document.querySelector('#counter');
// const countValue = document.getElementById('counter');

const increment = () => {
// set the value from UI
  let value  = parseInt(countValue.innerText);
// Update the value 
  value= value + 1;
// get the value onto UI
countValue.innerText = value;

};

const decrement = () => {
  // set the value from UI
  let value  = parseInt(countValue.innerText);
// Update the value 
  value= value - 1;
// get the value onto UI
countValue.innerText = value;

}