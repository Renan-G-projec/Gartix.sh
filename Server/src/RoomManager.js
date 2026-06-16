// Ad Maiorem Dei Gloriam!
const Room = require('./Room.js');

class RoomManager {
    constructor() {
        this.rooms = new Map();
        this.numRooms = 0;
    }

    playerJoin(providedCode, player) {
        const room = this.rooms.get(providedCode);
        if (!room) return { sucess: false, reason: "Incorrect code provided. No room matched the provided code."};
        if (player.onGame) return { sucess: false, reason: "Player are in a game. Leave the current room before entering another."};
        return room.addPlayer(player);
    }

    createRoom() {
        const generateCode = () => { return Math.round(Math.random() * 9999999).toString().padStart(6, "0") }
        let uniqueCodeGenerated = false;
        let codeGenerated;

        // Uneficient loop to generat only unique 6-digits code.
        while (!uniqueCodeGenerated) {
            codeGenerated = generateCode();
            if (!this.rooms.has(codeGenerated)) uniqueCodeGenerated = true;
        }

        this.rooms.set(codeGenerated, new Room(codeGenerated));
        console.log(`[ROOM MANAGER] - Generated room with code ${codeGenerated} at ${new Date()}.`);

        return codeGenerated;
    }

    destroyRoom(roomID) {
        if (!this.rooms.delete(roomID)) throw new Error("Tried to delete unexistent room.");

        console.log(`[ROOM MANAGER] - Deleted room with code ${roomID} at ${new Date()}`)
    }
}

module.exports = RoomManager;