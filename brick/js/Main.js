"use strict";

var mainScreen = function (game) {
    this.tileArray = null;
    this.tileGroup = null;
    this.brickGroup;
	
    this.frameArray = null;
    this.frameGroup = null;
	
    this.wave = null;	//What wave we're on
    this.waveText = null;
    this.money = null;	//How much money you have
    this.moneyText = null;
}

mainScreen.prototype = {
    preload: function () {
        game.load.spritesheet("tiles", "media/tiles.png", 100, 100);
        game.load.image("uiBase", "media/uiBase.png", 1000, 100);
        game.load.image("frame", "media/towerFrame.png", 50, 50);
        game.load.image("punkA", "media/punkA.png", 50, 50);
        game.load.image("towerA", "media/towerA.png", 50, 50);
        game.load.image("towerB", "media/towerB.png", 50, 50);
        game.load.image("brick", "media/play.png", 50 ,50); // temp for brick
    },

    init: function () {
        this.tileGroup = game.add.group();
        this.tileSize = 50;				// tile size, in pixels
        this.fieldSizeRow = 5;
        this.fieldSizeCol = 10;
        this.tileTypes = 10;				// different kind of tiles allowed
        this.score = 0;
        this.gameWidth = 500;
        this.gameHeight = 350;

        this.tileArray = [];				// array with all game tiles
        this.tileGroup; 				// group containing all tiles

        this.uiTop = null;	//base for the top ui
        this.uiBot = null;	//base for the bottom ui
		this.towerASprite = null;	//towerA image
		this.towerBSprite = null;	//towerB image
		
        this.frameArray = [];	//array containing the tower frames
        this.towerArray = [];
        this.towerSpriteArray = [];
        this.enemyArray = [];
        this.enemySpriteArray = [];
		
		this.selectedTower = null;
		
        this.wave = 0;
		this.lastTime = Date.now();
		
        this.money = 100;

    },
	
    create: function(){
	
        //Grass Tiles
        for (var i = 0; i < this.fieldSizeRow; i++) {
            this.tileArray[i] = [];
            for (var j = 0; j < this.fieldSizeCol; j++) {

                var tempTile = new Tile((j * this.tileSize) + this.tileSize / 2, (i * this.tileSize) + this.tileSize / 2 + 50, this.tileSize, 0);

                this.tileArray[i][j] = tempTile;
                this.tileGroup.add(tempTile.sprite);
            }
        }

        //Enemy
        this.spawnEnemy(2);
		
        //UI top and bottom
        this.uiTop = game.add.sprite(0, 0, "uiBase");
        this.uiTop.scale.x = 0.5;
        this.uiTop.scale.y = 0.5;
		
		
        this.uiBot = game.add.sprite(0, this.gameHeight - this.tileSize, "uiBase");
        this.uiBot.scale.x = 0.5;
        this.uiBot.scale.y = 0.5;
		
		this.towerASprite = game.add.sprite(0, this.gameHeight - this.tileSize, "towerA");
		this.towerBSprite = game.add.sprite(50, this.gameHeight - this.tileSize, "towerB");
		
        //Frames for bottom ui
        for(var i = 0; i < this.fieldSizeCol; i++){
            var frame = game.add.button(i * this.tileSize, this.gameHeight - this.tileSize, "frame", this.buyTower, this);
            frame.num = i;
            this.frameArray[i] = frame;
        }
		
        //Text for wave and money
        this.waveText = game.add.text(10, this.tileSize/4, "Wave " + this.wave, {font: '20px Arial', fill: '#fff'});
		
        this.moneyText = game.add.text(100, this.tileSize / 4, "$" + this.money, { font: '20px Arial', fill: '#fff' });

        game.input.onDown.add(this.click, this);
    },

    update: function() {
		//Update time
		var currentTime = Date.now();
		var dt = currentTime - this.lastTime;
		this.lastTime = currentTime;
	
		//Damage towers and enemies
        this.dealDamage(dt);
		
        //Enemy
        for (var i = 0; i < this.enemyArray.length; i++) {
            //Move the enemy
            this.enemyArray[i].move(this.enemyArray, this.enemySpriteArray, i);
	
            if (this.enemyArray[i].hp <= 0) {
                //Give the player some cash
                this.money += this.enemyArray[i].reward;
                //Kill the enemy
                this.enemySpriteArray[i].kill();
                var dead = this.enemyArray.indexOf(this.enemyArray[i]);
                this.enemyArray.splice( dead, 1 );
                this.enemySpriteArray.splice( dead, 1 );
            }
        }
		
		//Towers
		for (var i = 0; i < this.towerArray.length; i++){
			if(this.towerArray[i].hp <= 0){
                //Kill the tower
				this.tileArray[this.towerArray[i].arrayI][this.towerArray[i].arrayJ].hasTower = false;
                this.towerSpriteArray[i].kill();
                var dead = this.towerArray.indexOf(this.towerArray[i]);
                this.towerArray.splice( dead, 1 );
                this.towerSpriteArray.splice( dead, 1 );
			}
		}
		
        //For now, spawn  more enemies when none are left
        if(this.enemyArray.length == 0){
            this.spawnEnemy(2);
        }
		
        //Update Money Text
        this.moneyText.setText("$" + this.money);
		
    },
	
    click: function()
    {
        var x = game.input.worldX;
        var y = game.input.worldY;
        //Temporarily spawn towers at no cost
			
        for (var i = 0; i < this.fieldSizeRow; i++) {
            for (var j = 0; j < this.fieldSizeCol; j++) {
                if ( !this.tileArray[i][j].hasTower && this.tileArray[i][j].hasBeenClicked(x, y)) {
                    this.spawnTower(x, y, i, j, i, j);
                }
				
				
            }
        }
    },

    //Selects a tower to place
    buyTower: function(button){
        //Testing to make sure its selecting the right frame
        console.log("Tower Button " + button.num + " pressed.");
		
        //Placing logic goes here
        //Use button to determine which was pressed
		this.selectedTower = button.num;
    },
	
    //Spawn a number of enemies
    spawnEnemy: function(num){
        for(var i = 0; i < num; i++){
            //Get the spawn row
            var spawnLoc = Math.floor((Math.random() * 5) + 1) * this.tileSize;
            //Make a new enemy
            var tempEnemy = new Enemy(500, spawnLoc, 20, 1, "punkA", 500);
            this.enemyArray.push(tempEnemy);
            //Add the sprite
            var tempSprite = game.add.sprite(tempEnemy.x, tempEnemy.y, "punkA");
            this.enemySpriteArray.push(tempSprite);
        }
    },
	
    //Spawn a tower
    spawnTower: function(_x, _y, i, j){
        var x = Math.floor(_x/this.tileSize) * this.tileSize;
        var y = Math.floor(_y / this.tileSize) * this.tileSize;
		
		//Check what tower is selected
		var tempTower = null;
		//Melee
		if(this.selectedTower == 0){
			tempTower = new Tower(x, y, 30, 1, 'towerA', 10, 500, i, j);
		}
		//Ranged
		if(this.selectedTower == 1){
			tempTower = new Tower(x, y, 10, 3, 'towerB', 20, 500, i, j);
		}
		
		//Spawn the tower and subtract money
		if(tempTower != null){
			if(this.money >= tempTower.cost){
				this.towerArray.push(tempTower);
				this.towerSpriteArray.push(tempTower.sprite);
				this.money -= tempTower.cost;
				this.tileArray[i][j].hasTower = true;
			}
			else
				tempTower.sprite.kill();	
		}
	},

	//Deal damage to enemies and towers
	dealDamage: function(dt){
		//Enemies
		for(var i = 0; i < this.towerArray.length; i++){
			this.towerArray[i].update(this.enemyArray, dt);
		}
		//Towers
		for(var i = 0; i < this.enemyArray.length; i++){
			this.enemyArray[i].update(this.towerArray, dt);
		}
	}

};