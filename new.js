var correctAnswers = 0;
var wrongAnswers = 0;
var randoms = [];
var correct = 0;
var wrong = 0;
var count = 1; // Start from Question 1
var numberOfQuestions = 20; // Default number of questions
var timer = null; // Timer reference
var timeLimit = 30; // Updated time limit to 30 seconds for each question

var operation = ''; // New variable to hold the operation type (addition, subtraction, or multiplication)

function generateRandomNumbers(from, to) {
    let num1 = Math.ceil(Math.random() * to) + from;
    let num2 = Math.ceil(Math.random() * to) + from;

    // Randomly select an operation
    const operations = ['+', '-', '*']; // Operations: addition, subtraction, multiplication
    operation = operations[Math.floor(Math.random() * operations.length)]; // Random operation

    // Set numbers and operation in DOM
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    document.getElementById('operation').textContent = operation;

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
    let correctAnswer;

    // Check the answer based on the operation
    switch (operation) {
        case '+':
            correctAnswer = randoms[0] + randoms[1];
            break;
        case '-':
            correctAnswer = randoms[0] - randoms[1];
            break;
        case '*':
            correctAnswer = randoms[0] * randoms[1];
            break;
        default:
            correctAnswer = 0;
    }

    if (correctAnswer === answer) {
        correct++;
        document.getElementById('correct').textContent = correct;

        // Trigger sparkle effect
        createSparkles();
    } else {
        wrong++;
        document.getElementById('wrong').textContent = wrong;

        // Show the correct answer
        alert(`Wrong! The correct answer was ${correctAnswer}`);
    }

    // Stop the timer after the answer
    clearInterval(timer);

    // Disable the check answer button until the next question
    document.getElementById('checkAnswer').disabled = true;

    // Automatically proceed to the next question after a short delay (1.5 seconds)
    setTimeout(() => callNextProblem(), 1500); // 1.5 seconds delay
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
            let correctAnswer;
            switch (operation) {
                case '+':
                    correctAnswer = randoms[0] + randoms[1];
                    break;
                case '-':
                    correctAnswer = randoms[0] - randoms[1];
                    break;
                case '*':
                    correctAnswer = randoms[0] * randoms[1];
                    break;
                default:
                    correctAnswer = 0;
            }

            alert(`Time's up! The correct answer was ${correctAnswer}`);

            document.getElementById('checkAnswer').disabled = true;

            // Automatically proceed to the next question after a short delay (1.5 seconds)
            setTimeout(() => callNextProblem(), 1500); // 1.5 seconds delay
        }
    }, 1000);
}

function callNextProblem() {
    if (count > numberOfQuestions) {
        // Calculate the percentage score when the quiz is finished
        let percentage = Math.round((correct / numberOfQuestions) * 100);
        alert(`Quiz complete! You scored ${correct} out of ${numberOfQuestions} (${percentage}%)`);

        // Optionally, display the result in the DOM
        document.getElementById('result').textContent = `You scored ${percentage}% (${correct} out of ${numberOfQuestions})`;
        return;
    }

    randoms = generateRandomNumbers(1, 10); // You can adjust the range if needed
    document.getElementById('userAnswer').value = '';

    // Update the current question number
    document.getElementById('currentQuestion').textContent = `Question ${count} of ${numberOfQuestions}`;
    count++;

    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start a new timer

    document.getElementById('checkAnswer').disabled = false; // Re-enable the button
}

document.addEventListener("DOMContentLoaded", function () {
    correctAnswers = 0;
    wrongAnswers = 0;

    // Prompt the user for the number of questions if desired
    numberOfQuestions = parseInt(prompt("Enter the number of questions (minimum 20):", 20));
    if (isNaN(numberOfQuestions) || numberOfQuestions < 40) {
        numberOfQuestions = 20; // Default to 40 if input is invalid or less than 40
    }

    randoms = generateRandomNumbers(1, 10); // Generate the first question
    document.getElementById('correct').textContent = '0';
    document.getElementById('wrong').textContent = '0';
    document.getElementById('currentQuestion').textContent = `Question ${count} of ${numberOfQuestions}`; // Start display

    startTimer(); // Start timer for the first question

    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

    // Allow pressing Enter to check the answer
    document.getElementById('userAnswer').addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && !document.getElementById('checkAnswer').disabled) {
            checkAnswer();
        }
    });

    document.getElementById('nextProblem').addEventListener('click', callNextProblem);
});
