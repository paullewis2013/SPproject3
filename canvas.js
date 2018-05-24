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
    //console.log(mouse)
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
        userHand[i].flip();
        drawUserHand();
      }
    }


    //if user double clicks on a domino in hand
    //flip the domino upside down



  });

//draws starting double at top of canvas
function drawStartDub(){
  var dubImage = new Image();
  dubImage.src = "assets/dominos/0-0.png";
  dubImage.onload = function() {
    c.drawImage(dubImage, (canvas.width/2 - (dubImage.width)/2), 0, dubImage.width, dubImage.height);

    c.font = "35px Arial";
    c.textAlign = "center";
    c.fillText(startDub.values[0], canvas.width/2, 40);
    c.fillText(startDub.values[1], canvas.width/2, 90);
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
      c.font = "30px Arial";
    }

    c.textAlign = "center";
    c.fillText(dominosArr.length, canvas.width/2, 270);
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
var trainImgs = [];
function drawTrains(){

  console.log('drawTrains()');

  for(i=0; i<trains.length; i++){

    (function (i) {
      var xPos = ((1 + (i * 2)) * ((canvas.width)/(2 * trains.length)));

      trainImgs[i] = new Image();
      trainImgs[i].src = "assets/train.png";
      trainImgs[i].onload = function () {
        c.drawImage(trainImgs[i], xPos - trainImgs[i].width/2, 0);
      };

    })(i);

  }
}

//clears canvas then redraws with updated images
function drawAll(){

  console.log("drawAll()");

  c.clearRect(0,0, canvas.width, canvas.height);
  drawStartDub();
  drawUserHand();
  drawBonePile();
  drawTrains();
}

drawAll();
