
/*
    Noughts and crosses script.js
    January 23 2026
    This is the main javascript for the noughts and crosses simple project.
*/

//  The different states the tiles go in.
const neutral = 0;
const player = 2;
const cpu = -2;

//  This represents the game board.
var gameBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

//  The current turn.
var currentTurn = 0;

//  Is the game on?
var gameOn = false;

//  Checks for a win for the current player.
function CheckVictory() {

    if (gameOn == true) {

        const buttonList = [
            "btn0", "btn1", "btn2",
            "btn3", "btn4", "btn5",
            "btn6", "btn7", "btn8",
        ];

        //  The possible winning combinations.
        //  This makes a sum of the current combinations to produce a score.
        const topHorizontal = [gameBoard[0], gameBoard[1], gameBoard[2]].reduce((a, b) => a + b);
        const middleHorizontal = [gameBoard[3], gameBoard[4], gameBoard[5]].reduce((a, b) => a + b);
        const bottomHorizontal = [gameBoard[6], gameBoard[7], gameBoard[8]].reduce((a, b) => a + b);

        const leftVertical = [gameBoard[0], gameBoard[3], gameBoard[6]].reduce((a, b) => a + b);
        const middleVertical = [gameBoard[1], gameBoard[4], gameBoard[7]].reduce((a, b) => a + b);
        const rightVertical = [gameBoard[2], gameBoard[5], gameBoard[8]].reduce((a, b) => a + b);

        const topLeftBottomRight = [gameBoard[0], gameBoard[4], gameBoard[8]].reduce((a, b) => a + b);
        const bottomLeftTopRight = [gameBoard[6], gameBoard[5], gameBoard[2]].reduce((a, b) => a + b);

        const allPossibleWinningCombinations = [
            topHorizontal, middleHorizontal, bottomHorizontal,
            leftVertical, middleVertical, rightVertical,
            topLeftBottomRight, bottomLeftTopRight
        ];

        const playerWinCount = 6;
        const cpuWinCount = -6;

        //  Loop through all fo the possible winning combinations and then see if 
        //  player or CPU have won
        for (let i = 0; i < allPossibleWinningCombinations.length; i++) {

            if (allPossibleWinningCombinations[i] == playerWinCount) {

                window.alert("Player wins!");
                gameOn = false;

                break;

            }

            if (allPossibleWinningCombinations[i] == cpuWinCount) {

                window.alert("CPU wins!");
                gameOn = false;

                break;

            }

        }

    }

}

//  Gets all available moves.
function GetAvailableMoves() {

    let avialableMoves = [];

    for (let i = 0; i < gameBoard.length; i++) {

        if (gameBoard[i] == 0) {

            //  Push the available tile position
            avialableMoves.push(i);

        }

    }

    return avialableMoves;

}

//  The CPU's move.
function CPUMove() {

    if (gameOn == true) {

        let avialableMoves = GetAvailableMoves();

        //  Only move when there are moves available
        if (avialableMoves.length) {

            const randomCPUNumber = Math.floor(Math.random() * avialableMoves.length);

            let tile = avialableMoves[randomCPUNumber];
            
            document.getElementById("btn" + tile).className = "";
            document.getElementById("btn" + tile).className = "gameButtonNoughts";

            document.getElementById("btn" + tile).textContent = "O";
            document.getElementById("btn" + tile).disabled = true;

            //  
            gameBoard[tile] = cpu;

            ChangeTurn();
            
        } 

    }

}

//  The player's move.
function PlayerMove(gridPosition) {

    if (gameOn == true) {

        if (gameBoard[gridPosition] == 0) {

            gameBoard[gridPosition] = player;

            document.getElementById("btn" + gridPosition).className = "";
            document.getElementById("btn" + gridPosition).className = "gameButtonCrosses";

            document.getElementById("btn" + gridPosition).textContent = "X";

            document.getElementById("btn" + gridPosition).disabled = true;

        }

        ChangeTurn();
        
    }

}

//  Changes the current turn.
function ChangeTurn() {

    if (gameOn == true) {

        CheckVictory();

        if (currentTurn == player) {

            currentTurn = cpu;
            CPUMove();

        } else {

            currentTurn = player;

        }

    }

}

//  Runs the game
function init() {

    gameOn = false;

    document.getElementById("buttonBoard").className = "";
    document.getElementById("buttonBoard").className = "hideButtonBoard";

    document.getElementById("gameStats").className = "";
    document.getElementById("gameStats").className = "hideStats";

    //  The play button
    document.getElementById("btnPlay").addEventListener("click", function(){

        gameOn = true;

        document.getElementById("buttonBoard").className = "";
        document.getElementById("buttonBoard").className = "showButtonBoard";

        document.getElementById("gameStats").className = "";
        document.getElementById("gameStats").className = "showStats";

        document.getElementById(this.id).className = "";
        document.getElementById(this.id).className = "hidePlayButton";

        //  Decide who gets to take the first turn.
        const startingCoinFlip = Math.floor(Math.random() * 100);

        if (startingCoinFlip > 0 && startingCoinFlip < 50) {

            //  x start
            currentTurn = player;

        } else {

            //  0 start
            currentTurn = cpu;
            CPUMove();

        }

    });

    for (i = 0; i < 9; i++) {

        //  Sets the tile position of the button
        document.getElementById("btn" + i).setAttribute("data-gridPosition", i);

        document.getElementById("btn" + i).className = "";
        document.getElementById("btn" + i).className = "gameButtonNeutral";

        //  The button click event.
        document.getElementById("btn" + i).addEventListener("click", function() {

            if (gameOn == true) {

                PlayerMove(this.getAttribute("data-gridPosition"));

            }

        });
        
    }

}

init();