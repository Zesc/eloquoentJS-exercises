/*jshint esversion: 6 */

/* Chapter 3 Exercises*/
// Minimum function

function min(numb1, numb2) {
  return (numb1 < numb2) ? numb1 : numb2;
}

console.log(min(0,10));
console.log(min(100,10));
console.log("\n");
// Recursion
function isEven (numb) {
  if(numb === 0) return true;
  else if (numb === 1) return false;
  else if (numb < 0) return isEven(-numb);
  else return isEven(numb -2);
}

console.log(isEven(50)); // → true
console.log(isEven(75)); // → false
console.log(isEven(-1)); // → false
console.log("\n");

// Beam Counting
function countBs1(str) {
  let ans = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "B") ans += 1;
  }
  return ans;
}

function countChar (phrase, target) {
  let ans = 0;
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === target) ans += 1;
  }
  return ans;
}

//better version of countBs
function countBs(str) {
  return countChar(str, "B");
}

// Test code
// console.log(countBs1("BBsf")); // -> 2
// console.log(countChar("BBsf", "B")); // -> 2
// console.log(countBs("BBsf")); // -> 2

/* Chapter 4: Exercises */
// The sum of the range

const range = (start, end, step = 1) => {
  let array = [];
  if(step < 0) {
  	for(let i = start; i >= end; i += step) array.push(i);
  }
  else {
  	for(let i = start; i <= end; i += step) array.push(i);
  }
  return array;
};

const sum = (array) => {
  let total = 0;
  for (let item of array) total += item;
  return total;
};

// console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(range(5, 2, -1)); // → [5, 4, 3, 2]
// console.log(sum(range(1, 10))); // → 55
// console.log('\n');

//Reversing an array

let mArray = ["a", "b", "c"];

const reverseArray = (array) =>  {
  let nArray = [];
  for(let i = array.length-1; i >= 0; i--) nArray.push(array[i]);
  return nArray;
};

let myArr = ["A", "B", "C"];

const reverseArrayInPlace = (array) => {
  let halfArrLength = Math.floor(array.length / 2);

  for(let i = 0; i <= halfArrLength; i ++) {
    let left = array[i];
    let right = array[array.length - 1 -i];
    array[i] = right;
    array[array.length - 1 - i] = left;
  }
  return array;
};

// console.log(reverseArrayInPlace(myArr));

/* A List */

let array1 = [1, 2, 3];

const arrayToList = (array) => {
  let list = {};

  if (array.length === 1) {
    list.value = array[0];
    list.rest = null;
  } else {
    list.value = array[0];
    list.rest = arrayToList(array.slice(1));
  }
  return list;
};

// console.log(arrayToList(array1));

let myObj = arrayToList(array1);

const listToArray = (list) => {
  let arr = [];

  if(list.rest === null) {
    arr.push(list.value);
  }
  else {
    arr.push(list.value);
    arr = arr.concat(listToArray(list.rest));
  }
  return arr;
};

// console.log(listToArray(myObj));

function prepend(element, list) {
  // let newList = {};
  // newList.value = element;
  // newList.rest = list;
  // return newList;
  // better version
  return {value: element, rest: list};
}

function nth(list, number) {
  //number is the key to check for

  if(number === 0 ) {
    return list.value;
  }
  else if(number > 0 && list.rest === null) {
    return undefined;
  }
  else {
    return nth(list.rest, number - 1);
  }
}

// console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
// console.log(nth(arrayToList([10, 20, 30]), 5));
// → 20

/* Deep Comparison */

let obj = {here: {is: "an"}, object: 2};

const deepEqual = (obj1, obj2) => {
  let obj1Keys = Object.keys(obj1);
  let obj1Values = Object.values(obj1);
  let obj2Keys = Object.keys(obj2);
  let obj2Values = Object.values(obj2);

  let objAreEqual = true;
  let counter = 0;

  while(counter < obj1Keys.length) {
    if(typeof obj1Values[counter] === 'object' && typeof obj2Values[counter] === 'object') {
      return deepEqual(obj1Values[counter], obj2Values[counter]);
    }
    else if(obj1Keys[counter] !== obj2Keys[counter]) {
      objAreEqual = false;
      break;
    }
    else if(obj1Values[counter] !== obj2Values[counter]) {
      objAreEqual = false;
      break;
    }
    counter += 1;
  }
  return objAreEqual;
};

// console.log(deepEqual(obj, obj));
// console.log(deepEqual(obj, {here: 1, object: 2}));
// console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));


/* Chapter 5: Exercises */

// Flattening

let arrays = [[1, 2, 3], [4, 5], [6]];

let flatArray = arrays.reduce((a, b) => a.concat(b));

// console.log(flatArray);

// Your Own Loop

function loop(val, test, update, body) {
  // recursive
  if (!test(val)) {
    return;
  }
  else {
    body(val);
    loop(update(val), test, update, body);
  }
  // looping
  // for(let x = val; test(x); x = update(x)) {
  //   body(x);
  // }
}

// loop(3, n => n > 0, n => n - 1, console.log);

// Everything

function every(array, test) {
  // loop version
  // for(let item of array) {
  //   if(!test(item)) {
  //     return false;
  //   }
  // }

  // return true;

  // using some method
  if (array.length === 0) {
    return true;
  }
  else if (array.some(arr => test(arr))) {
    return every(array.slice(1), test);
  }
  else {
    return false;
  }
}

// console.log(every([1, 3, 5], n => n < 10));
// → true
// console.log(every([2, 4, 16], n => n < 10));
// → false
// console.log(every([], n => n < 10));
// → true

// Dominant Writing Direction (refactor code)

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName){
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let scripts = [];

  for (let letter of text) {
    if(characterScript(letter.charCodeAt()) !== null) {
      scripts.push(characterScript(letter.charCodeAt()));
    }
  }

  let directionCount = countBy(scripts, script => script.direction);
  let ans;
  let current = 0;

  for(let item of directionCount) {
    if (current < item.count) {
      current = item.count;
      ans = item;
    }
  }

  return ans.name;
}

/*
  This examples wont run in this ecosystem
  because I'm missing the SCRIPT data set.
  Go to eloquoent javacript code sandboxa,
  copy/paste each function used here,
  select the right chapter and exercise and run the code.
*/

//console.log(dominantDirection("Hello!"));
// → ltr
//console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

/* Chapter 6 */

// A Vector Type

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector2) {
    return new Vec(this.x + vector2.x, this.y + vector2.y);
  }

  minus(vector2) {
    return new Vec(this.x - vector2.x, this.y - vector2.y);
  }

  get length() {
    return Math.sqrt((0 - this.x) ** 2 + (0 - this.y) ** 2);
  }
}

let myVector = new Vec(3, 4);

//console.log(myVector);

//myVector.length; //5
// console.log(new Vec(1,2).plus(new Vec(2, 3)));
// console.log(new Vec(1,2).minus(new Vec(2, 3)));

// Groups

class Group {
  constructor(){
    this.group = [];
  }

  add(value) {
    if(!this.has(value)) this.group.push(value);
  }

  delete(value) {
    if(this.has(value)) this.group = this.group.filter(element => element !== value);
  }

  has(value) {
    for (let v of this.group) {
      if(v === value) return true;
    }
    return false
  }

  static from(collection) {
    let group = new Group;
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

// Iterable Groups

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.group.length) {
      return {done: true};
    } else {
      let element = {value: this.group.group[this.position], done: false};
      this.position++;
      return element;
    }
  }
}

let group = Group.from([10 ,20 ,30]);

// console.log(group.delete(20));
//console.log(group);

// for(let value of group) {
//   console.log(value);
// }

// Borrowing a Method

let map = {one: true, two: true, hasOwnProperty: true};

//console.log(map.hasOwnProperty("one"))
// This will give you a TypeError: map.hasOwnProperty is not a function

//console.log(Object.prototype.hasOwnProperty.call(map, "hasOwnProperty"));
// → true

/*
Why this fix? call will take this a a first argument and will treat the rest of the elements as normal arguments.
In order words, call function will threat hasOwnProperty as map of the elements of map.
*/
