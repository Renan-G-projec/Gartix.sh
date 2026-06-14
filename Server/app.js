// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");

const mockRoom = new Room();

mockRoom.canvas.drawRect(1, 2, 0, 2);
mockRoom.canvas.log();
