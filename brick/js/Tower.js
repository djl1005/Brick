"use strict";

 var Tower = function () {

    function Tower(x, y, hp, atk , image) {
        this.hp = hp;
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.sprite = game.add.sprite(x, y, image);

        //this.sprite.anchor.setTo(0.5, 0.5);
    }

    var p = Tower.prototype;

    p.update = function () {

    }

    return Tower;
}();