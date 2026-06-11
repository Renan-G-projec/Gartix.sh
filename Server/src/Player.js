// Ad Maiorem Dei Gloriam!

class Player {
    constructor(nickname, token) {
        this.nickname = nickname;

        this.token = token; 
        this.commandsSent = 0;
        this.commandDelayMean = null;

        this.isDrawing = false;
        this.numberOfVotes = 0;
        
        this.score = 0;
        this.isConnected = true;
        this.guessed = false;
    }

    addScore(score)  {
        this.score += score;
    }

    setConnectionStatus(status) {
        this.isConnected = status;
    }

}

module.exports = Player;