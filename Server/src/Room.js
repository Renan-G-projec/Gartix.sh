// Ad Maiorem Dei Gloriam!

const Canvas = require("./Canvas.js");
const crypto = require("node:crypto");
const STATES = require("./States.js");

class Room {
    constructor(code) {

        this.code = code;
        this.players = [];
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
    }

    addPlayer(playerId) {
        if (this.numPlayers >= this.maxPlayers) {
            return { success: false, reason: "Maximum capacity exceed."};
        }

        this.players.push(playerId);
        this.numPlayers++;

        this.playerQueue.push(playerId);
        this.broadcast({ type: "PLAYER_JOIN", id: playerId});

        return { success: true };
    }

    destroyPlayer(playerUUID) {
        if (!this.players.delete(playerUUID)) {
            throw new Error("[ROOM_JS] - Tried to delete unexistent player.");
        }
        this.numPlayers--;

        this.playerQueue = this.playerQueue.filter(id => id !== playerUUID);

        // If the lefting player was the drawer
        if (this.drawingPlayerID === playerUUID) {
            this.endRound("DRAWER_LEFT");
        }
    }

    initRound() {
        this.remainingTime = this.defaultTime;
        this.canvas.fill(0);

        this.drawingPlayerID = this.playerQueue.shift();
        

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

    // calls the parser to parse the object into bytes after
    broadcast(message) {
        // Mock functionality
        console.log(`[BROADCAST_TEMP] - type: ${message.type}, reason: ${message.reason}`);
    }

    verifyGuess(playerId, guess) {
        
    }

    applyCommand(opcode, args) {

    }


}

module.exports = Room