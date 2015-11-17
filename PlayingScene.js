
var ctx;
var canvas;

var dieButtonImg = new Image();
var pauseButtonImg = new Image();
var bgPlayingImg = new Image();
var playerImg = new Image();
var mummyImg = new Image();
var chestImg = new Image();

var playerFrame;
var enemyFrameX
var enemyFrameY;

var dieButtonX;
var dieButtonY;
var pauseButtonX;
var pauseButtonY;

var playerX;
var playerY;
var enemyArrayX = [40, 370, 370, 720];
var enemyArrayY = [270, 50, 520, 270];
var enemyDirectionX = [192, 0, 0, 192];
var enemyDirectionY = [80, 80, 0, 0];	// Coordinates for sprites. 0,0 = Up; 192,0 = Left; 0,80 = Down; 192,80 = Right

function PlayingScene()
{
	
	dieButtonX = 800;
	dieButtonY = 0;
	pauseButtonX = 0;
	pauseButtonY = 0;
	playerFrame = 0;
	enemyFrameX = 0;
	enemyFrameY = 0;
	playerX = 200;
	playerY = 300;
	playerImg.src = "PlayerSprite.png"
	bgPlayingImg.src = "Room1bg.png";
	dieButtonImg.src = "DieButton.png";
	pauseButtonImg.src = "PauseButton.png";
	mummyImg.src = "MummySprite.png";
	chestImg.src = "Chest.png";
}

PlayingScene.prototype = new Scene();

function initCanvas()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

PlayingScene.prototype.drawScene = function()
{
	playerFrame++;
	enemyFrameX++;
	if (playerFrame >= 4)
		playerFrame = 0;
	if (enemyFrameX >= 4 && enemyFrameY == 0)
	{
		enemyFrameX = 0;
		enemyFrameY = 1;
	}
	if (enemyFrameX >= 3 && enemyFrameY == 1)
	{
		enemyFrameX = 0;
		enemyFrameY = 0;
	}
	console.log("Playing Scene drawn")
	

	ctx.drawImage(bgPlayingImg, 0, 0, 800, 600);
	ctx.drawImage(chestImg, 370, 270);
	//(Image, StartClippingX, StartClippingY, ClipWidth, ClipHeight, xPosition, yPosition, widthOfImage, heightOfImage)
	ctx.drawImage(playerImg, playerFrame * 22, 0, 22, 44, playerX, playerY, 22, 44);
	for (var i = 0; i <= 4; i++)
	{
		ctx.drawImage(mummyImg, enemyDirectionX[i] + (enemyFrameX * 48), enemyDirectionY[i] + (enemyFrameY * 40), 48, 40, enemyArrayX[i], enemyArrayY[i], 48, 40); //MummyUp
	}
	//ctx.drawImage(mummyImg, playerFrameX * 48, 40, 48, 40, playerX, playerY, 96, 80);
	ctx.drawImage(pauseButtonImg, pauseButtonX, pauseButtonY);
	ctx.drawImage(dieButtonImg, dieButtonX, dieButtonY);
}

PlayingScene.prototype.pauseGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > pauseButtonX && cursorX < pauseButtonX + pauseButtonImg.width && 
		cursorY > pauseButtonY && cursorY < pauseButtonY + pauseButtonImg.height &&
		currentSceneNum == 1)
	{
		currentSceneNum = 2;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

PlayingScene.prototype.killGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > dieButtonX && cursorX < dieButtonX + dieButtonImg.width && 
		cursorY > dieButtonY && cursorY < dieButtonY + dieButtonImg.height &&
		currentSceneNum == 1)
	{
		currentSceneNum = 3;
		gameOver = true;
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