
var ctx;
var canvas;
var areYouSureImg = new Image();
var yesButtonImg = new Image();
var noButtonImg = new Image();
var bgImg = new Image();
var areYouSureTextX;
var areYouSureTextY;
var yesButtonX;
var yesButtonY;
var noButtonX;
var noButtonY;
var titleBgScaleX;
function QuitScene()
{
	areYouSureTextY = 50;
	yesButtonY = 250;
	noButtonY = 450;
}

function initCanvas()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

QuitScene.prototype.drawScene = function()
{
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "italic 40pt Calibri";
	ctx.textBaseline = "top";
	ctx.restore();
	console.log("Quit Scene drawn")
	bgImg.src = "BackgroundTemp.jpeg";
	areYouSureImg.src = "AreYouSureText.png";
	yesButtonImg.src = "YesButton.png";
	noButtonImg.src = "NoButton.png";
	areYouSureTextX = Math.round(canvas.width/2 - areYouSureImg.width/2);
	yesButtonX = Math.round(canvas.width/2 - yesButtonImg.width/2);
	noButtonX = Math.round(canvas.width/2 - noButtonImg.width/2);
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(areYouSureImg, areYouSureTextX, areYouSureTextY);
	ctx.drawImage(yesButtonImg, yesButtonX, yesButtonY);
	ctx.drawImage(noButtonImg, noButtonX, noButtonY);
}

QuitScene.prototype.quitToTitle = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > yesButtonX && cursorX < yesButtonX + yesButtonImg.width && 
		cursorY > yesButtonY && cursorY < yesButtonY + yesButtonImg.height &&
		currentSceneNum == 4)
	{
		currentSceneNum = 0;
		gameOver = false;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

QuitScene.prototype.goBackToPause = function(e)
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > noButtonX && cursorX < noButtonX + noButtonImg.width && 
		cursorY > noButtonY && cursorY < noButtonY + noButtonImg.height &&
		currentSceneNum == 4)
	{
		if (gameOver == false)
		{
			currentSceneNum = 2;
		}
		else if (gameOver == true)
		{
			currentSceneNum = 3;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

}

/*function for rgb for convenience*/
function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function*/
function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}