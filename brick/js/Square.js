"use strict";

var Tile = function () {

    function Tile(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hasTower = false;
        this.type = type;
        this.sprite = game.add.sprite(x, y, "tiles");

        this.halfwidth = this.size / 2;

        this.sprite.frame = type; // type / image to use
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;
    }

    var p = Tile.prototype;

    p.hasBeenClicked = function (x, y, forSpawning) {
        return this.x + this.halfwidth > x && this.x - this.halfwidth < x && this.y + this.halfwidth > y && this.y - this.halfwidth < y;
    }

    return Tile;

}();