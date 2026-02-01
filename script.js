const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setMark = (index, mark) => {
        board[index] = mark;
    };

    const getBoard = () => board;

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { setMark, getBoard, reset };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("reset");

    const updateBoard = () => {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const setMessage = (text) => {
        message.textContent = text;
    };

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.dataset.index;
            gameController.playRound(index);
        });
    });

    resetBtn.addEventListener("click", () => {
        gameController.startGame();
    });

    return { updateBoard, setMessage };
})();


gameController.startGame();


const gameController = (() => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let players;
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        players = [
            Player("Player 1", "X"),
            Player("Player 2", "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.reset();
        displayController.updateBoard();
        displayController.setMessage(`${players[0].name}'s turn (X)`);
    };

    const playRound = (index) => {
        if (gameOver) return;

        const board = gameBoard.getBoard();
        if (board[index] !== "") return;

        gameBoard.setMark(index, players[currentPlayerIndex].mark);
        displayController.updateBoard();

        if (checkWin()) {
            gameOver = true;
            displayController.setMessage(`${players[currentPlayerIndex].name} wins!`);
            return;
        }

        if (checkDraw()) {
            gameOver = true;
            displayController.setMessage("It's a draw!");
            return;
        }

        switchPlayer();
        displayController.setMessage(
            `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].mark})`
        );
    };

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const mark = players[currentPlayerIndex].mark;

        return winConditions.some(condition =>
            condition.every(index => board[index] === mark)
        );
    };

    const checkDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== "");
    };

    return { startGame, playRound };
})();


