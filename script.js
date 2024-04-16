document.addEventListener("DOMContentLoaded", function () {
    const bird = document.getElementById("bird");
    const pipeTop = document.getElementById("pipeTop");
    const pipeBottom = document.getElementById("pipeBottom");
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("highScore");
    const scoreTable = document.getElementById("scoreTable");
    const submitButton = document.getElementById("submitButton");
    const nameInput = document.getElementById("nameInput");
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;

    let birdTop = 200;
    let birdLeft = 50;
    let birdVelocity = 0;
    const gravity = 0.5;
    const jumpStrength = -10;
    const pipeSpeed = 3;
    let pipeLeft = 400;

    function flap() {
        birdVelocity = jumpStrength;
    }

    function updateBird() {
        birdVelocity += gravity;
        birdTop += birdVelocity;
        bird.style.top = birdTop + "px";

        // Check if bird is out of game area
        if (birdTop < 0 || birdTop + 30 > 600) {
            gameOver();
        }
    }

    function updatePipes() {
        pipeLeft -= pipeSpeed;
        pipeTop.style.left = pipeBottom.style.left = pipeLeft + "px";

        if (pipeLeft <= -50) {
            pipeLeft = 400;
            pipeTop.style.height = Math.random() * 400 + "px";
            pipeBottom.style.height = 600 - parseInt(pipeTop.style.height, 10) - 200 + "px";
            score++;
            scoreDisplay.textContent = score;
        }

        if (
            (birdLeft + 40 > pipeLeft && birdLeft < pipeLeft + 50) &&
            (birdTop < parseInt(pipeTop.style.height, 10) || birdTop + 30 > 600 - parseInt(pipeBottom.style.height, 10))
        ) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreDisplay.textContent = highScore;
            }
            gameOver();
        }
    }

    function gameOver() {
        alert("Game Over! Your score is: " + score);
        addToScoreTable(score);
        resetGame();
    }

    function resetGame() {
        score = 0;
        scoreDisplay.textContent = score;
        birdTop = 200;
        bird.style.top = birdTop + "px";
        pipeLeft = 400;
    }

    function addToScoreTable(score) {
        const row = scoreTable.insertRow(1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = nameInput.value || "Anonymous";
        cell2.textContent = score;
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            flap();
        }
    });

    function gameLoop() {
        updateBird();
        updatePipes();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
