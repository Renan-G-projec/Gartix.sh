// Ad Maiorem Dei Gloriam!
const ws = require("ws");
const crypto = require("node:crypto");
const Player = require("./Player.js");

class NetworkManager {
    constructor() {
        this.server = new ws.WebSocketServer({ port: 8080 });
        this.players = new Map();
        this.sockets = new Map();
    }

    init() {
        this.server.on("connection", (socket, req) => {

            const playerID = crypto.randomUUID();
            this.players.set(playerID, new Player("guest", playerID));
            this.sockets.set(playerID, socket);
            
            console.log(`[NETWORK MANAGER] - Player ${playerID} connected.`);

            socket.on("close", () => {
                console.log(`[NETWORK MANAGER] - Player ${playerID} disconnected.`);
            })

            socket.on("error", (err) => {
                console.error("[NETWORK MANAGER] - Client connection failed. ", err.message);
            })
        })

    }

    broadcast(playersId, packet) {
        playersId.forEach(id => {
            const socket = this.sockets.get(id);
            socket.send(packet);
        });
    }

    close() {
        this.server.close();
        this.players.clear();
        this.sockets.clear();
    }
}

module.exports = NetworkManager;
