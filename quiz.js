let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        questions = data.results;
        showQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        
        questionElement.innerText = question.question;
        const options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
        
        optionsElement.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('option-button');
            button.onclick = () => checkAnswer(button, option);
            optionsElement.appendChild(button);
        });
    } else {
        displayResult();
    }
}

function checkAnswer(button, selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = 'green';
        score++;
    } else {
        button.style.backgroundColor = 'red';
      
        score=score-0.5;
      
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function displayResult() {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `You scored ${score} out of ${questions.length}`;
}

fetchQuestions();
