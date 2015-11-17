var ctx;
var canvas;
var sceneArray = 
["Main Menu Scene", 
"Playing Scene", 
"Game Over Scene"];
var currentSceneText;
var currentSceneNum = 0;
var gameOver = false;
var titleImg = new Image();
var titleX;
var titleY;
var playingScene;
var menuScene;
var pauseScene;
var gameOverScene;
var quitScene;
function Scene()
{
	
}

function initCanvas()
{
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

Scene.prototype.startScene = function()
{

}

Scene.prototype.stopScene = function()
{
	ctx.clearRect(0, 0, 500, 500);
}

Scene.prototype.renderScene = function()
{
	
	if (currentSceneNum == 0)
		menuScene.drawScene();
	if (currentSceneNum == 1)
		playingScene.drawScene();
	if (currentSceneNum == 2)
		pauseScene.drawScene();
	if (currentSceneNum == 3)
		gameOverScene.drawScene();
	if (currentSceneNum == 4)
		quitScene.drawScene();
}

Scene.prototype.update = function()
{
	
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