const winnerBoxClassName = 'box__winner';
const nextBoxClassName = 'box__next';

const players = ['⭕', '❌'];
const boardWidth = 3;

class Regist {
    constructor() {
        this.turns = [];
        this.max = 3;
        this.points = 0;
    }

    add(index) {
        if (this.turns.length >= this.max) {
            boxes[this.turns[0]].innerText = '';
            this.turns.shift();
        }

        this.turns.push(index);
    }
}

const history = [new Regist(), new Regist()];

let currentTurn = 0;
let turnCount = 0;

function getCol(index) {
    return index % boardWidth;
}

function getRow(index) {
    return Math.floor(index / boardWidth);
}

function getIndex(col, row) {
    return col + boardWidth * row;
}

function nextTurn() {
    currentTurn ++;
    if (currentTurn > 1) currentTurn = 0;

    document.querySelector('.' + nextBoxClassName)?.classList.remove(nextBoxClassName);

    if (history[currentTurn].turns.length === 3) {
        const nextTurnBox = history[currentTurn].turns[0];
        boxes[nextTurnBox].classList.add(nextBoxClassName);
    }

    turnDisplay.dataset.trnPlayer = currentTurn;
}

function score(player) {
    history[player].turns.forEach(turn => {
        boxes[turn].classList.add(winnerBoxClassName);
    });

    history[player].points++;
    scoreDisplays[player].innerText = history[player].points;
}

function checkWin(index) {
    const row = getRow(index);
    const col = getCol(index);

    //check col
    for (let i = 0; i < boardWidth; i++) {
        if (boxes[getIndex(col, i)].innerText !== players[currentTurn]) break;

        if (i === boardWidth - 1) {
            return score(currentTurn);
        }
    }

    //check row

    for (let i = 0; i < boardWidth; i++) {
        if (boxes[getIndex(i, row)].innerText !== players[currentTurn]) break;

        if (i === boardWidth - 1) {
            return score(currentTurn);
        }
    }

    //check diags
    if (row === col) {
        for (let i = 0; i < boardWidth; i++) {
            if (boxes[getIndex(i, i)].innerText !== players[currentTurn]) break;

            if (i === boardWidth - 1) {
                return score(currentTurn);
            }
        }
    }

    if (row + col === boardWidth - 1) {
        for (let i = 0; i < boardWidth; i++) {
            if (boxes[getIndex(i, (boardWidth - 1) - i)].innerText !== players[currentTurn]) break;

            if (i === boardWidth - 1) {
                return score(currentTurn);
            }
        }
    }
}

const boxes = document.querySelectorAll('[data-box-id]');
const scoreDisplays = document.querySelectorAll('[data-score-player]');
const turnDisplay = document.querySelector('[data-trn-player]');

function onClickBox() {
    if (this.innerText) return;

    document.querySelectorAll('.' + winnerBoxClassName).forEach(box => {
        box.classList.remove(winnerBoxClassName);
    });
    
    this.innerText = players[currentTurn];
    turnCount++;
    
    const index = Number(this.dataset.boxId);
    history[currentTurn].add(index);
    checkWin(index);
    nextTurn();
}

boxes.forEach(box => {
    box.addEventListener('click', onClickBox);
});