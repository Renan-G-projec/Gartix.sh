// Ad Maiorem Dei Gloriam!
const Room = require('./Room.js');

class RoomManager {
    constructor() {
        this.rooms = new Map();
        this.numRooms = 0;
    }

    createRoom() {
        const generateCode = () => { String.toString(Math.round(Math.random() * 9999999)).padStart(6, "0") }
        let uniqueCodeGenerated = false;
        let codeGenerated;

        // Uneficient loop to generat only unique 6-digits code.
        while (!uniqueCodeGenerated) {
            codeGenerated = generateCode();
            if (!this.rooms.has(codeGenerated)) codeGenerated = true;
        }

        this.rooms.set(codeGenerated, new Room(codeGenerated));
        console.log(`[ROOM MANAGER] - Generated room with code ${codeGenerated} at ${new Date()}.`);
    }

    destroyRoom(roomID) {
        if (!this.rooms.delete(roomID)) throw new Error("Tried to delete unexistent room.");

        console.log(`[ROOM MANAGER] - Deleted room with code ${roomID} at ${new Date()}`)
    }
}

module.exports = RoomManager;