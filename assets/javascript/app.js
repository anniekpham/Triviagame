let time = 10,
    isTimer = false,
    playerguess, 
    timer,
    questions = [
    {
        question: 'Which of the following is Stitch experiment number?',
        correctanswer: 'Experiment 626',
        answer: ['Experiment 100', 'Experiment 625', 'Experiment 626', 'Experiment 101'],
        playerchoice: ''
    },
    {
        question: 'Which of the following lyrics does not follow "Be a man..."?',
        correctanswer: 'Tranquil as a forest but on fire within',
        answer: ['We must be swift as the coursing river', 'Tranquil as a forest but on fire within', 'With all the force of a great typhoon', 'With all the strength of a raging fire'],
        playerchoice: ''
    },
    {
        question: 'Who is the oldest Disney Princess',
        correctanswer: 'Snow White',
        answer: ['Cinderella', 'Aurora', 'Belle', 'Snow White'],
        playerchoice: ''
    },
    {
        question: `What is the name of Belle's dad`,
        correctanswer: 'Maurice',
        answer: ['Maurice', 'LeFou', 'Stefan', 'Frederic'],
        playerchoice: ''
    },
    {
        question: 'Who created Stitch?',
        correctanswer: 'Jumba',
        answer: ['Gantu', 'Jumba', 'Pleakley', 'Lilo'],
        playerchoice: ''
    },
    {
        question: 'Which of the following will be revealed as a new "Land" in Disneyland during Summer of 2019?',
        correctanswer: `Galaxy's Edge`,
        answer: ['Marvel Land', `Galaxy's Edge`, 'Epcot', 'Naboo City'],
        playerchoice: ''
    },
    {
        question: 'In the Lion King 2, who was Kovu?',
        correctanswer: `Scar's apppointed heir`,
        answer: [`Scar's apppointed heir`, `Simba and Nala's son`, `Kiara's enemy`, `Scar's biological son`],
        playerchoice: ''
    },
    {
        question: 'How long has the Genie been imprisoned?',
        correctanswer: '10,000 years',
        answer: ['100 years', '8,000 years', '50 years', '10,000 years'],
        playerchoice: ''
    },
    {
        question: 'Cruella De Vil is a villian in which Disney movie?',
        correctanswer: '101 Dalmatians',
        answer: ['Lady and the Tramp', 'Oliver and Company','101 Dalmatians', 'The Fox and the Hound'],
        playerchoice: ''
    },
    {
        question: `What did they always get wrong on Flynn Rider's wanted poster?`,
        correctanswer: 'His nose',
        answer: ['His nose','His eyes', 'His Jaw', 'His hair'],
        playerchoice: ''
    }
]

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
            document.querySelector('.container').innerHTML = `The correct answer is: ${questions[i].correctanswer}`
            clearInterval(timer)
        }
    }, 1000)
}

let i = 0
let startGame = () => {
        startTimer()
        document.querySelector('.startbtn').style.visibility = 'hidden'
        currentquestion = questions[i].question

        document.querySelector('.question').innerHTML = questions[i].question

        let answer = document.createElement('button')
        answer.textContent = questions[i].answer[0]
        answer.value = questions[i].answer[0]
        answer.className = 'answer'
        document.querySelector('#answer1').append(answer)
        
        let answer2 = document.createElement('button')
        answer2.textContent = questions[i].answer[1]
        answer2.value = questions[i].answer[1]
        answer2.className = 'answer'
        document.querySelector('#answer2').append(answer2)
        
        let answer3 = document.createElement('button')
        answer3.textContent = questions[i].answer[2]
        answer3.value = questions[i].answer[2]
        answer3.className = 'answer'
        document.querySelector('#answer3').append(answer3)
        
        let answer4 = document.createElement('button')
        answer4.textContent = questions[i].answer[3]
        answer4.value = questions[i].answer[3]
        answer4.className = 'answer'
        document.querySelector('#answer4').append(answer4)
}

document.addEventListener('click', ({target}) => {
    if (target.className === 'answer') {
        playerguess = target.value
        if (playerguess === questions[i].correctanswer) {
            document.querySelector('.question').innerHTML = 'Correct!'
            document.querySelector('.answerbox').innerHTML = ``
            clearInterval(timer)
        } else{
            document.querySelector('.question').innerHTML = 'Nope!'
            document.querySelector('.answerbox').innerHTML = `The correct answer is: ${questions[i].correctanswer}`
            clearInterval(timer)
        }
    }
})