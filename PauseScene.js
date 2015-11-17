
var ctx;
var canvas;
var resumeButtonImg = new Image();
var quitButtonImg = new Image();
var resumeButtonX;
var resumeButtonY;
var quitButtonX;
var quitButtonY;
var bgScaleX;
var bgImg = new Image();
function PauseScene()
{
	resumeButtonY = 50;
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

PauseScene.prototype.drawScene = function()
{
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "italic 40pt Calibri";
	ctx.textBaseline = "top";
	ctx.fillText("This is the pause scene.", 0, 0);
	ctx.restore();
	console.log("Pause Scene drawn")
	resumeButtonImg.src = "ResumeGameButton.png";
	quitButtonImg.src = "QuitButton.png";
	bgImg.src = "BackgroundPlayingTemp.jpg"
	resumeButtonX = Math.round(canvas.width/2 - resumeButtonImg.width/2);
	quitButtonX = Math.round(canvas.width/2 - quitButtonImg.width/2);
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(resumeButtonImg, resumeButtonX, resumeButtonY);
	ctx.drawImage(quitButtonImg, quitButtonX, quitButtonY);
}

PauseScene.prototype.resumeGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > resumeButtonX && cursorX < resumeButtonX + resumeButtonImg.width && 
		cursorY > resumeButtonY && cursorY < resumeButtonY + resumeButtonImg.height &&
		currentSceneNum == 2)
	{
		currentSceneNum = 1;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

PauseScene.prototype.goToQuitScene = function(e)
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > quitButtonX && cursorX < quitButtonX + quitButtonImg.width && 
		cursorY > quitButtonY && cursorY < quitButtonY + quitButtonImg.height &&
		currentSceneNum == 2)
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