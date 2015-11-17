
var ctx;
var canvas;
var retryButtonImg = new Image();
var quitButtonImg = new Image();
var retryButtonX;
var retryButtonY;
var quitButtonX;
var quitButtonY;
function GameOverScene()
{
	retryButtonY = 50;
	quitButtonY = 150;
}

function initCanvas()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

GameOverScene.prototype.drawScene = function()
{
	console.log("Game Over Scene drawn")
	retryButtonImg.src = "RetryButton.png";
	quitButtonImg.src = "QuitButton.png";
	retryButtonX = Math.round(canvas.width/2 - retryButtonImg.width/2);
	quitButtonX = Math.round(canvas.width/2 - quitButtonImg.width/2);
	ctx.drawImage(retryButtonImg, retryButtonX, retryButtonY);
	ctx.drawImage(quitButtonImg, quitButtonX, quitButtonY);
}

GameOverScene.prototype.retryGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > retryButtonX && cursorX < retryButtonX + retryButtonImg.width && 
		cursorY > retryButtonY && cursorY < retryButtonY + retryButtonImg.height &&
		currentSceneNum == 3)
	{
		currentSceneNum = 1;
		gameOver = false;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

GameOverScene.prototype.goToQuitScene = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > quitButtonX && cursorX < quitButtonX + quitButtonImg.width && 
		cursorY > quitButtonY && cursorY < quitButtonY + quitButtonImg.height &&
		currentSceneNum == 3)
	{
		currentSceneNum = 4;
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