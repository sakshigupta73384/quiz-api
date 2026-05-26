const API_URL = "http://localhost:8080";

let questions = [];

// Load Questions

async function loadQuestions() {

    const response = await fetch(`${API_URL}/questions`);

    questions = await response.json();

    displayQuestions();
}

// Display Questions on UI

function displayQuestions() {

    const container = document.getElementById("quizContainer");

    container.innerHTML = "";

    questions.forEach((q, index) => {

        container.innerHTML += `

        <div class="question-card">

            <h5>
                Q${index + 1}. ${q.question}
            </h5>

            <div>
                <input type="radio" name="q${q.id}" value="${q.option1}">
                <label class="option">${q.option1}</label>
            </div>

            <div>
                <input type="radio" name="q${q.id}" value="${q.option2}">
                <label class="option">${q.option2}</label>
            </div>

            <div>
                <input type="radio" name="q${q.id}" value="${q.option3}">
                <label class="option">${q.option3}</label>
            </div>

            <div>
                <input type="radio" name="q${q.id}" value="${q.option4}">
                <label class="option">${q.option4}</label>
            </div>

        </div>
        `;
    });
}

// Submit Quiz

async function submitQuiz() {

    const answers = [];

    questions.forEach(q => {

        const selectedOption =
            document.querySelector(`input[name="q${q.id}"]:checked`);

        if (selectedOption) {

            answers.push({

                id: q.id,

                response: selectedOption.value
            });
        }
    });

    // Validation

    if (answers.length < questions.length) {

        alert("Please answer all questions");

        return;
    }

    // Send Answers to Backend

    const response = await fetch(`${API_URL}/submit`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(answers)
    });

    const score = await response.json();

    // Display Score

    document.getElementById("result").innerHTML =
        `Your Score: ${score} / ${questions.length}`;
}

// Load Automatically

loadQuestions();
