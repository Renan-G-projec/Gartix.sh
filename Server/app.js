// Ad Maiorem Dei Gloriam!
const Player = require("./src/Player.js");
const Room = require("./src/Room.js");

const mockRoom = new Room();

const mockPlayer1 = new Player("amazingNick", "adsfasdf");
mockPlayer1.id = "123456789";

const mockPlayer2 = new Player("AmazingNick2", "dopiasufop");
mockPlayer2.id = "3281";

mockRoom.addPlayer(mockPlayer1);
mockRoom.addPlayer(mockPlayer2);

mockRoom.initRound();
