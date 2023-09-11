const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const welcomeText = document.getElementById('welcome-txt')
const questionContainerElement = document.getElementById('game-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
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
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    selectedButton.classList.add('selected')
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
}   else {
    startButton.innerText = 'Go Again!'
    startButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// All the questions
const questions = [
    {
        question: 'What is the main grape variety in Prosecco wines?',
        answers: [
            { text: 'Glera', correct: true },
            { text: 'Chardonnay', correct: false },
            { text: 'Riesling', correct: false },
            { text: 'Vermentino', correct: false },
        ]
    },
    {
        question: 'Which are the 3 main grape varieties in Champagne?',
        answers: [
            { text: 'Riesling, Pinot Noir, Glara', correct: false },
            { text: 'Chardonnay, Pinot Gris, Syrah', correct: false },
            { text: 'Chardonnay, Pinot Noir, Pinot Menuer', correct: true },
            { text: 'Cabernet Sauvignon, Pinot Noir, Syrah', correct: false },
        ]
    },
    {
        question: 'What is the latin name of the White American Oak know for giving wine (and spirits) a distinct vanilla aroma and subtly sweet spices?',
        answers: [
            { text: 'Quercus Rebus', correct: false },
            { text: 'Quercus Alba', correct: true },
            { text: 'Quercus Americanus', correct: false },
            { text: 'Quercus Maximus', correct: false },
        ]
    },
    {
        question: 'Which part of the cork oak do we use to produce the corks for the wine industry?',
        answers: [
            { text: 'The wood', correct: false },
            { text: 'The leaves', correct: false },
            { text: 'The nuts', correct: false },
            { text: 'The bark', correct: true },
        ]
    },
    {
        question: 'What is the most grown grape variety in Germany?',
        answers: [
            { text: 'Chardonnay', correct: false },
            { text: 'Weissburgunder', correct: false },
            { text: 'Riesling', correct: true },
            { text: 'Spätburgunder', correct: false },
        ]
    },
    {
        question: 'What is Bourboulenc?',
        answers: [
            { text: 'A french village', correct: false },
            { text: 'A french tractor-producer', correct: false },
            { text: 'A famous winemaker', correct: false },
            { text: 'A french grape variety', correct: true },
        ]
    },
    {
        question: 'When was the bag-in-box container developed and used by the wine industry?',
        answers: [
            { text: '1960s', correct: false },
            { text: '1970s', correct: true },
            { text: '1980s', correct: false },
            { text: '1990s', correct: false },
        ]
    },
    {
        question: 'What is the most famous white grape variety in Bourgogne, France?',
        answers: [
            { text: 'Gewürstraminer', correct: false },
            { text: 'Montrachet', correct: false },
            { text: 'Chardonnay', correct: true },
            { text: 'Chablis', correct: false },
        ]
    },
    {
        question: 'Where in Italy is Brunello di Montalcino located?',
        answers: [
            { text: 'Toscana', correct: true },
            { text: 'Sicily', correct: false },
            { text: 'Veneto', correct: false },
            { text: 'Piedmont', correct: false },
        ]
    },
]