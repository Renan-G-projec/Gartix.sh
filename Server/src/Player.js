// Ad Maiorem Dei Gloriam!

class Player {
    constructor(nickname, id) {
        this.nickname = nickname;
        this.id = id;
    }

    setNickname(name) {
        this.nickname = name;

        return {success: true};
    }
    
    setId(id) { this.id = id; }
}

module.exports = Player;