class Game {
    constructor(plies) {
        this.plies = plies;
        this.currentBoard = new Board();
        this.currentPlayer = 'white';
        this.enemy = 'black';
        this.moves = [];
    }

    doMove(move) {
        this.currentBoard.doMove(move);

        let color = this.currentPlayer;
        this.currentPlayer = this.enemy;
        this.enemy = color;
    }

    getBestMove() {
        this.moves = [];
        game.negamax(game.currentBoard, game.plies, -Infinity, Infinity, 1);

        let bestScore = {
            score: -Infinity,
            moves: []
        };
        for (let moveScore of this.moves) {
            if (moveScore.score > bestScore.score) {
                bestScore.score = moveScore.score;
                bestScore.moves = [moveScore.move];
            } else if (moveScore.score === bestScore.score) {
                bestScore.moves.push(moveScore.move);
            }
        }

        return bestScore.moves[Math.floor(Math.random() * bestScore.moves.length)];
    }

    negamax(board, depth, alpha, beta, color) {
        if (depth === 0)
            return color * board.evaluate(this.currentPlayer);

        let childNodes = board.getAllMoves(color == 1 ? this.currentPlayer : this.enemy);
        let bestValue = -Infinity;
        for (let child of childNodes) {
            let killedPiece = board.doMove(child);
            let v = -this.negamax(board, depth - 1, -beta, -alpha, -color);
            board.undoMove(child, killedPiece);
            bestValue = this.max(bestValue, v);

            if (depth == this.plies) {
                this.moves.push({
                    move: child,
                    score: bestValue
                });
            }

            alpha = this.max(alpha, v);
            if (alpha >= beta)
                break;
        }
        return bestValue;
    }

    max(item1, item2) {
        return item1 > item2 ? item1 : item2;
    }
}
Game.weights = {
    queen: 9,
    rook: 5,
    knight: 3,
    bishop: 3,
    pawn: 1,
    king: 500
};
