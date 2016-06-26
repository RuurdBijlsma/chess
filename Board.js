class Board {
    constructor(config) {
        this.board = [];
        this.size = 8;
        for (let x = 0; x < this.size; x++) {
            this.board.push([]);
            for (let y = 0; y < this.size; y++) {
                this.board[x].push(null);
            }
        }

        this.resetBoard(config);
    }

    evaluate(side) {
        let score = 0;
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.board[x][y] !== null) {
                    if (this.board[x][y].side === side) {
                        name = this.board[x][y].name;
                        score += Game.weights[name];
                    } else {
                        name = this.board[x][y].name;
                        score -= Game.weights[name];
                    }
                }
            }
        }
        return score;
    }

    doMove(move) {
        let piece = this.board[move.oldPos[0]][move.oldPos[1]];
        this.board[move.oldPos[0]][move.oldPos[1]] = null;
        let killedPiece = this.board[move.newPos[0]][move.newPos[1]];
        this.board[move.newPos[0]][move.newPos[1]] = piece;
        return killedPiece;
    }
    undoMove(move, killedPiece) {
        let piece = this.board[move.newPos[0]][move.newPos[1]];
        this.board[move.newPos[0]][move.newPos[1]] = killedPiece;
        this.board[move.oldPos[0]][move.oldPos[1]] = piece;
    }

    getAllMoves(side) {
        let moves = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.board[x][y] !== null && this.board[x][y].side === side) {
                    moves = moves.concat(this.getMoves(x, y));
                }
            }
        }
        return moves;
    }

    getMoves(x, y) {
        let moves = [];
        if (this.board[x][y] !== null) {
            let valid = false,
                nX, nY;
            switch (this.board[x][y].name) {
                case 'rook':
                    for (let nX = x + 1; x < this.size; nX++) { //rechts van rook
                        valid = this.isValid(nX, y, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [nX, y]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nX = x - 1; x >= 0; nX--) { //links van rook
                        valid = this.isValid(nX, y, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [nX, y]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nY = y + 1; y < this.size; nY++) { //onder van rook
                        valid = this.isValid(x, nY, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [x, nY]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nY = y - 1; y >= 0; nY--) { //boven van rook
                        valid = this.isValid(x, nY, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [x, nY]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    break;
                case 'knight':
                    nX = -2;
                    nY = -1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = -1;
                    nY = -2;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 1;
                    nY = 2;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 2;
                    nY = 1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = -2;
                    nY = 1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = -1;
                    nY = 2;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 1;
                    nY = -2;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 2;
                    nY = -1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    break;
                case 'bishop':
                    for (let i = 1; i < this.size; i++) { //rechtsonder van bishop
                        valid = this.isValid(x + i, y + i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x + i, y + i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //rechtsboven van bishop
                        valid = this.isValid(x + i, y - i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x + i, y - i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //linksonder van bishop
                        valid = this.isValid(x - i, y + i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x - i, y + i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //linksboven van bishop
                        valid = this.isValid(x - i, y - i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x - i, y - i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    break;
                case 'pawn':
                    if (this.board[x][y].side === 'white') {
                        if (this.isValid(x, y - 1, this.board[x][y].side) === 1) {
                            moves.push(new Move([x, y], [x, y - 1]));
                            if (y === 6 && this.isValid(x, y - 2, this.board[x][y].side) === 1)
                                moves.push(new Move([x, y], [x, y - 2]));
                        }
                        if (this.isValid(x - 1, y - 1, this.board[x][y].side) === 0)
                            moves.push(new Move([x, y], [x - 1, y - 1]));
                        if (this.isValid(x + 1, y - 1, this.board[x][y].side) === 0)
                            moves.push(new Move([x, y], [x + 1, y - 1]));
                    }
                    if (this.board[x][y].side === 'black') {
                        if (this.isValid(x, y + 1, this.board[x][y].side) === 1) {
                            moves.push(new Move([x, y], [x, y + 1]));
                            if (y === 1 && this.isValid(x, y + 2, this.board[x][y].side) === 1)
                                moves.push(new Move([x, y], [x, y + 2]));
                        }
                        if (this.isValid(x + 1, y + 1, this.board[x][y].side) === 0)
                            moves.push(new Move([x, y], [x + 1, y + 1]));
                        if (this.isValid(x - 1, y + 1, this.board[x][y].side) === 0)
                            moves.push(new Move([x, y], [x - 1, y + 1]));
                    }
                    break;
                case 'queen':
                    for (let nX = x + 1; x < this.size; nX++) { //rechts van queen
                        valid = this.isValid(nX, y, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [nX, y]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nX = x - 1; x >= 0; nX--) { //links van queen
                        valid = this.isValid(nX, y, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [nX, y]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nY = y + 1; y < this.size; nY++) { //onder van queen
                        valid = this.isValid(x, nY, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [x, nY]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let nY = y - 1; y >= 0; nY--) { //boven van queen
                        valid = this.isValid(x, nY, this.board[x][y].side);
                        if (valid != -1) {
                            moves.push(new Move([x, y], [x, nY]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //rechtsonder van queen
                        valid = this.isValid(x + i, y + i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x + i, y + i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //rechtsboven van queen
                        valid = this.isValid(x + i, y - i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x + i, y - i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //linksonder van queen
                        valid = this.isValid(x - i, y + i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x - i, y + i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    for (let i = 1; i < this.size; i++) { //linksboven van queen
                        valid = this.isValid(x - i, y - i, this.board[x][y].side);
                        if (valid !== -1) {
                            moves.push(new Move([x, y], [x - i, y - i]));
                            if (valid === 0)
                                break;
                        } else
                            break;
                    }
                    break;
                case 'king':
                    nX = -1;
                    nY = -1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 1;
                    nY = -1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = -1;
                    nY = 1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 1;
                    nY = 1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 0;
                    nY = 1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 1;
                    nY = 0;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = 0;
                    nY = -1;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    nX = -1;
                    nY = 0;
                    this.isValid(x + nX, y + nY, this.board[x][y].side) != -1 && moves.push(new Move([x, y], [x + nX, y + nY]));
                    break;
            }
        }
        return moves;
    }

    isValid(x, y, movingSide) {
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
            if (this.board[x][y] === null) {
                return 1;
            } else if (movingSide !== this.board[x][y].side) {
                return 0;
            }
        }
        return -1;
    }

    resetBoard(config) {
        this.board[0][0] = new Piece('black', 'rook');
        this.board[1][0] = new Piece('black', 'knight');
        this.board[2][0] = new Piece('black', 'bishop');
        this.board[3][0] = new Piece('black', 'queen');
        this.board[4][0] = new Piece('black', 'king');
        this.board[5][0] = new Piece('black', 'bishop');
        this.board[6][0] = new Piece('black', 'knight');
        this.board[7][0] = new Piece('black', 'rook');

        this.board[0][1] = new Piece('black', 'pawn');
        this.board[1][1] = new Piece('black', 'pawn');
        this.board[2][1] = new Piece('black', 'pawn');
        this.board[3][1] = new Piece('black', 'pawn');
        this.board[4][1] = new Piece('black', 'pawn');
        this.board[5][1] = new Piece('black', 'pawn');
        this.board[6][1] = new Piece('black', 'pawn');
        this.board[7][1] = new Piece('black', 'pawn');

        this.board[0][6] = new Piece('white', 'pawn');
        this.board[1][6] = new Piece('white', 'pawn');
        this.board[2][6] = new Piece('white', 'pawn');
        this.board[3][6] = new Piece('white', 'pawn');
        this.board[4][6] = new Piece('white', 'pawn');
        this.board[5][6] = new Piece('white', 'pawn');
        this.board[6][6] = new Piece('white', 'pawn');
        this.board[7][6] = new Piece('white', 'pawn');

        this.board[0][7] = new Piece('white', 'rook');
        this.board[1][7] = new Piece('white', 'knight');
        this.board[2][7] = new Piece('white', 'bishop');
        this.board[3][7] = new Piece('white', 'queen');
        this.board[4][7] = new Piece('white', 'king');
        this.board[5][7] = new Piece('white', 'bishop');
        this.board[6][7] = new Piece('white', 'knight');
        this.board[7][7] = new Piece('white', 'rook');
    }

    toString() {
        let result = '';
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.board.length; y++) {
                result += this.board[y][x] === null ? '\t\t' : this.board[y][x] + '\t';
            }
            result += '\n\n';
        }
        return result;
    }

    log() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.board.length; y++) {
                result += this.board[y][x] === null ? '\t\t' : this.board[y][x] + '\t';
            }
            console.log(result);
        }
    }
}
