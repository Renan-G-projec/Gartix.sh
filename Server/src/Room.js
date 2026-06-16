// Ad Maiorem Dei Gloriam!

const Canvas = require("./Canvas.js");
const crypto = require("node:crypto");
const STATES = require("./States.js");

class Room {
    constructor(code, networkManager) {

        this.code = code;
        this.players = new Map();
        this.numPlayers = 0;
        this.maxPlayers = 10;
        this.drawingPlayerID = null;

        this.state = STATES.WAITING;
        this.secretWord = null;

        this.canvas = new Canvas(30, 30);
        this.defaultTime = 10; // seconds
        this.remainingTime = 0;
        this.timer = null; // for setInterval;

        this.playerQueue = [];

        this.playersToDraw = null;

        this.networkManager = networkManager;
    }

    addPlayer(player) {
        if (this.numPlayers >= this.maxPlayers) {
            return { success: false, reason: "Maximum capacity exceed."};
        }

        this.players.set(player.id, player);
        this.numPlayers++;

        this.playerQueue.push(player.id);
        this.broadcast({ type: "PLAYER_JOIN", nick: player.nickname});

        return { success: true };
    }

    destroyPlayer(playerID) {
        if (!this.players.delete(playerID)) {
            throw new Error("[ROOM JS] - Tried to delete unexistent player.");
        }
        this.numPlayers--;

        this.playerQueue = this.playerQueue.filter(id => id !== playerID);

        // If the lefting player was the drawer
        if (this.drawingPlayer === playerID) {
            this.endRound("DRAWER_LEFT");
        }
    }

    initRound() {
        this.remainingTime = this.defaultTime;
        this.canvas.fill(0);

        this.drawingPlayer = this.playerQueue.shift();
        

        this.broadcast({ type: "ROUND_START" });
        this.state = STATES.DRAWING;
        
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.remainingTime--;

        this.broadcast({ type: "TIME_UPDATE", time: this.remainingTime});
        
        if (this.remainingTime <= 0) {
            this.endRound("TIME_OUT");
        }
    }

    endRound(reason) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.state = STATES.WAITING;
        this.broadcast({ type: "ROUND_END", reason: reason });
    }

    broadcast(message) {
        this.networkManager.broadcast(this.players.keys(), JSON.stringify(message));
    }

    verifyGuess(playerId, guess) {
        
    }

    applyCommand(opcode, args) {

    }


}

module.exports = Room