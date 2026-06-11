// Ad Maiorem Dei Gloriam!

const STATES = require("./States.js");

class Room {
    constructor(password) {
        this.password = password;

        this.players = new Map();
        this.numPlayers = 0;
        this.drawingPlayerID = null;

        this.state = STATES.WAITING;
        this.secretWord = null;

        this.canvas = new ArrayBuffer(30 * 30, 30 * 30)
        this.remainingTime = 0;

        this.playersToDraw = null;
    }

    addPlayer(player, providedPassword) {

    }

    destroyPlayer(playerUUID) {

    }

    initRound() {

    }

    verifyGuess(playerId, guess) {

    }

    applyCommand(opcode, args) {

    }


}

module.exports = Room