var correctAnswers = 0;
var wrongAnswers = 0;
var randoms = [];
var correct = 0;
var wrong = 0;
var count = 0;
var numberOfQuestions = 40; // Default number of questions
var timer = null; // Timer reference
var timeLimit = 10; // Time limit in seconds for each question

function generateRandomNumbers(from, to) {
    let num1 = Math.ceil(Math.random() * to) + from;
    let num2 = Math.ceil(Math.random() * to) + from;

    // Set on DOM
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    return [num1, num2];
}

function createSparkles() {
    const container = document.getElementById('questionary');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        container.appendChild(sparkle);

        // Remove the sparkle after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function checkAnswer() {
    let answer = parseInt(document.getElementById('userAnswer').value);

    if ((randoms[0] + randoms[1]) === answer) {
        correct++;
        document.getElementById('correct').textContent = correct;

        // Trigger sparkle effect
        createSparkles();

        // Automatically proceed to the next question after a delay
        setTimeout(() => callNextProblem(), 1500); // 1.5 seconds delay
    } else {
        wrong++;
        document.getElementById('wrong').textContent = wrong;

        // Show the correct answer
        alert(`Wrong! The correct answer was ${randoms[0] + randoms[1]}`);
    }

    // Stop the timer after the answer
    clearInterval(timer);
    document.getElementById('checkAnswer').disabled = true; // Disable button until the next question
}

function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            wrong++; // Increment wrong answers if time runs out
            document.getElementById('wrong').textContent = wrong;

            // Show the correct answer when time runs out
            alert(`Time's up! The correct answer was ${randoms[0] + randoms[1]}`);

            document.getElementById('checkAnswer').disabled = true;
        }
    }, 1000);
}

function callNextProblem() {
    if (count >= numberOfQuestions) {
        alert("Quiz complete! Great job!");
        return;
    }

    randoms = generateRandomNumbers(-5, 10);
    document.getElementById('userAnswer').value = '';
    count++;

    // Update the current question number
    document.getElementById('currentQuestion').textContent = `Question ${count} of ${numberOfQuestions}`;

    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start a new timer

    document.getElementById('checkAnswer').disabled = false; // Re-enable the button
}

document.addEventListener("DOMContentLoaded", function () {
    correctAnswers = 0;
    wrongAnswers = 0;

    // Prompt the user for the number of questions if desired
    numberOfQuestions = parseInt(prompt("Enter the number of questions (minimum 40):", 40));
    if (isNaN(numberOfQuestions) || numberOfQuestions < 40) {
        numberOfQuestions = 40; // Default to 40 if input is invalid or less than 40
    }

    randoms = [];
    count = 0;

    document.getElementById('correct').textContent = '0';
    document.getElementById('wrong').textContent = '0';
    document.getElementById('currentQuestion').textContent = `Question 0 of ${numberOfQuestions}`; // Initial display

    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

    // Allow pressing Enter to check the answer
    document.getElementById('userAnswer').addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && !document.getElementById('checkAnswer').disabled) {
            checkAnswer();
        }
    });

    document.getElementById('nextProblem').addEventListener('click', callNextProblem);
});
