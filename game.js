

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function Domino(value1, value2) {
  this.values = new Array(value1, value2);
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
Domino.prototype.getLastVal = function(){
  return this.values[1];
}

var dominosArr = new Array();
var userHand = new Array();
var defaultStartDub = true;
var startDub;
var maxTrains = 8;
var selectedDom = undefined;
var selectedIndex = undefined;

function Train(){
  this.dominos = [];
  this.imgName = "assets/train.png";
  this.leftB = undefined;
  this.rightB = undefined;
  this.topB = undefined;
  this.bottomB = undefined;
  this.lastVal = undefined;
}
Train.prototype.setBounds = function(leftB, topB, rightB, bottomB) {
  this.leftB = leftB;
  this.topB = topB;
  this.rightB = rightB;
  this.bottomB = bottomB;
}
Train.prototype.updateLastVal = function(){

  if(this.dominos.length === 0){
    this.lastVal = startDub.values[0];
  }else{
    this.lastVal = this.dominos[this.dominos.length - 1].getLastVal();
    console.log("this.dominos =" + this.dominos);
  }
}
Train.prototype.addDomino = function(dom){

  this.updateLastVal();

  if(dom.values[0] === this.lastVal){
    //add
    console.log('add');

    this.dominos = this.dominos.concat(userHand.splice(selectedIndex, 1));

    //deselects domino after adding it
    selectedDom = undefined;
    selectedIndex = undefined;

    return true;
  }

  else if(dom.values[1] === this.lastVal){
    //flip
    userHand[selectedIndex].flip();


    //then add
    console.log('flip then add');

    this.dominos = this.dominos.concat(userHand.splice(selectedIndex, 1));

    //deselects domino after adding it
    selectedDom = undefined;
    selectedIndex = undefined;

    return true;
  }else{
    //dont add
    console.log('no add');
    console.log(this.lastVal);

    return false;
  }
}

var trainsArr = new Array();
for(i=0; i<maxTrains; i++){
  trainsArr.push(new Train());
}


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


