"use strict";

var endScreen = function (game) { 
	this.topWaveText = null;
	this.waveText = null;
}

endScreen.prototype = {
    preload: function () {
        this.background = null;

        game.load.image("play", "media/play.png");
        game.load.image("bg", "media/bgEnd.png");
    },

    create: function () {
        // show the game in full screen
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize();
        game.stage.backgroundColor = '#8E669A';

        this.background = game.add.sprite(0, 0, 'bg');

        var playButton = this.game.add.button(250, 275, "play", this.playGame, this);
        playButton.anchor.setTo(0.5, 0.5);
		
		this.topWave = localStorage.topWave;
		this.wavesSurvived = localStorage.wavesSurvived;
		
		this.waveText = game.add.text(10, 320, "You survived " + this.wavesSurvived + " waves.", { font: '20px Arial', fill: 'black' });
		this.topWaveText = game.add.text(270, 320, "Most waves survived: " + this.topWave, { font: '20px Arial', fill: 'black' });
    },

    playGame: function () {
        this.game.state.start('Main');
    }
}