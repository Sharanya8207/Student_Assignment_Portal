const teacher = document.getElementById("teacher");
const student = document.getElementById("student");

const typeSelect = document.getElementById("type");
const mcqBox = document.getElementById("mcqBox");

let assignments = [];
let questions = [];

// Show panels
function showTeacher() {
  teacher.style.display = "block";
  student.style.display = "none";
}

function showStudent() {
  student.style.display = "block";
  teacher.style.display = "none";
  renderAssignments();
}

// MCQ toggle
typeSelect.onchange = () => {
  mcqBox.style.display = typeSelect.value === "mcq" ? "block" : "none";
};

// Add question
function addQuestion() {
  const qText = question.value.trim();
  if (!qText) {
    alert("Enter question");
    return;
  }

  let q = { text: qText, type: typeSelect.value };

  if (typeSelect.value === "mcq") {
    const opts = document.querySelectorAll(".opt");
    q.options = [...opts].map(o => o.value);
    q.correct = correct.value;
  }

  questions.push(q);
  previewQuestions();
  question.value = "";
}

// Preview
function previewQuestions() {
  preview.innerHTML = "";
  questions.forEach((q, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${q.text}`;
    preview.appendChild(li);
  });
}

// Save assignment
function saveAssignment() {
  const t = title.value.trim();
  if (!t || questions.length === 0) {
    alert("Add title and questions");
    return;
  }

  assignments.push({ title: t, questions });
  questions = [];
  preview.innerHTML = "";
  title.value = "";
  alert("Assignment saved!");
}

// Student view
function renderAssignments() {
  assignmentsDiv = document.getElementById("assignments");
  assignmentsDiv.innerHTML = "";

  assignments.forEach((a, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${a.title}</h3>`;

    a.questions.forEach((q, qi) => {
      div.innerHTML += `<p><b>${qi + 1}.</b> ${q.text}</p>`;
      if (q.type === "mcq") {
        q.options.forEach(opt => {
          div.innerHTML += `
            <label>
              <input type="radio" name="q${i}${qi}"> ${opt}
            </label><br/>
          `;
        });
      } else {
        div.innerHTML += `<textarea placeholder="Your answer"></textarea>`;
      }
    });

    div.innerHTML += `<button onclick="alert('Submitted!')">Submit</button>`;
    assignmentsDiv.appendChild(div);
  });
}
