// Ad Maiorem Dei Gloriam!

class Canvas {
    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.data = new Uint8Array(sizeX * sizeY);
        this.data.fill(32); // Ascii value of ' '
    }

    log() {
        for (let i = 0; i < this.sizeY; ++i) {
            let row = '';
            for (let j = 0; j < this.sizeX; ++j) {
                row += String.fromCharCode(this.data.at(i * this.sizeX + j));
            }
            console.log(row);
        }
    }

    // TODO
    //    Implement a way top accept x2 or y2 to be less than x1 or y1.
    //    Implement a way to clamp the results to prevent buffer overflow.
    drawRect(x1, y1, x2, y2, character = "#") {
        const sizeX = x2 - x1 + 1;
        const sizeY = y2 - y1 + 1;

        for (let row = 0; row < sizeY; ++row) {
            this.data.fill(character.charCodeAt(0), (y1 + row) * this.sizeX + x1, (y1 + row) * this.sizeX + sizeX + x1);
        }
    }

    drawLine() { };

    drawCircle() { };
}

module.exports = Canvas;