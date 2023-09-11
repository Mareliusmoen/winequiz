const startButton = document.getElementById('start-button')
const welcomeText = document.getElementById('welcome-txt')
const questionContainerElement = document.getElementById('game-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    welcomeText.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question)

function selectAnswer() {

}
const questions = [
    {
        question: 'What is the main grape variety in Prosecco wines?',
        answers: [
            { text: 'Glera', correct: true },
            { text: 'Chardonnay', correct: false },
        ]
    }
]