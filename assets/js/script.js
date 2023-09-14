//Connecting the HTML element to a variable
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const welcomeText = document.getElementById('welcome-txt');
const questionContainerElement = document.getElementById('game-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let correctSound = new Audio('assets/audio/correct-answer.mp3');
let wrongSound = new Audio('assets/audio/wrong-answer.mp3');
const muteButton = document.getElementById('mute-button');
const unMuteButton = document.getElementById('unmute-button');

// Scoreboard variable
const numberAnswered = document.getElementById('total-answered');
const scoreBoard = document.getElementById('score');
let totalAnswered = 0;
let score = 0;
scoreBoard.innerHTML = score;
numberAnswered.innerHTML = totalAnswered;

//variable to check if question is answered
let questionAnswered = false;

let shuffledQuestions, currentQuestionIndex;

//When you press the 'Mute' or 'Unmute' button
muteButton.addEventListener('click', muteSound);
function muteColor(color) {
    muteButton.style.background = color;
}
unMuteButton.addEventListener('click', unMuteSound);
function unMuteColor(color) {
    unMuteButton.style.background = color;
}
var muteFlag = true;
function toggleMuteBoolean() {
    console.log(muteFlag);
    muteFlag = !muteFlag;
    console.log(muteFlag);
}
//Mute / Unmute button color change
function muteSound() {
    unMuteColor('#D9DDDC');
    muteColor('#ff9b9b50');
    if (muteFlag === false) {
        toggleMuteBoolean();
    }
}
function unMuteSound() {
    muteColor('#D9DDDC');
    unMuteColor('#81996750');
    if (muteFlag === true) {
        toggleMuteBoolean();
    }
}

//When you press the "Start" or "Next" buttons
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
//Function to hide the welcome page and start the quiz itself
function startGame() {
    console.log('started');
    score = 0;
    scoreBoard.innerHTML = score;
    startButton.classList.add('hide');
    welcomeText.classList.add('hide');
    /* Randomization of all questions,
   explained and credited from: https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540 */
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

//Function to call the right function to reset all elements and show the next question & options
function setNextQuestion() {
    resetState();
    //Picking a question out of the randomized array
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    showQuestion(currentQuestion);
}

/*Bringing a question from the array and setting its text and creating the option buttons
with the right text-content and the "correct" dataset to let you know if the answer is correct*/
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
//Removing all option buttons and hiding the next button for the next round of the quiz
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    questionAnswered = false;
}
//Selecting a button by clicking it, checking if its the correct answer
function selectAnswer(e) {
    //if the player has already answered
    if (questionAnswered) {
        return;
    }
    const selectedButton = e.target;
    selectedButton.classList.add('selected');
    const correct = selectedButton.dataset.correct;
    // Check if the answer is correct and update the score
    if (correct) {
        score++;
        scoreBoard.innerHTML = score;
        if (muteFlag == false){
        correctSound.play();}
    } else {
        if (muteFlag == false) {
        wrongSound.play();}
    }
    // Set status class for all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    //if an answer is selected
    questionAnswered = true;
    if (questionAnswered) {
        totalAnswered++;
        numberAnswered.innerHTML = totalAnswered;
    }
    /*When a option is chosen it checks if there are questions left to show in the array
    if not it will show a restart button that resets the game*/
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Go Again!';
        startButton.classList.remove('hide');
    }
}
//setting the statusclass for all answers to the pre-determined class (wrong/correct)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

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
    {
        question: 'Which famous Italian grape variety is known as "Chiavennasca" in the Valtellina region?',
        answers: [
            { text: 'Nebbiolo', correct: true },
            { text: 'Barbera', correct: false },
            { text: 'Amarone', correct: false },
            { text: 'Sangiovese', correct: false },
        ]
    },
    {
        question: 'Which grape variety is the most widely planted vine variety in eastern USA?',
        answers: [
            { text: 'Chardonnay', correct: false },
            { text: 'Cabernet Sauvignon', correct: false },
            { text: 'Solaris', correct: false },
            { text: 'Concord', correct: true },
        ]
    },
    {
        question: 'Which of these countries has the highest wine consumption per capita in the world?',
        answers: [
            { text: 'Luxembourg', correct: true },
            { text: 'Switzerland', correct: false },
            { text: 'France', correct: false },
            { text: 'Italy', correct: false },
        ]
    },
    {
        question: 'What is the more popular name for the dark skinned Côt grape variety?',
        answers: [
            { text: 'Shiraz', correct: false },
            { text: 'Cabernet Franc', correct: false },
            { text: 'Malbec', correct: true },
            { text: 'Aglianico', correct: false },
        ]
    },
    {
        question: 'Egg whites are sometimes used as a fining agent for young red wines and it is adsorbing the harsh and bitter tannins making the wine more pleasent to drink, approximately how many egg whites would you use for a 225 liter barrel of wine?',
        answers: [
            { text: '5', correct: true },
            { text: '20', correct: false },
            { text: '35', correct: false },
            { text: '50', correct: false },
        ]
    },
    {
        question: 'What is the name of Ethiopias only winery?',
        answers: [
            { text: 'African Wine', correct: false },
            { text: 'Golden Sands Vineyards', correct: false },
            { text: 'Addis Ababa Winery', correct: false },
            { text: 'Awash Wine', correct: true },
        ]
    },
    {
        question: 'What was the most famous and most highly prized wine of Italy in the Roman period?',
        answers: [
            { text: 'Amarone', correct: false },
            { text: 'Falernum', correct: true },
            { text: 'Vino Abruzzo', correct: false },
            { text: 'Barolo', correct: false },
        ]
    },
    {
        question: 'What is the main grape variety in the fresh wite wines from Soave, Italy?',
        answers: [
            { text: 'Pinot Grigio', correct: false },
            { text: 'Chardonnay', correct: false },
            { text: 'Garganega', correct: true },
            { text: 'Pecorino', correct: false },
        ]
    }, {
        question: 'When did we first use glass vessels with wine or other beverages?',
        answers: [
            { text: 'ca 3000 BC', correct: false },
            { text: 'ca 1500 BC', correct: true },
            { text: 'ca 500 AD', correct: false },
            { text: 'ca 1500 AD', correct: false },
        ]
    },
    {
        question: 'What are the "teinturier" grape varieties known for?',
        answers: [
            { text: 'Their extra delicious flavour', correct: false },
            { text: 'Their high acidity for a fhresher wine', correct: false },
            { text: 'Their early ripeness for sweet wines', correct: false },
            { text: 'Their red flesh for darker wines', correct: true },
        ]
    },
    {
        question: 'Grauburgunder is the German synonym for which grape variety?',
        answers: [
            { text: 'Pinot Gris', correct: true },
            { text: 'Pinot Noir', correct: false },
            { text: 'Pinot Blanc', correct: false },
            { text: 'Pinot Meunier', correct: false },
        ]
    },
    {
        question: 'How much wine does a magnum bottle contain?',
        answers: [
            { text: '1 liter', correct: false },
            { text: '1.5 liter', correct: true },
            { text: '2 liter', correct: false },
            { text: '2.5 liter', correct: false },
        ]
    },
    {
        question: 'Is the grape Listán on the Canary Islands the same as Palomino in Jerez? ',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false },
        ]
    },
    {
        question: 'How many Grand Cru vineyards are there in Chablis?',
        answers: [
            { text: '11', correct: false },
            { text: '9', correct: false },
            { text: '7', correct: true },
            { text: '5', correct: false },
        ]
    },
    {
        question: "Which is the world famous sweet wine area in Hungary?",
        answers: [
            { text: 'Tokaji', correct: true },
            { text: 'Sauternes', correct: false },
            { text: 'Sopron', correct: false },
            { text: 'Somló', correct: false },
        ]
    },
    {
        question: 'What is Hondarrabi?',
        answers: [
            { text: 'A Czech wine region', correct: false },
            { text: 'A family of spanish basque vine varieties', correct: true },
            { text: 'A production method used in Georgia', correct: false },
            { text: 'A wine producer in Lebanon ', correct: false },
        ]
    },
    {
        question: 'Which was the first federally approved American Viticultural Area (AVA)? It was approved on June 20th 1980. ',
        answers: [
            { text: 'Augusta AVA, Missouri', correct: true },
            { text: 'Willamette Valllay AVA, Oregon', correct: false },
            { text: 'Lodi AVA, California', correct: false },
            { text: 'Mendocino AVA, California', correct: false },
        ]
    },
    {
        question: 'Upper Mississippi River Valley AVA is the largest Amercan Viticultural Area, how big is it?',
        answers: [
            { text: 'Approx. 77 000 hectar', correct: false },
            { text: 'Approx. 770 000 hectar', correct: false },
            { text: 'Approx. 7 700 000 hectar', correct: true },
            { text: 'Approx. 77 000 000 hectar', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Vintage Champagne before released on the marked? ',
        answers: [
            { text: '48 months on the lees', correct: false },
            { text: '36 months on the lees', correct: true },
            { text: '24 months on the lees', correct: false },
            { text: '12 months on the lees', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Non Vintage (NV) Champagne before released on the marked?',
        answers: [
            { text: '9 months on the lees', correct: false },
            { text: '12 months on the lees', correct: false },
            { text: '15 months on the lees', correct: true },
            { text: '18 months on the lees', correct: false },
        ]
    },
    {
        question: 'How many wineregions are there in Italy?',
        answers: [
            { text: '20', correct: true },
            { text: '19', correct: false },
            { text: '18', correct: false },
            { text: '17', correct: false },
        ]
    },
    {
        question: 'How many wine regions are there in Germany?',
        answers: [
            { text: '10', correct: false },
            { text: '11', correct: false },
            { text: '12', correct: false },
            { text: '13', correct: true },
        ]
    },
    {
        question: 'How sweet are the sweetes Tokaji dessertwines?',
        answers: [
            { text: 'Aprox. 400 grams of sugar per liter', correct: false },
            { text: 'Aprox. 600 grams of sugar per liter', correct: false },
            { text: 'Aprox. 800 grams of sugar per liter', correct: true },
            { text: 'Aprox. 1000 grams of sugar per liter', correct: false },
        ]
    },
    {
        question: 'What is the local name for the Chardonnay variety in Steiermark, Austria?',
        answers: [
            { text: 'Weissburgunder', correct: false },
            { text: 'Kerner', correct: false },
            { text: 'Burgunderriesling', correct: false },
            { text: 'Morillon', correct: true },
        ]
    },
    {
        question: 'Which german region is famous for its round-shaped bottle called "Bocksbeutel"?',
        answers: [
            { text: 'Franken', correct: true },
            { text: 'Mosel', correct: false },
            { text: 'Rheingau', correct: false },
            { text: 'Württemberg', correct: false },
        ]
    },
    {
        question: 'What is the name of the bug that killed most of Europes vineyards betsween 1860-1910?',
        answers: [
            { text: 'Diptera', correct: false },
            { text: 'Caelifera', correct: false },
            { text: 'Culicidae', correct: false },
            { text: 'Phylloxera', correct: true },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Cava before released on the marked?',
        answers: [
            { text: '3 months on the lees', correct: false },
            { text: '6 months on the lees', correct: false },
            { text: '9 months on the lees', correct: true },
            { text: '12 months on the lees', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Cava Reserva before released on the marked?',
        answers: [
            { text: '12 months on the lees', correct: false },
            { text: '15 months on the lees', correct: true },
            { text: '18 months on the lees', correct: false },
            { text: '24 months on the lees', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Cava Gran Reserva before released on the marked?',
        answers: [
            { text: '18 months on the lees', correct: false },
            { text: '24 months on the lees', correct: false },
            { text: '30 months on the lees', correct: true },
            { text: '36 months on the lees', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Cava de Paraje Calificado before released on the marked?',
        answers: [
            { text: '36 months on the lees', correct: true },
            { text: '48 months on the lees', correct: false },
            { text: '60 months on the lees', correct: false },
            { text: '72 months on the lees', correct: false },
        ]
    },
    {
        question: 'What is the minimum aging requirement for Barolo before released on the marked?',
        answers: [
            { text: '18 months in total, minimum 6 of them in barrel', correct: false },
            { text: '24 months in total, minimum 12 of them in barrel', correct: false },
            { text: '36 months in total, minimum 18 of them in barrel', correct: true },
            { text: '48 months in total, minimum 24 of them in barrel', correct: false },
        ]
    },
];