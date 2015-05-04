"use strict";

game.Square = function () {

    function Square(x,y,size,type)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tower = undefined;
        this.type = type;
        this.sprite = game.add.sprite(x, y, "tiles");

        sprite.scale.y = 0.5;
        sprite.frame = type;
        theTile.anchor.setTo(0.5, 0.5);
    }


}