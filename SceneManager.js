var sceneList = [
		"main_menu_screen",
		"playing_screen",
		"game_over_screen",
		"pause_screen"
];
var scene;
function SceneManager()
{
	
}

SceneManager.prototype.addScene = function(scene)
{

}

SceneManager.prototype.goToScene = function(title)
{
	
}

SceneManager.prototype.nextScene = function()
{
	if (currentSceneNum < 4)
	{
		currentSceneNum = currentSceneNum + 1;
	}
	if (currentSceneNum == 4)
	{
		currentSceneNum = 0;
	}
	console.log("Next scene.")
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
}
