var playingScene;
var menuScene;
var gameOverScene;
var pauseScene;
var quitScene;
var ctx;
var ctx2;
var canvas;
var currentScene;
var scene;
function Game()
{
	playingScene = new PlayingScene();
	menuScene = new MenuScene();
	gameOverScene = new GameOverScene();
	pauseScene = new PauseScene();
	quitScene = new QuitScene();
	scene = new Scene();
}

function init()
{

}

Game.prototype.gameLoop = function()
{
	//console.log("Game looping.")
	window.requestAnimationFrame(game.gameLoop);
	game.draw();
}

Game.prototype.draw = function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	scene.renderScene();
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