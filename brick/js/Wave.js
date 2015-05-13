"use strict";

 var Wave = function () {

    function Wave(enemies, rate, spawn, total) {
        this.enemyArray = enemies;
		this.spawnRate = rate;
		this.spawnNum = spawn;
		this.totalEnemies = total;
		this.lastSpawn = 0;		//Last time we spawned something
		this.nextIndex = 0;		//Next enemy in array to spawn
    }

    var p = Wave.prototype;

    p.update = function (gameArray, gameSpriteArray) {
		var currentTime = Date.now();
		
		//Should we spawn enemies?
		if(currentTime - this.lastSpawn > this.spawnRate && this.nextIndex < this.totalEnemies){
			//Spawn the next set of enemies
			this.spawnEnemies(gameArray, gameSpriteArray);
			
			//Update the last time we spawned enemies
			this.lastSpawn = currentTime;
		}
    }
	
	//Spawn enemies
	p.spawnEnemies = function(gameArray, gameSpriteArray){
		//Spawn a number of enemies
        for(var i = this.nextIndex; i < this.nextIndex + this.spawnNum; i++){
            //Get the next enemy
            var tempEnemy = this.enemyArray[i];
            gameArray.push(tempEnemy);
            //Add the sprite
            var tempSprite = game.add.sprite(tempEnemy.x, tempEnemy.y, "punkA");
            gameSpriteArray.push(tempSprite);
        }
		this.nextIndex += this.spawnNum;
    }

    return Wave;
}();