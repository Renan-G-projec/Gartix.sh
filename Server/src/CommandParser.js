// Ad Maiorem Dei Gloriam!
const Player = require("./Player.js");

class CommandParser {
    executeCommand(object, player) {
        const { opcode, args } = object;
        switch (opcode) {
            case 1: // SET NICK
                const nick = args[0];
                const res = player.setNickname(nick);
                if (res.success) console.log(`[COMMAND PARSER] - Set player ${player.id} nickname to ${nick}`);
                return res;
        }
    }
}

module.exports = CommandParser;