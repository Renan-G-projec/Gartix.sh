// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");

const mockRoom = new Room();

mockRoom.canvas.drawLine(10, 9, 10, 9);
mockRoom.canvas.log();
