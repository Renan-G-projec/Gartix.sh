// Ad Maiorem Dei Gloriam!

const Canvas = require("./Canvas.js");
const STATES = require("./States.js");

class Room {
    constructor(networkManager) {
        this.networkManager = networkManager;

        this.players = new Map();
        this.playerQueue = [];
        this.drawingPlayerId = null;

        this.state = STATES.WAITING;
        this.secretWord = null;

        this.canvas = new Canvas(30, 30);

        this.remainingTime = 0;
        this.timer = null; // for setInterval;

        this.scores = new Map();
    }

    /**
     * @description Adds the player ID and pushes it to the drawing queue. Also broadcasts it to all the players
     * @param {String} playerId
     */
    addPlayer(playerId) {

        this.players.set(playerId, false);
        this.playerQueue.push(player.id);

        const player = {}; // TODO: implement the network manager ref here
        this.broadcast({ type: "PLAYER_JOIN", nick: player.nickname});

        return { success: true };
    }

    /** 
     * @description Removes the player and broadcasts to the others
     * @param {String} playerId
    */
    destroyPlayer(playerId) {
        this.players.delete(playerId);
        this.playerQueue = this.playerQueue.filter(id => id !== playerID);

        // If the lefting player was the drawer
        if (this.drawingPlayer === playerID && this.state == STATES.DRAWING) {
            this.endRound("DRAWER_LEFT");
        }
    }

    /**
     * @description Initializes the game and the timer
     */
    initRound() {
        this.remainingTime = 60;
        this.canvas.fill(0);

        this.drawingPlayerId = this.playerQueue.shift();
        this.players.forEach((val, key) => {this.players.set(key, false)}); // Resets all the values

        const player = {}; // TODO: Implement the GetPlayer for networkManager;
        this.broadcast({ type: "ROUND_START", nick: player.nick });
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

        if (this.playerQueue.length > 0) {
            this.state = STATES.WAITING;
            setTimeout(() => {
                this.initRound();
            }, this.timeBetweenRounds * 1000);
        } else {
            this.state = STATES.FINISHED;
            this.broadcast({type: "GAME_END"});
        }
    }

    broadcast(message) {
        this.networkManager.broadcast(this.players, JSON.stringify(message));
    }

    verifyGuess(playerId, guess) {
        const alreadyGuessed = this.players.get(playerId);
        const isDrawing = this.drawingPlayerId == playerId;

        if (alreadyGuessed) return {success: false, reason: "You've already guessed."};
        if (isDrawing) return {success: false, reason: "Player currently drawing."};
        
        const player = {};
        if (guess == this.secretWord) this.broadcast({type: "PLAYER_GUESSED", nick: player.nick});
        return {success: true};
    }

    applyCommand(opcode, args) {
        
    }


}

module.exports = Room