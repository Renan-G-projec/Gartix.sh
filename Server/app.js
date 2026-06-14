// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");

const mockRoom = new Room();

mockRoom.canvas.drawCircle(10, 10, 10);
mockRoom.canvas.log();
