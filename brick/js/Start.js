"use strict";

var menuScreen = function (game) { }

menuScreen.prototype = {
    preload: function () {
        this.background = null;

        game.load.image("play", "media/play.png");
        game.load.image("bg", "media/bg.png");
    },

    create: function () {
        // show the game in full screen
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize();
        game.stage.backgroundColor = '#8E669A';

        this.background = game.add.sprite(0, 0, 'bg');

        var playButton = this.game.add.button(250, 275, "play", this.playGame, this);
        playButton.anchor.setTo(0.5, 0.5);
    },

    playGame: function () {
        this.game.state.start('Main');
    }
}