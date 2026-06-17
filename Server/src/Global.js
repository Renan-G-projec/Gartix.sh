// Ad Maiorem Dei Gloriam!

const NetworkManager = require("./NetworkManager.js");
const RoomManager = require("./RoomManager.js");
const CommandParser = require("./CommandParser.js");

const global = {
    networkManager: new NetworkManager(),
    roomManager: new RoomManager(),
    commandParser: new CommandParser()
}

module.exports = global;