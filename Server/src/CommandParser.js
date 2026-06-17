// Ad Maiorem Dei Gloriam!

const Global = require("./Global.js");

class CommandParser {

    init(roomManager) { this.roomManager = roomManager; }
    
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