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

var dubImage = new Image();
dubImage.src = "assets/dominos/0-0.png";
dubImage.onload = function() {
  c.drawImage(dubImage, (canvas.width/2 - (dubImage.width)/2), 0, dubImage.width, dubImage.height);

  c.font = "35px Arial";
  c.textAlign = "center";
  c.fillText(startDub.values[0], canvas.width/2, 40);
  c.fillText(startDub.values[1], canvas.width/2, 90);
}

//creates bonepile domino with count of remaining dominos in bonepile
var bonepile = new Image();
bonepile.src = "assets/dominos/back.png";
bonepile.onload = function() {
  c.drawImage(bonepile, (canvas.width/2 - (bonepile.width * 0.2)/2), 200, bonepile.width * 0.2, bonepile.height * 0.2);

  c.font = "40px Arial";
  if(dominosArr.length > 99){
    c.font = "30px Arial";
  }

  c.textAlign = "center";
  c.fillText(dominosArr.length, canvas.width/2, 275);
}

//this took a long time because I didn't know what closures were
//this little block took me hours to write
var handImgs = [];

function drawUserHand(){
  for(i=0; i<userHand.length; i++){

    (function (i) {
      var xPos = ((i * 50) + 10);
      handImgs[i] = new Image();
      handImgs[i].src = "assets/dominos/0-0.png";
      handImgs[i].onload = function () {
          c.drawImage(handImgs[i], xPos, 700);
          c.font = "35px Arial";
          c.textAlign = "center";
          c.fillText(userHand[i].values[0], xPos + 25, 740);
          c.fillText(userHand[i].values[1], xPos + 25, 790);

      };
    })(i);

  }
}

drawUserHand();

// var dots = new Image();
// dots.src = "assets/dominos/5.png";
// dots.onload = function() {
//   c.drawImage(dots, 110, 110, img1.width * 0.15, (img1.height * 0.15)/2);
// }

//draws rectangles
// c.fillRect(0, 0, canvas.width*.4, 100);
// c.fillRect(canvas.width* 0.6, 0, canvas.width*0.4, 100);
