const startButton = document.getElementById('start-button')
const welcomeText = document.getElementById('welcome-txt')
const questionContainerElement = document.getElementById('game-container')

startButton.addEventListener('click', startGame)

function startGame() {
console.log('started')
startButton.classList.add('hide')
welcomeText.classList.add('hide')
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {

}

function selectAnswer() {

}