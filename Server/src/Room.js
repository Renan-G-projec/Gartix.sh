// Ad Maiorem Dei Gloriam!

const crypto = require("node:crypto");
const STATES = require("./States.js");
const { type } = require("node:os");

class Room {
    constructor(password) {
        this.password = password;

        this.players = new Map();
        this.numPlayers = 0;
        this.maxPlayers = 10;
        this.drawingPlayerID = null;

        this.state = STATES.WAITING;
        this.secretWord = null;

        this.canvas = new Uint8Array(30 * 30);
        this.defaultTime = 10; // seconds
        this.remainingTime = 0;
        this.timer = null; // for setInterval;

        this.playerQueue = [];

        this.playersToDraw = null;
    }

    addPlayer(player, providedPassword) {
        if (this.numPlayers >= this.maxPlayers) {
            return { success: false, reason: "Maximum capacity exceed."};
        }

        if (this.password) {
            if (!providedPassword) return { success: false, reason: "Room needs password but none was provided." };
            if (providedPassword != this.password) return { success: false, reason: "Incorrect password provided."};
        }

        this.players.set(player.id, player);
        this.numPlayers++;

        this.playerQueue.push(player.id);
        this.broadcast({ type: "PLAYER_JOIN", nickname: player.nickname});

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

    // calls the parser to parsae the object into bytes after
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