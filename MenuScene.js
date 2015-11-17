
var ctx;
var canvas;
var titleImg = new Image();
var startButtonImg = new Image();
var backgroundImg = new Image();
var titleBgScaleX;
var titleBgScaleY;
var startButtonX;
var startButtonY;
var currentSceneNum;
var menu = new MenuScene();
function MenuScene()
{
	startButtonY = 100;
}

function initCanvas()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

MenuScene.prototype.drawScene = function()
{
	titleImg.src = "TreasureDefendTitle.png";
	startButtonImg.src = "StartGameButton.png";
	backgroundImg.src = "BackgroundTemp.jpeg";
	titleX = Math.round(canvas.width/2 - titleImg.width/2);
	startButtonX = Math.round(canvas.width/2 - startButtonImg.width/2);
	ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(titleImg, titleX, 0);
	ctx.drawImage(startButtonImg, startButtonX, startButtonY);
	console.log("Title Scene drawn")
}

MenuScene.prototype.startGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > startButtonX && cursorX < startButtonX + startButtonImg.width && 
		cursorY > startButtonY && cursorY < startButtonY + startButtonImg.height &&
		currentSceneNum == 0)
	{
		currentSceneNum = 1;
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