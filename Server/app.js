// Ad Maiorem Dei Gloriam!
const Global = require("./src/Global.js");

Global.commandParser.init(Global.roomManager);
Global.networkManager.init(Global.commandParser);
Global.roomManager.init(Global.networkManager);
Global.roomManager.createRoom();


