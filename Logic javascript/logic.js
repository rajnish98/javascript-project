function abc() {
  console.log(abc.xyz);
}
abc()
abc.xyz = 400;
abc.xyz = 200;
abc()

// event propgation 

const number = [1, 2, 3, 4]
number[100] = 500
console.log(number);

