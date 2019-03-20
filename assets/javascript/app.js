let time = 30,
    playerguess = false, 
    timer,
    i = 0,
    correctGuess = 0
    wrongGuess = 0,
    questions = [
    {
        question: 'Which of the following is Stitch experiment number?',
        correctanswer: 'Experiment 626',
        answer: ['Experiment 100', 'Experiment 625', 'Experiment 626', 'Experiment 101'],
        imgUrl: './assets/images/stitch.jpg'
    },
    {
        question: 'Which of the following lyrics does not follow "Be a man..."?',
        correctanswer: 'Tranquil as a forest but on fire within',
        answer: ['We must be swift as the coursing river', 'Tranquil as a forest but on fire within', 'With all the force of a great typhoon', 'With all the strength of a raging fire'],
        imgUrl: './assets/images/mulan.jpg'
    },
    {
        question: 'Who is the oldest Disney Princess',
        correctanswer: 'Snow White',
        answer: ['Cinderella', 'Aurora', 'Belle', 'Snow White'],
        imgUrl: './assets/images/snow-white.jpg'
    },
    {
        question: `What is the name of Belle's dad`,
        correctanswer: 'Maurice',
        answer: ['Maurice', 'LeFou', 'Stefan', 'Frederic'],
        imgUrl: './assets/images/maurice.jpg'
    },
    {
        question: 'Who created Stitch?',
        correctanswer: 'Jumba',
        answer: ['Gantu', 'Jumba', 'Pleakley', 'Lilo'],
        imgUrl: './assets/images/jumba.png'
    },
    {
        question: 'Which of the following will be revealed as a new "Land" in Disneyland during Summer of 2019?',
        correctanswer: `Galaxy's Edge`,
        answer: ['Marvel Land', `Galaxy's Edge`, 'Epcot', 'Naboo City'],
        imgUrl: './assets/images/galaxy.jpg'
    },
    {
        question: 'In the Lion King 2, who was Kovu?',
        correctanswer: `Scar's apppointed heir`,
        answer: [`Scar's apppointed heir`, `Simba and Nala's son`, `Kiara's enemy`, `Scar's biological son`],
        imgUrl: './assets/images/kovu.jpg'
    },
    {
        question: 'How long has the Genie been imprisoned?',
        correctanswer: '10,000 years',
        answer: ['100 years', '8,000 years', '50 years', '10,000 years'],
        imgUrl: './assets/images/genie.jpg'
    },
    {
        question: 'Cruella De Vil is a villian in which Disney movie?',
        correctanswer: '101 Dalmatians',
        answer: ['Lady and the Tramp', 'Oliver and Company','101 Dalmatians', 'The Fox and the Hound'],
        imgUrl: './assets/images/cruella.jpg'
    },
    {
        question: `What did they always get wrong on Flynn Rider's wanted poster?`,
        correctanswer: 'His nose',
        answer: ['His nose','His eyes', 'His Jaw', 'His hair'],
        imgUrl: './assets/images/flynn.jpg'
    }
]
let answerbtn = document.querySelectorAll('#answer1, #answer2, #answer3, #answer4')

// function to add/change element's text
const addText = (a, b) => {
    document.querySelector(a).innerHTML = b
}

const hideAnswer = () => {
    answerbtn.forEach(function(hide) {
        hide.style.visibility = 'hidden'
    });
}
const showAnswer = () => {
    answerbtn.forEach(function(show) {
        show.style.visibility = ''
    });
}

// translate second into minutes and set as 00:00
const totalTime = _ => {
    minutes = Math.floor(time / 60)
    seconds = time % 60
    minutes = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes.toString()[0]}${minutes.toString()[1]}`
    seconds = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds.toString()[0]}${seconds.toString()[1]}`
    return `${minutes}:${seconds}`
}

// start count down
const startTimer = () => {
    timer = setInterval(() => {
        time--
        addText('.timer',totalTime())
        // when timer reach 0 show correct answer, stop timer, increase wrong guess, run new question
        if (time < 1) {
            addText('.question',`The correct answer is: ${questions[i].correctanswer}`)
            document.querySelector('.picture').src = questions[i].imgUrl
            hideAnswer()
            clearInterval(timer)
            wrongGuess++
            setTimeout(newQuestion, 3000)
        }
    }, 1000)
}

// when all questions has been ran, stop timer and calculate total score
const finalScore = () => {
    if (i === questions.length){
        clearInterval(timer)
        hideAnswer()
        setTimeout(function (){
            if (correctGuess >= 6){
                addText('.question','You sure know your Disney facts!')
                addText('.result',`Correct answer: ${correctGuess}<br/> Wrong answer: ${wrongGuess}`)
                document.querySelector('.picture').src = './assets/images/happy.jpg'
            } else {
                addText('.question','You need more Disney magic in your life')
                addText('.result',`Correct answer: ${correctGuess}<br/> Wrong answer: ${wrongGuess}`)
                document.querySelector('.picture').src = './assets/images/sad.jpg'
            }
        }, 2000)

        // after total score been shown; create reset button
        setTimeout(function (){
            addText('.result','')
            addText('.question','')
            document.querySelector('.picture').src = ''
            let restartbtn = document.createElement('button')
            restartbtn.textContent = 'Restart Game'
            restartbtn.className = 'restart'
            document.querySelector('.result').append(restartbtn)
        }, 8000)
    }
}

// click start button to start game
let startGame = () => {
        startTimer()
        showAnswer()
        finalScore()
        document.querySelector('.startbtn').style.visibility = 'hidden'
        addText('.question',questions[i].question)
        addText('#answer1',questions[i].answer[0])
        addText('#answer2',questions[i].answer[1])
        addText('#answer3',questions[i].answer[2])
        addText('#answer4',questions[i].answer[3])
}

// add next question when time reaches 0 or answer been clicked; 
const newQuestion = () => {
    if (time === 0 || playerguess === true){
        playerguess = false
        i++
        time = 30
        startGame()
        document.querySelector('.picture').src = ''
        addText('.result','')
        addText('.timer','00:30')
        showAnswer()
    }
}

document.addEventListener('click', ({target}) => {
    // stop timer, show if user choice is right or wrong
    if (target.className === 'answer') {
        playerguess = true
        clearInterval(timer)
        document.querySelector('.picture').src = questions[i].imgUrl
        // if right, announce correct and increase correct guess
        if (target.textContent === questions[i].correctanswer) {
            addText('.question','Correct!')
            hideAnswer()
            correctGuess++
            setTimeout(newQuestion, 3000)
        // if wrong, annouce wrong + correct answer and increase wrong guess
        } else{
            addText('.question','Nope!')
            addText('.result',`The correct answer is: ${questions[i].correctanswer}`)
            hideAnswer()
            wrongGuess++
            setTimeout(newQuestion, 3000)
        }
    // reset game when restart button is clicked
    } else if (target.className === 'restart') {
            time = 30
            playerguess = false 
            timer
            i = 0
            correctGuess = 0
            wrongGuess = 0
            addText('.timer','00:30')
            addText('.result','')
            startGame()
        }
})

hideAnswer()