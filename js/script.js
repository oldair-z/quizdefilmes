const playButton = document.getElementById('play-button');
const quizContainer = document.getElementById('quiz-container');
const typingText = document.getElementById('typing-text');
const questionSection = document.getElementById('question-section');
const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let currentQuestion = 0;
let score = 0;

// Perguntas e Respostas (filmes/séries)
const questions = [
    {
        question: "Qual destes filmes foi dirigido por David Fincher?",
        options: ["Seven: Os Sete Crimes Capitais", "O Silêncio dos Inocentes"],
        correct: 0,
    },
    {
        question: "Qual destas séries tem como tema principal drogas?",
        options: ["Breaking Bad", "Game of Thrones"],
        correct: 0,
    },
    {
        question: "Qual destes filmes ganhou o Oscar de Melhor Filme?",
        options: ["O Silêncio dos Inocentes", "O Exorcista"],
        correct: 0,
    },
    {
        question: "Qual destes filmes é baseado em um livro de Stephen King?",
        options: ["IT: A Coisa", "Duna"],
        correct: 0,
    }
];

// Função de digitação
function typeText(text, callback) {
    let i = 0;
    typingText.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

// Mostrar pergunta
function showQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    options.forEach((option, index) => {
        option.textContent = current.options[index];
        option.dataset.correct = index === current.correct;
    });
    questionSection.classList.remove('hidden');
}

// Iniciar quiz
playButton.addEventListener('click', () => {
    document.getElementById('main').classList.add('hidden');
    quizContainer.classList.remove('hidden');
    typeText('Olá, seja bem-vindo ao Quiz!', () => {
        showQuestion();
    });
});

// Verificar resposta
options.forEach(option => {
    option.addEventListener('click', (e) => {
        const isCorrect = e.target.dataset.correct === 'true';
        if (isCorrect) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
});

// Mostrar resultado
function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `Você acertou ${score} de ${questions.length}. ${score >= 3 ? 'Parabéns!' : 'Dá para melhorar!'}`;
}

// Reiniciar quiz
restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
});
