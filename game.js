

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function Domino(value1, value2) {
  this.values = [value1, value2];
  //needs an image attribute
  this.imgName = "assets/dominos/0-0.png";
  this.leftB = undefined;
  this.rightB = undefined;
  this.topB = undefined;
  this.bottomB = undefined;
}
Domino.prototype.toString = function() {
  return "" + this.values[0] + "|" + this.values[1];
}
Domino.prototype.flip = function() {
  let temp = this.values[0];
  this.values[0] = this.values[1];
  this.values[1] = temp;
}
Domino.prototype.setBounds = function(leftB, topB, rightB, bottomB) {
  this.leftB = leftB;
  this.topB = topB;
  this.rightB = rightB;
  this.bottomB = bottomB;
}

var dominosArr = new Array();
var userHand = new Array();
var defaultStartDub = true;
var startDub;

var train1 = [];
var train2 = [];
var train3 = [];
var train4 = [];
var trains = [train1, train2, train3, train4];

//some number greater than 0 less than 19
//sets range of domino dot values
var maxNum = 6

// sets size of starting hand
var handSize = 15;

function newGame() {



  //populate array with full set of dominos
  for(i = 0; i < maxNum; i++){
    for(j = i; j < maxNum; j++){
      dominosArr.push(new Domino(i, j));
    }
  }
  if(defaultStartDub){
    startDub = dominosArr.pop();
  }

  //now shuffle the array of dominos to random order (Fisher-Yates algorithm)
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  dominosArr = shuffle(dominosArr);

  //fills players hand
  for(i=0; i<handSize; i++){
    userHand.push(dominosArr.pop());
  }

  //fill computer players hands here eventually
  //code here

  //print out dominos
  // for(i=0; i<userHand.length; i++){
  //   console.log(userHand[i].toString());
  // }


}

newGame();


