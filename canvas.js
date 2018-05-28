var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');


//keeps canvas sized correctly to cardfelt container
fitToContainer(canvas);
function fitToContainer() {
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

//stores value of mouse's current x and y coordinates
var mouse = {
  x: undefined,
  y: undefined
}

//changes size of canvas when window changes size
window.addEventListener('resize',
  function(event){
    fitToContainer(canvas);
    drawAll();
  })


//updates mouse's x and y coordinates when the user moves their mouse
// to coordinates of mouse on canvas
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x - .025 * window.innerWidth;;
    mouse.y = event.y - 70;
    // console.log(mouse)
  })


window.addEventListener('click',
  function(event) {
    //console.log(mouse);

    //if user clicks on bonepile
    if((mouse.x > canvas.width/2 - (bonepile.width)/2) && (mouse.y > 200) && (mouse.x < canvas.width/2 + (bonepile.width)/2) && (mouse.y < 200 + bonepile.height)){

      if(dominosArr.length >= 1){
        userHand.push(dominosArr.pop());
        drawUserHand();
        drawBonePile();
      }else{
        alert('bonepile is empty');
      }
    }

    //if user clicks on a domino in hand
    //select the domino
    for(i=0; i<userHand.length; i++){
      let dom = userHand[i];
      if(mouse.x > dom.leftB && mouse.x < dom.rightB && mouse.y > dom.topB && mouse.y < dom.bottomB){
        selectedDom = dom;
        selectedIndex = i;
        drawSelectedDom();
      }
    }

    // if user clicks on a train and has a domino selected
    if(selectedDom !== undefined){
      for(i=0; i<trainsArr.length; i++){
        let train = trainsArr[i];
        if(mouse.x > train.leftB && mouse.x < train.rightB && mouse.y > train.topB && mouse.y < train.bottomB){
          console.log(train);
          if(train.addDomino(selectedDom)){
            drawAll();
          }
        }
      }
    }


    //if user double clicks on a domino in hand
    //flip the domino upside down



  });

//draws starting double at top of canvas
function drawStartDub(){
  var dubImage = new Image();
  dubImage.src = "assets/dominos/0-0_sideways.png";
  dubImage.onload = function() {
    c.drawImage(dubImage, (canvas.width/2 - (dubImage.width)/2), 0, dubImage.width, dubImage.height);

    c.font = "35px Arial";
    c.textAlign = "center";
    c.fillText(startDub.values[0], canvas.width/2 - (dubImage.width)/4, 40);
    c.fillText(startDub.values[1], canvas.width/2 + (dubImage.width)/4, 40);
  }
}

//creates bonepile domino with count of remaining dominos in bonepile
var bonepile = new Image();
function drawBonePile(){
  bonepile.src = "assets/dominos/back.png";
  bonepile.onload = function() {
    c.drawImage(bonepile, (canvas.width/2 - (bonepile.width)/2), 200, bonepile.width, bonepile.height);

    c.font = "40px Arial";
    if(dominosArr.length > 99){
      c.font = "28px Arial";
    }

    c.textAlign = "center";
    c.fillText(dominosArr.length, canvas.width/2, 270);
  }
}

var selectImage = new Image();
function drawSelectedDom(){
  if(selectedDom !== undefined){
    selectImage.src = "assets/dominos/0-0.png";
    selectImage.onload = function() {
      c.drawImage(selectImage, 10, 550);
      c.font = "35px Arial";
      c.textAlign = "center";
      c.fillText(selectedDom.values[0], 35, 590);
      c.fillText(selectedDom.values[1], 35, 640);
    }

  }
}

//this took a long time because I didn't know what closures were
//this little block took me hours to write
var handImgs = [];
function drawUserHand(){
  for(i=0; i<userHand.length; i++){

    (function (i) {
      var xPos = ((i * 55) + 10);
      var yPos = 700;
      handImgs[i] = new Image();
      handImgs[i].src = "assets/dominos/0-0.png";
      handImgs[i].onload = function () {
          c.drawImage(handImgs[i], xPos, yPos);
          c.font = "35px Arial";
          c.textAlign = "center";
          c.fillText(userHand[i].values[0], xPos + 25, 740);
          c.fillText(userHand[i].values[1], xPos + 25, 790);

          //update boundaries of domino
          userHand[i].setBounds(xPos, yPos, xPos + handImgs[i].width, yPos + handImgs[i].height);

      };
    })(i);

  }
}

//draws the trains
var trainImgs = new Array();
function drawTrains(){

  for(i=0; i<trainsArr.length; i++){

      (function (i) {

        trainImgs[i] = new Image();
        trainImgs[i].src = trainsArr[i].imgName;

        var xPos;
        var yPos;

        trainImgs[i].onload = function () {

          xPos = ((1 + (i * 2)) * ((canvas.width)/(2 * trainsArr.length))) - trainImgs[i].width/2;
          yPos = 0;

          c.drawImage(trainImgs[i], xPos, yPos);
          trainsArr[i].setBounds(xPos, yPos, xPos + trainImgs[i].width, trainImgs[i].height);

          drawTrainOfDominos(trainsArr[i], i);
        };

        // for(j=0; j<trainsArr[i].dominos.length; j++){
        //
        //   trainDominoImgs[i][j] = new Image();
        //   trainDominoImgs[i][j].src = trainsArr[i].dominos[j].imgName;
        //
        //   trainDominoImgs[i][j].onload = function() {
        //     yPos += trainDominoImgs[i][j].height;
        //     c.drawImage(trainDominoImgs[i][j], xPos, yPos);
        //
        //     //updateBouds
        //     trainsArr[i].dominos[j].setBounds(xPos, yPos, xPos + trainDominoImgs[i][j].width, yPos + trainDominoImgs[i][j].height);
        //
        //     //add numbers
        //     c.font = "35px Arial";
        //     c.textAlign = "center";
        //     c.fillText(trainsArr[i].dominos[j].values[0], xPos + trainDominoImgs[i][j].width/2, yPos + 40);
        //     c.fillText(trainsArr[i].dominos[j].values[1], xPos + trainDominoImgs[i][j].width/2, yPos + 90);

          // }
        // }


      })(i);

  }
}

//returns 2D array with rows # of empty arrays inside
function build2DArr(rows){
  var arr = new Array();

  for(i=0; i<rows; i++){
    arr[i] = [];
  }

  return arr;
}

var trainDominoImgs = build2DArr(trainsArr.length);

function drawTrainOfDominos(train, index){

  //loop through every dominos in train's list of dominos
  for(i=0; i<train.dominos.length; i++){

    //declare location for domino image to be drawn
    var trainxPos = train.leftB + (train.rightB - train.leftB)/2;
    var xPos;
    var yPos = train.bottomB;

    var unCollapse = false;

    (function (i) {

      //create a new image in the image array
      trainDominoImgs[index][i] = new Image();

      //sets image for doubles dominos to be sideways
      if(train.dominos[i].values[0] === train.dominos[i].values[1]){
        train.dominos[i].imgName = "assets/dominos/0-0_sideways.png";
      }

      trainDominoImgs[index][i].src = train.dominos[i].imgName;

      trainDominoImgs[index][i].onload = function() {

        if(i === 0 && train.dominos.length > 5){

          var collapsed = new Image();
          collapsed.src = "assets/collapsed.png";

          yPos = train.bottomB;
          xPos = trainxPos - collapsed.width/2;

          c.drawImage(collapsed, xPos, yPos);

          yPos += collapsed.height;

          unCollapse = true;
        }

        //only draws dominos from the end of train
        if(i - train.dominos.length + 5 >= 0){

          //adds height of previous image to yPosition unless it is the first image
          // or the first image after being collapsed
          if(i>0 && !unCollapse){
            yPos += trainDominoImgs[index][i-1].height;
          }

          xPos = trainxPos - trainDominoImgs[index][i].width/2;

          //turns off uncollapse for subsequent dominos
          if(unCollapse){
            unCollapse = false;
          }

          c.drawImage(trainDominoImgs[index][i], xPos, yPos);

          //updateBouds
          train.dominos[i].setBounds(xPos, yPos, xPos + trainDominoImgs[index][i].width, yPos + trainDominoImgs[index][i].height);

          //add numbers
          c.font = "35px Arial";
          c.textAlign = "center";

          //for normal dominos
          if(train.dominos[i].imgName === "assets/dominos/0-0.png"){
            c.fillText(train.dominos[i].values[0], xPos + trainDominoImgs[index][i].width/2, yPos + 40);
            c.fillText(train.dominos[i].values[1], xPos + trainDominoImgs[index][i].width/2, yPos + 90);
          }

          //for doubles
          else{
            c.fillText(train.dominos[i].values[0], xPos + trainDominoImgs[index][i].width/4, yPos + 40);
            c.fillText(train.dominos[i].values[1], xPos + 3 * trainDominoImgs[index][i].width/4, yPos + 40);
          }
        }


      }
    })(i);
  }
}


//clears canvas then redraws with updated images
function drawAll(){

  c.clearRect(0,0, canvas.width, canvas.height);
  drawStartDub();
  drawUserHand();
  drawBonePile();
  drawTrains();
  drawSelectedDom();
}

drawAll();
