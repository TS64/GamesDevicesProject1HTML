
var ctx;
var ctx2;
var canvas;
var angle;

var dieButtonImg = new Image();
var pauseButtonImg = new Image();
var bgPlayingImg = new Image();
var playerImg = new Image();
var mummyImg = new Image();
var chestImg = new Image();
var circlePadOuterImg = new Image();
var circlePadImg = new Image();
var bulletImg = new Image();

var playerFrame;
var enemyFrameX
var enemyFrameY;

var dieButtonX;
var dieButtonY;
var pauseButtonX;
var pauseButtonY;
var circlePadX;
var circlePadY;
var circleDefaultX;
var circleDefaultY;
var circleCenterX;
var circleCenterY;
var maxDistance;
var clicked;
var movingPlayer;	// Prevents the circle pad being let go if the mouse moves too fast.
var angleInDegree;

var playerX;
var playerY;
var enemyArrayX = [40, 370, 370, 720];
var enemyArrayY = [270, 50, 520, 270];
var enemyDirectionX = [192, 0, 0, 192];
var enemyDirectionY = [80, 80, 0, 0];	// Coordinates for sprites. 0,0 = Up; 192,0 = Left; 0,80 = Down; 192,80 = Right
var bulletAlive = [false];
var bulletPosX = [0];
var bulletPosY = [0];
var bulletVelx = [0];
var bulletVely = [0];
var bulletFired = false;

function PlayingScene()
{
	angle = 0;
	dieButtonX = 800;
	dieButtonY = 0;
	pauseButtonX = 0;
	pauseButtonY = 0;
	playerFrame = 0;
	enemyFrameX = 0;
	enemyFrameY = 0;
	playerX = 200;
	playerY = 300;
	circleDefaultX = 42;
	circleDefaultY = 621.5;
	clicked = false;
	movingPlayer = false;
	maxDistance = 36;
	playerImg.src = "PlayerSprite.png";
	bgPlayingImg.src = "Room1bg.png";
	dieButtonImg.src = "DieButton.png";
	pauseButtonImg.src = "PauseButton.png";
	mummyImg.src = "MummySprite.png";
	chestImg.src = "Chest.png";
	circlePadOuterImg.src = "CirclePadOutline.png";
	circlePadImg.src = "CirclePad.png";
	bulletImg.src = "Bullet.png";
	circlePadX = 20 + circlePadOuterImg.width/2 - circlePadImg.width/2;
	circlePadY = 600 + circlePadOuterImg.height/2 - circlePadImg.height/2;
	circleCenterX = 66; circleCenterY = 645;
	for (var i = 0; i < 49; i++)
	{
		bulletAlive.push(false);
		bulletVelx.push(0);
		bulletVely.push(0);
		bulletPosX.push(0);
		bulletPosY.push(0);
	}
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
	
	for (var i = 0; i <= 4; i++)
	{
		ctx.drawImage(mummyImg, enemyDirectionX[i] + (enemyFrameX * 48), enemyDirectionY[i] + (enemyFrameY * 40), 
		48, 40, enemyArrayX[i], enemyArrayY[i], 48, 40); //MummyUp
	}
	ctx.drawImage(pauseButtonImg, pauseButtonX, pauseButtonY);
	ctx.drawImage(dieButtonImg, dieButtonX, dieButtonY);
	ctx.drawImage(circlePadOuterImg, 20, 600);
	ctx.drawImage(circlePadImg, circlePadX, circlePadY);
	//ctx.drawImage(playerImg, playerFrame * 22, 0, 22, 44, playerX, playerY, 22, 44);
	ctx.save();
	ctx.translate(playerX + 11, playerY + 22);
	ctx.rotate((90.0 + angle) * Math.PI/180.0);
	ctx.translate(-playerX - 11, -playerY - 22);
	ctx.drawImage(playerImg, playerFrame * 22, 0, 22, 44, playerX, playerY, 22, 44);
	ctx.restore();

	for (var i = 0; i < 50; i++)
	{
		if (bulletAlive[i] == true)
		{
			bulletPosX[i] += bulletVelx[i];
			bulletPosY[i] += bulletVely[i];
			ctx.drawImage(bulletImg, bulletPosX[i], bulletPosY[i], 8, 8);
		}
		if (bulletPosX[i] > 850 || bulletPosX[i] < -50 || bulletPosY[i] > 650 || bulletPosY[i] < -50)
			bulletAlive[i] = false;
	}
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

PlayingScene.prototype.movePlayer = function(e)
{
	//ctx2.rotate(20*Math.PI/180);
	//ctx2.drawImage(playerImg, playerFrame * 22, 0, 22, 44, playerX, playerY, 22, 44);
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (movingPlayer == true ||
		cursorX > circlePadX && cursorX < circlePadX + circlePadImg.width && 
		cursorY > circlePadY && cursorY < circlePadY + circlePadImg.height &&
		currentSceneNum == 1 && clicked == true)
	{
		if (Math.sqrt(((circlePadX - circleDefaultX) * (circlePadX - circleDefaultX)) + 		// If circlepad is held and cursor is
			((circlePadY - circleDefaultY) * (circlePadY - circleDefaultY))) <= maxDistance) 	// inside the circle
		{
			circlePadX = cursorX - 25; 	// Circlepad's center is at the cursor position
			circlePadY = cursorY - 22;
			movingPlayer = true;
		}
		if (Math.sqrt(((circlePadX - circleDefaultX) * (circlePadX - circleDefaultX)) + 	// If circlepad is held and cursor is
			((circlePadY - circleDefaultY) * (circlePadY - circleDefaultY))) > maxDistance) // outside the circle
		{
			dotProduct = (((circleCenterX + 10 - circleCenterX) * (cursorX - circleCenterX))
			 + ((circleCenterY - circleCenterY) * (cursorY - circleCenterY)));
			A = Math.sqrt(((circleCenterX + 10 - circleCenterX) * (circleCenterX + 10 - circleCenterX))
			 + ((circleCenterY - circleCenterY) * (circleCenterY - circleCenterY)));
			B = Math.sqrt(((cursorX - circleCenterX) * (cursorX - circleCenterX))
			 + ((cursorY - circleCenterY) *(cursorY - circleCenterY)));
			angleInDegree = Math.acos(dotProduct / (A * B));
			if (cursorY < circleCenterY)
				angleInDegree *= -1;
			circlePadX = circleDefaultX + (Math.cos(angleInDegree)*maxDistance); 	// Snap circlepad to a point on the circle
			circlePadY = circleDefaultY + (Math.sin(angleInDegree)*maxDistance);	// closest to the cursor
		}
	}
}

PlayingScene.prototype.rotatePlayer = function(e)
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	angle = Math.atan2(cursorY - (playerY + 28), cursorX - (playerX + 18));
	angle = angle * (180/Math.PI);
	for (var b = 0; b < 50; b++)
	{
		if (bulletAlive[b] == false && bulletFired == false)
		{
			var d = Math.sqrt((cursorX - 18 - playerX) * (cursorX - 18 - playerX) +
				(cursorY - playerY - 27) * (cursorY - playerY - 27));
			bulletVelx[b] = 12 * ((cursorX - 18 - playerX) / d);
			bulletVely[b] = 12 * ((cursorY - playerY - 27) / d);
			bulletPosX[b] = playerX + 7 + (bulletVelx[b] * 1);
			bulletPosY[b] = playerY + 18 + (bulletVely[b] * 1);
			bulletAlive[b] = true;
			bulletFired = true;
			//alert("X: " + cursorX + " Y: " + cursorY + " PlayerX: " + playerX + " PlayerY: " + playerY)
		}
	}
}

PlayingScene.prototype.updatePlayerPos = function() {
	dotProduct = (((circleDefaultX + 10 - circleDefaultX) * (circlePadX - circleDefaultX))
		+ ((circleDefaultY - circleDefaultY) * (circlePadY - circleDefaultY)));
	A = Math.sqrt(((circleDefaultX + 10 - circleDefaultX) * (circleDefaultX + 10 - circleDefaultX))
		+ ((circleDefaultY - circleDefaultY) * (circleDefaultY - circleDefaultY)));
	B = Math.sqrt(((circlePadX - circleDefaultX) * (circlePadX - circleDefaultX))
		+ ((circlePadY - circleDefaultY) *(circlePadY - circleDefaultY)));
	angleInDegree = Math.acos(dotProduct / (A * B));
	angleInRadian = angleInDegree * (Math.PI/180);
	if (circlePadY < circleDefaultY)
		angleInDegree *= -1;
	if (circlePadX != circleDefaultX || circlePadY != circleDefaultY) // Don't updating position if circlepad is in the center
	{
		playerX += Math.cos(angleInDegree)*Math.sqrt(((circlePadX - circleDefaultX) * (circlePadX - circleDefaultX)) + 
			((circlePadY - circleDefaultY) * (circlePadY - circleDefaultY))) * 0.2;
		playerY += Math.sin(angleInDegree)*Math.sqrt(((circlePadX - circleDefaultX) * (circlePadX - circleDefaultX)) + 
			((circlePadY - circleDefaultY) * (circlePadY - circleDefaultY))) * 0.2;
	}
}

PlayingScene.prototype.mouseDown = function(e)
{
	clicked = true;
}

PlayingScene.prototype.mouseUp = function(e)
{
	clicked = false;
	movingPlayer = false;
	circlePadX = 42; circlePadY = 621.5;
	bulletFired = false;
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