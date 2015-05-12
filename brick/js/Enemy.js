"use strict";

 var Enemy = function () {

    function Enemy(x, y, hp, atk , image, atkRate) {
        this.hp = hp;
		this.reward = hp;
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.sprite = game.add.sprite(x, y, image);
		this.atkRate = atkRate;	//Attack rate in milliseconds
		this.lastAtk = 0;
		this.name = image;
		this.moving = true;

        //this.sprite.anchor.setTo(0.5, 0.5);
    }

    var p = Enemy.prototype;

    p.update = function (towers, bullets, bulletSprite, dt) {
		//Get the current time
		var currentTime = Date.now();
		//Assume we'll be moving
		this.moving = true;
		if(this.name == "punkA"){
			//Same row?
			for(var i = 0; i < towers.length; i++){
				if(towers[i].y == this.y)
				{
					//Same tile?
					var dist = this.x - towers[i].x;
					if(dist <= 50  && dist >= 0){
						//Can we attack?
						if(currentTime - this.lastAtk >= this.atkRate){
							//Damage the tower
							towers[i].hp -= this.atk;
							this.lastAtk = currentTime;
						}
						//Stop moving
						this.moving = false;
					}
				}
			}

			for (var i = 0; i < bullets.length; i++) {
			    if (bullets[i].y >= this.y && bullets[i].y <= this.y + 50 && bullets[i].x >= this.x && bullets[i].x <= this.x + 50) {
			        this.hp -= bullets[i].atk;
			        bulletSprite[i].kill();
			        var dead = bullets.indexOf(bullets[i]);
			        bullets.splice(dead, 1);
			        bulletSprite.splice(dead, 1);
			    }
			}
	   }
    }
	
	p.move = function(array, spriteArray, i){
		if(this.moving){
			//Move the enemy
			spriteArray[i].position.x += -1;
			array[i].x += -1;
		}
	}

    return Enemy;
}();