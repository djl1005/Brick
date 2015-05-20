"use strict";

 var Tower = function () {

    function Tower(x, y, hp, atk , image, cost, atkRate, arrayI, arrayJ) {
        this.hp = hp;
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.sprite = game.add.sprite(x, y, image);
		this.name = image;
		this.cost = cost;
		this.atkRate = atkRate;	//Attack rate in milliseconds
		this.lastAtk = 0;
		this.arrayI = arrayI;	//I coord of the main tower array
		this.arrayJ = arrayJ;	//J coord of the main tower array

        //this.sprite.anchor.setTo(0.5, 0.5);
    }

    var p = Tower.prototype;

    p.update = function (enemies, bullets, bulletSprite, dt) {
		var currentTime = Date.now();
		//Can we attack?
		if(currentTime - this.lastAtk >= this.atkRate){
			//Melee Tower
			if(this.name == "towerA"){
				//Same row?
				for(var i = 0; i < enemies.length; i++){
					if(enemies[i].y == this.y)
					{
						//Same tile?
						var dist = enemies[i].x - this.x;
						if(dist <= 50 && dist >=0){
							//Damage the enemy
							enemies[i].hp -= this.atk;
						}
					}
				}
			}
			
			//Ranged target
			if(this.name == "towerB"){
				var closestDist = 1000;
				var hitEnemy = null;
				//Same row?
				for(var i = 0; i < enemies.length; i++){
					if(enemies[i].y == this.y)
					{
						//New closest enemy?
						//var dist = enemies[i].x - this.x;
						//if(dist <= closestDist && dist >= 0){
						//	closestDist = dist;
						//	hitEnemy = i;
					    //}

					    var bullet = new Bullet(this.x + 25, this.y + 25, this.atk, "brick");
					    bullets.push(bullet);
					    bulletSprite.push(bullet.sprite);
					}
				}
				//Damage the closest enemy in the same row
				if(hitEnemy != null)
					enemies[hitEnemy].hp -= this.atk
			
			this.lastAtk = currentTime;
			}
			
			//D is a wall, no attack
			
			//Brick Rail Gun
			if(this.name == "towerD"){
				var closestDist = 1000;
				var hitEnemy = null;
				//Same row?
				for(var i = 0; i < enemies.length; i++){
					if(enemies[i].y == this.y)
					{
						//New closest enemy?
						//var dist = enemies[i].x - this.x;
						//if(dist <= closestDist && dist >= 0){
						//	closestDist = dist;
						//	hitEnemy = i;
					    //}
						//enemies[i].hp -= this.atk

					    var bullet = new Bullet(this.x + 25, this.y + 25, this.atk, "brickLaser");
					    bullets.push(bullet);
					    bulletSprite.push(bullet.sprite);
					}
				}
				//Damage the closest enemy in the same row
				if(hitEnemy != null)
					enemies[hitEnemy].hp -= this.atk
			
			this.lastAtk = currentTime;
			}
	   }
    }

    return Tower;
}();