// Ad Maiorem Dei Gloriam!
const Player = require("./Player.js");
const RoomManager = require("./RoomManager.js");
class CommandParser {
    constructor(roomManager) {
        this.roomManager = roomManager;
        if (!roomManager) throw new Error("Room Manager not provided to Command Parser.");
        if (!roomManager instanceof RoomManager) throw new TypeError("Room Manager incorrect type to Command Parser.");
    }

    executeCommand(object, player) {
        const { opcode, args } = object;
        switch (opcode) {
            case 1: // SET NICK
                const nick = args[0];
                const res = player.setNickname(nick);
                if (res.success) console.log(`[COMMAND PARSER] - Set player ${player.id} nickname to ${nick}`);
                return res;
            case 2: // JOIN ROOM
                const code = args[0];
                console.log(code);
                return (this.roomManager.playerJoin(code, player));

        }
    }
}

module.exports = CommandParser;