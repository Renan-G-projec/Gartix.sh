// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");

const mockRoom = new Room();

mockRoom.canvas.drawCircle(10, 10, 10);
mockRoom.canvas.drawRect(25, 3, 29, 7);
mockRoom.canvas.drawLine(1, 20, 26, 29)
mockRoom.canvas.log();
