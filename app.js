// State capitals data
const stateCapitals = {
    'Alabama': 'Montgomery',
    'Alaska': 'Juneau',
    'Arizona': 'Phoenix',
    'Arkansas': 'Little Rock',
    'California': 'Sacramento',
    'Colorado': 'Denver',
    'Connecticut': 'Hartford',
    'Delaware': 'Dover',
    'Florida': 'Tallahassee',
    'Georgia': 'Atlanta',
    'Hawaii': 'Honolulu',
    'Idaho': 'Boise',
    'Illinois': 'Springfield',
    'Indiana': 'Indianapolis',
    'Iowa': 'Des Moines',
    'Kansas': 'Topeka',
    'Kentucky': 'Frankfort',
    'Louisiana': 'Baton Rouge',
    'Maine': 'Augusta',
    'Maryland': 'Annapolis',
    'Massachusetts': 'Boston',
    'Michigan': 'Lansing',
    'Minnesota': 'St. Paul',
    'Mississippi': 'Jackson',
    'Missouri': 'Jefferson City',
    'Montana': 'Helena',
    'Nebraska': 'Lincoln',
    'Nevada': 'Carson City',
    'New Hampshire': 'Concord',
    'New Jersey': 'Trenton',
    'New Mexico': 'Santa Fe',
    'New York': 'Albany',
    'North Carolina': 'Raleigh',
    'North Dakota': 'Bismarck',
    'Ohio': 'Columbus',
    'Oklahoma': 'Oklahoma City',
    'Oregon': 'Salem',
    'Pennsylvania': 'Harrisburg',
    'Rhode Island': 'Providence',
    'South Carolina': 'Columbia',
    'South Dakota': 'Pierre',
    'Tennessee': 'Nashville',
    'Texas': 'Austin',
    'Utah': 'Salt Lake City',
    'Vermont': 'Montpelier',
    'Virginia': 'Richmond',
    'Washington': 'Olympia',
    'West Virginia': 'Charleston',
    'Wisconsin': 'Madison',
    'Wyoming': 'Cheyenne'
};

let currentState = '';
let correctAnswer = '';
let score = 0;
let totalQuestions = 0;

// Get random state
function getRandomState() {
    const states = Object.keys(stateCapitals);
    return states[Math.floor(Math.random() * states.length)];
}

// Get random wrong answers
function getWrongAnswers(correctAnswer, count) {
    const allCapitals = Object.values(stateCapitals);
    const wrongAnswers = [];
    
    while (wrongAnswers.length < count) {
        const randomCapital = allCapitals[Math.floor(Math.random() * allCapitals.length)];
        if (randomCapital !== correctAnswer && !wrongAnswers.includes(randomCapital)) {
            wrongAnswers.push(randomCapital);
        }
    }
    
    return wrongAnswers;
}

// Shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Load new question
function loadQuestion() {
    // Clear previous result
    document.getElementById('result-container').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
    
    // Get random state and its capital
    currentState = getRandomState();
    correctAnswer = stateCapitals[currentState];
    
    // Display state name
    document.getElementById('state-name').textContent = currentState;
    
    // Generate answer options
    const wrongAnswers = getWrongAnswers(correctAnswer, 3);
    const allAnswers = shuffleArray([correctAnswer, ...wrongAnswers]);
    
    // Create answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, button);
        answersContainer.appendChild(button);
    });
}

// Check answer
function checkAnswer(selectedAnswer, button) {
    totalQuestions++;
    
    // Disable all buttons
    const allButtons = document.querySelectorAll('.answer-button');
    allButtons.forEach(btn => btn.disabled = true);
    
    // Show result
    const resultContainer = document.getElementById('result-container');
    
    if (selectedAnswer === correctAnswer) {
        score++;
        button.classList.add('correct');
        resultContainer.innerHTML = '<span class="correct-message">✓ Correct!</span>';
    } else {
        button.classList.add('incorrect');
        // Highlight the correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        resultContainer.innerHTML = `<span class="incorrect-message">✗ Incorrect! The correct answer is ${correctAnswer}</span>`;
    }
    
    // Update score
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalQuestions;
    
    // Show next button
    document.getElementById('next-button').style.display = 'block';
}

// Next question button handler
document.getElementById('next-button').addEventListener('click', loadQuestion);

// Load first question on page load
loadQuestion();
