"use strict";

 var Bullet = function () {

    function Bullet(x, y, atk , image) {
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.sprite = game.add.sprite(x, y, image);
		this.name = image;
    }

    var p = Bullet.prototype;

    p.update = function (enemies, dt) {

    }

    p.move = function (array, spriteArray, i) {
        spriteArray[i].position.x += 1;
        array[i].x += 1;
    }

    return Bullet;
}();