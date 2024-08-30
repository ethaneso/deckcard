let questions = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Load questions from JSON file
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));

    // Event listeners for buttons
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            displayQuestion();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayQuestion();
        }
    });

    document.getElementById('shuffleBtn').addEventListener('click', () => {
        shuffleQuestions();
        currentIndex = 0;
        displayQuestion();
    });
});

function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentIndex]?.question || 'No questions available.';

    // Enable/disable buttons based on current index
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === questions.length - 1;
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}
