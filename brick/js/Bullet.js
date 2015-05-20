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
		if(this.name == "brickLaser"){
			spriteArray[i].position.x += 15;
			array[i].x += 15;
		}
		else{
			spriteArray[i].position.x += 2;
			array[i].x += 2;
		}
    }

    return Bullet;
}();