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

const hideAnswer = () => {
    document.querySelector('#answer1').style.visibility = 'hidden'
    document.querySelector('#answer2').style.visibility = 'hidden'
    document.querySelector('#answer3').style.visibility = 'hidden'
    document.querySelector('#answer4').style.visibility = 'hidden'
}
const showAnswer = () => {
    document.querySelector('#answer1').style.visibility = ''
    document.querySelector('#answer2').style.visibility = ''
    document.querySelector('#answer3').style.visibility = ''
    document.querySelector('#answer4').style.visibility = ''
}

const totalTime = _ => {
    minutes = Math.floor(time / 60)
    seconds = time % 60
    minutes = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes.toString()[0]}${minutes.toString()[1]}`
    seconds = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds.toString()[0]}${seconds.toString()[1]}`
    return `${minutes}:${seconds}`
}

const startTimer = () => {
    timer = setInterval(() => {
        time--
        document.querySelector('.timer').innerHTML = totalTime()
        if (time < 1) {
            document.querySelector('.question').innerHTML = `The correct answer is: ${questions[i].correctanswer}`
            hideAnswer()
            clearInterval(timer)
            wrongGuess++
            setTimeout(newQuestion, 3000)
        }
    }, 1000)
}

const finalScore = () => {
    if (i === questions.length){
        clearInterval(timer)
        hideAnswer()
        setTimeout(function (){
            if (correctGuess >= 6){
                document.querySelector('.question').innerHTML = `You sure know your Disney facts!`
                document.querySelector('.result').innerHTML = `Correct answer: ${correctGuess}<br/> Wrong answer: ${wrongGuess}`
                document.querySelector('.picture').src = './assets/images/happy.jpg'
            } else {
                document.querySelector('.question').innerHTML = `You need more Disney magic in your life`
                document.querySelector('.result').innerHTML = `Correct answer: ${correctGuess}<br/> Wrong answer: ${wrongGuess}`
                document.querySelector('.picture').src = './assets/images/sad.jpg'
            }
        }, 2000)
        setTimeout(function (){
            document.querySelector('.result').innerHTML = ``
            document.querySelector('.picture').src = ''
            document.querySelector('.question').innerHTML = ''
            let restartbtn = document.createElement('button')
            restartbtn.textContent = 'Restart Game'
            restartbtn.className = 'restart'
            document.querySelector('.result').append(restartbtn)
        }, 8000)
    }
}

let startGame = () => {
        startTimer()
        showAnswer()
        finalScore()
        document.querySelector('.startbtn').style.visibility = 'hidden'
        document.querySelector('.question').innerHTML = questions[i].question
        document.querySelector('#answer1').textContent = questions[i].answer[0]
        document.querySelector('#answer2').textContent = questions[i].answer[1]
        document.querySelector('#answer3').textContent = questions[i].answer[2]
        document.querySelector('#answer4').textContent = questions[i].answer[3]
}

const newQuestion = () => {
    if (time === 0 || playerguess === true){
        playerguess = false
        i++
        time = 30
        startGame()
        document.querySelector('.picture').src = ''
        document.querySelector('.result').innerHTML = ``
        document.querySelector('.timer').innerHTML = '00:30'
        showAnswer()
    }
}

document.addEventListener('click', ({target}) => {
    if (target.className === 'answer') {
        playerguess = true
        clearInterval(timer)
        document.querySelector('.picture').src = questions[i].imgUrl
        if (target.textContent === questions[i].correctanswer) {
            document.querySelector('.question').innerHTML = 'Correct!'
            hideAnswer()
            correctGuess++
            setTimeout(newQuestion, 3000)
        } else{
            document.querySelector('.question').innerHTML = 'Nope!'
            document.querySelector('.result').innerHTML = `The correct answer is: ${questions[i].correctanswer}`
            hideAnswer()
            wrongGuess++
            setTimeout(newQuestion, 3000)
        }
    } else {
        if (target.className === 'restart') {
            time = 30
            playerguess = false 
            timer
            i = 0
            correctGuess = 0
            wrongGuess = 0
            document.querySelector('.timer').innerHTML = '00:30'
            document.querySelector('.result').innerHTML = ``
            startGame()
        }
    }
})

hideAnswer()