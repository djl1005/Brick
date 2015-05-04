"use strict";

var mainScreen = function (game) {
    this.tileArray = null;
    this.tileGroup = null;
}

mainScreen.prototype = {
    preload: function () {
        game.load.spritesheet("tiles", "./media/tiles.png", 100, 100);
    },

    init: function () {
        this.tileGroup = game.add.group();
        this.tileSize = 50;				// tile size, in pixels
        this.fieldSizeRow = 5;
        this.fieldSizeCol = 10;
        this.tileTypes = 10;				// different kind of tiles allowed
        this.score = 0;

        this.tileArray = [];				// array with all game tiles
        this.tileGroup; 				// group containing all tiles
        this.movingTileGroup;               // group containing the moving tile

        for (var i = 0; i < this.fieldSizeRow; i++) {
            this.tileArray[i] = [];
            for (var j = 0; j < this.fieldSizeCol; j++) {
                var theTile = game.add.sprite((j * this.tileSize) + this.tileSize / 2, (i * this.tileSize) + this.tileSize / 2, "tiles");
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

    }
};