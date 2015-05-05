"use strict";

var mainScreen = function (game) {
    this.tileArray = null;
    this.tileGroup = null;
	
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
        this.movingTileGroup;               // group containing the moving tile

		this.uiTop = null;	//base for the top ui
		this.uiBot = null;	//base for the bottom ui
		
		this.frameArray = [];	//array containing the tower frames
		
		this.wave = 0;
		this.money = 0;

    },
	
	create: function(){
	
		//Grass Tiles
        for (var i = 0; i < this.fieldSizeRow; i++) {
            this.tileArray[i] = [];
            for (var j = 0; j < this.fieldSizeCol; j++) {
                var theTile = game.add.sprite((j * this.tileSize) + this.tileSize / 2, (i * this.tileSize) + this.tileSize / 2 + 50, "tiles");
                theTile.frame = 0;
                theTile.scale.x = 0.5;
                theTile.scale.y = 0.5;
                theTile.halfwidth = this.tileSize / 2;
                theTile.anchor.setTo(0.5, 0.5);
                theTile.hasBeenClicked = function(x,y)
                {
                    return this.x + this.halfwidth > x && this.x - this.halfwidth < x && this.y + this.halfwidth > y && this.y - this.halfwidth < y;
                }
                this.tileArray[i][j] = theTile;
                this.tileGroup.add(theTile);
            }
        }
		
		//UI top and bottom
		this.uiTop = game.add.sprite(0, 0, "uiBase");
		this.uiTop.scale.x = 0.5;
		this.uiTop.scale.y = 0.5;
		
		
		this.uiBot = game.add.sprite(0, this.gameHeight - this.tileSize, "uiBase");
		this.uiBot.scale.x = 0.5;
		this.uiBot.scale.y = 0.5;
		
		//Frames for bottom ui
		for(var i = 0; i < this.fieldSizeCol; i++){
			var frame = game.add.button(i * this.tileSize, this.gameHeight - this.tileSize, "frame", this.buyTower, this);
			frame.num = i;
			this.frameArray[i] = frame;
		}
		
		//Text for wave and money
		this.waveText = game.add.text(10, this.tileSize/4, "Wave " + this.wave, {font: '20px Arial', fill: '#fff'});
		
		this.moneyText = game.add.text(100, this.tileSize/4, "$" + this.money, {font: '20px Arial', fill: '#fff'});
	},
	
	//Selects a tower to place
	buyTower: function(button){
		//Testing to make sure its selecting the right frame
		console.log("Tower Button " + button.num + " pressed.");
		
		//Placing logic goes here
		//Use button to determine which was pressed
	}
};