const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const recordsTable = document.getElementById('recordsTable');

let gravity = 0.8;
let velocity = 0;
let position = 250;
let gameStarted = false;
let gameEnded = false;
let score = 0;

document.addEventListener('keydown', flap);

function flap(event) {
    if (event.code === 'Space' && !gameEnded) {
        if (!gameStarted) {
            gameStarted = true;
            animate();
        }
        velocity -= 12;
    }
}

function animate() {
    if (gameEnded) return;

    velocity += gravity;
    position += velocity;

    if (position > 550) {
        gameOver();
    }

    if (position < 0) {
        position = 0;
        velocity = 0;
    }

    bird.style.bottom = position + 'px';
    
    if (!gameEnded) {
        requestAnimationFrame(animate);
    }
}

function gameOver() {
    gameEnded = true;
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;

    // Add score to records table
    let newRow = recordsTable.insertRow();
    let newCell = newRow.insertCell(0);
    newCell.textContent = score;
}

function restartGame() {
    gameEnded = false;
    gameOverScreen.style.display = 'none';
    position = 250;
    velocity = 0;
    score = 0;
    scoreDisplay.textContent = score;
    bird.style.bottom = position + 'px';
    clearRecordsTable();
}

function clearRecordsTable() {
    let rows = recordsTable.rows.length;
    for (let i = rows - 1; i > 0; i--) {
        recordsTable.deleteRow(i);
    }
}