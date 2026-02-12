let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

/* ---------- TEACHER ---------- */
function showCreate() {
  document.getElementById("createBox").classList.remove("hidden");
  document.getElementById("submissionsBox").classList.add("hidden");
}

function addQuestion() {
  const div = document.createElement("div");
  div.innerHTML = `<textarea placeholder="Enter question"></textarea>`;
  document.getElementById("questions").appendChild(div);
}

function saveAssignment() {
  const subject = subjectInput().value;
  const title = titleInput().value;
  const qs = [...document.querySelectorAll("#questions textarea")].map(q => q.value);

  assignments.push({ subject, title, questions: qs });
  localStorage.setItem("assignments", JSON.stringify(assignments));

  alert("Assignment Created!");
}

function viewSubmissions() {
  const box = document.getElementById("submissionsBox");
  box.innerHTML = "<h3>Submissions</h3>";

  submissions.forEach(s => {
    box.innerHTML += `<p>${s.title} → ${s.marks} marks</p>`;
  });

  box.classList.remove("hidden");
  document.getElementById("createBox").classList.add("hidden");
}

/* ---------- STUDENT ---------- */
function loadAssignments() {
  const box = document.getElementById("assignmentBox");
  box.innerHTML = "<h3>Assignments</h3>";

  assignments.forEach((a, i) => {
    box.innerHTML += `
      <div>
        <b>${a.subject}</b> - ${a.title}
        <button onclick="attempt(${i})">Attempt</button>
      </div>`;
  });

  box.classList.remove("hidden");
}

function attempt(i) {
  const a = assignments[i];
  const box = document.getElementById("assignmentBox");

  let html = `<h3>${a.title}</h3>`;
  a.questions.forEach((q, idx) => {
    html += `<p>${q}</p><textarea></textarea>`;
  });

  html += `<button onclick="submit('${a.title}')">Submit</button>`;
  box.innerHTML = html;
}

function submit(title) {
  const marks = Math.floor(Math.random() * 40) + 60;
  submissions.push({ title, marks });
  localStorage.setItem("submissions", JSON.stringify(submissions));
  alert("Submitted Successfully!");
}

function viewScores() {
  const box = document.getElementById("scoreBox");
  box.innerHTML = "<h3>My Scores</h3>";

  submissions.forEach(s => {
    box.innerHTML += `<p>${s.title} : ${s.marks}</p>`;
  });

  box.classList.remove("hidden");
}

/* Helpers */
function subjectInput(){ return document.getElementById("subject"); }
function titleInput(){ return document.getElementById("title"); }
