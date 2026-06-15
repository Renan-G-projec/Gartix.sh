// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");
const NetworkManager = require("./src/NetworkManager.js");
const CommandParser = require("./src/CommandParser.js");


const mockCmdParser = new CommandParser();
const mockNM = new NetworkManager(mockCmdParser);
mockNM.init();

