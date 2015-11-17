var game;
var titleScene;
var ctx;
var canvas;
var sceneManager;
function main()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	console.log("Main run")
	game = new Game();
	sceneManager = new SceneManager;
	game.gameLoop();
	//window.addEventListener("click", sceneManager.nextScene);
	window.addEventListener("click", menuScene.startGame);
	window.addEventListener("click", playingScene.pauseGame);
	window.addEventListener("click", playingScene.killGame);
	window.addEventListener("click", pauseScene.resumeGame);
	window.addEventListener("click", pauseScene.goToQuitScene);
	window.addEventListener("click", gameOverScene.retryGame);
	window.addEventListener("click", gameOverScene.goToQuitScene);
	window.addEventListener("click", quitScene.goBackToPause);
	window.addEventListener("click", quitScene.quitToTitle);
}