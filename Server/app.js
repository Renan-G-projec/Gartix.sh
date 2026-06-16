// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");
const NetworkManager = require("./src/NetworkManager.js");
const CommandParser = require("./src/CommandParser.js");
const RoomManager = require("./src/RoomManager.js");


const mockRM = new RoomManager();
mockRM.createRoom();
const mockCmdParser = new CommandParser(mockRM);
const mockNM = new NetworkManager(mockCmdParser);
mockNM.init();

