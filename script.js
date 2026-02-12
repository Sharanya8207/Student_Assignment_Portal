let questions = [];
let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function showTeacher() {
  document.getElementById("teacherPanel").classList.remove("hidden");
  document.getElementById("studentPanel").classList.add("hidden");
}

function showStudent() {
  document.getElementById("studentPanel").classList.remove("hidden");
  document.getElementById("teacherPanel").classList.add("hidden");
  loadAssignments();
}

function addQuestion() {
  const type = document.getElementById("questionType").value;
  const text = document.getElementById("questionText").value;
  const marks = document.getElementById("marks").value;

  let question = { type, text, marks };

  if (type === "mcq") {
    const opts = [...document.querySelectorAll(".opt")].map(o => o.value);
    const correct = document.getElementById("correctOpt").value.toUpperCase();
    question.options = opts;
    question.correct = correct;
  }

  questions.push(question);
  renderTeacherQuestions();
}

function renderTeacherQuestions() {
  const div = document.getElementById("teacherQuestions");
  div.innerHTML = "";
  questions.forEach((q, i) => {
    div.innerHTML += `<div class="question-box">
      <b>Q${i + 1} (${q.type})</b>: ${q.text}
    </div>`;
  });
}

function saveAssignment() {
  const title = document.getElementById("assignmentTitle").value;
  assignments.push({ title, questions });
  localStorage.setItem("assignments", JSON.stringify(assignments));
  alert("Assignment Saved!");
  questions = [];
  renderTeacherQuestions();
}

function loadAssignments() {
  const list = document.getElementById("assignmentList");
  list.innerHTML = "";
  assignments.forEach((a, i) => {
    list.innerHTML += `<button onclick="attempt(${i})">${a.title}</button>`;
  });
}

function attempt(index) {
  const assignment = assignments[index];
  const area = document.getElementById("attemptArea");
  area.innerHTML = `<h3>${assignment.title}</h3>`;

  assignment.questions.forEach((q, i) => {
    if (q.type === "mcq") {
      area.innerHTML += `
        <div>
          <p>${q.text}</p>
          ${q.options.map((o, idx) =>
            `<label><input type="radio" name="q${i}" value="${String.fromCharCode(65+idx)}"/> ${o}</label>`
          ).join("<br>")}
        </div>`;
    } else {
      area.innerHTML += `
        <div>
          <p>${q.text}</p>
          <textarea></textarea>
        </div>`;
    }
  });

  area.innerHTML += `<button onclick="submit()">Submit Assignment</button>`;
}

function submit() {
  alert("Assignment submitted successfully!");
}
