$(document).ready(init);
//TODO Human play
//Check en checkmate
//En passe
//Toren ding
//Promoveren

function init() {
    images = {
        white: {
            knight: $('#whiteknight')[0],
            queen: $('#whitequeen')[0],
            king: $('#whiteking')[0],
            bishop: $('#whitebishop')[0],
            rook: $('#whiterook')[0],
            pawn: $('#whitepawn')[0]
        },
        black: {
            knight: $('#blackknight')[0],
            queen: $('#blackqueen')[0],
            king: $('#blackking')[0],
            bishop: $('#blackbishop')[0],
            rook: $('#blackrook')[0],
            pawn: $('#blackpawn')[0]
        }
    };

    game = new Game(3);
    size = game.currentBoard.size;

    c = $('#board');
    canvas = c[0];
    ctx = canvas.getContext('2d');

    onWindowResize();
    $(window).on('resize', onWindowResize);

    drawBoard(size);
    drawPieces(game.currentBoard.board);
}

function computerMove() {
    game.doMove(game.getBestMove());
    drawBoard();
    drawPieces(game.currentBoard.board);
}

function drawBoard() {
    ctx.clearRect(0,0,cSize,cSize);

    for (let x = 0; x <= size; x++) {
        ctx.fillRect(x * gridSize, 0, 1, cSize);
    }
    for (let y = 0; y <= size; y++) {
        ctx.fillRect(0, y * gridSize, cSize, 1);
    }
    ctx.fillRect(0, cSize - 1, cSize, 1);
    ctx.fillRect(cSize - 1, 0, 1, cSize);
}

function drawPieces(board) {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let piece = board[x][y];
            if (piece !== null) {
                ctx.drawImage(images[piece.side][piece.name], x * gridSize, y * gridSize, gridSize, gridSize);
            }
        }
    }
}

function onWindowResize() {
    cSize = -game.max(-$(window).height(), -$(window).width());

    c.attr('width', cSize);
    c.attr('height', cSize);

    c.css($(window).height() > $(window).width() ? 'top' : 'left', 'calc(50% - ' + (cSize / 2) + 'px)');
    c.css($(window).height() < $(window).width() ? 'top' : 'left', '0');

    gridSize = cSize / size;
    drawBoard(size);
}
