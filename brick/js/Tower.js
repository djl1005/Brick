"use strict";

 var Tower = function () {

    function Tower(x, y, hp, atk , image, cost) {
        this.hp = hp;
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.sprite = game.add.sprite(x, y, image);
		this.name = image;
		this.cost = cost;

        //this.sprite.anchor.setTo(0.5, 0.5);
    }

    var p = Tower.prototype;

    p.update = function (enemies) {
       if(this.name == "towerA"){
			//Same row?
			for(var i = 0; i < enemies.length; i++){
				if(enemies[i].y == this.y)
				{
					//Same tile?
					var dist = enemies[i].x - this.x;
					if(dist <= 50){
						//Damage the enemy
						enemies[i].hp -= this.atk;
					}
				}
			}
	   }
    }

    return Tower;
}();