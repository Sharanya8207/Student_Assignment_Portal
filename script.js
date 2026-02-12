let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

/* ---------- TEACHER ---------- */
function showCreate() {
  toggle("createBox", true);
  toggle("submissionsBox", false);
}

function addQuestion() {
  const q = document.createElement("textarea");
  q.placeholder = "Enter question";
  document.getElementById("questions").appendChild(q);
}

function saveAssignment() {
  const subject = document.getElementById("subject").value;
  const title = document.getElementById("title").value;
  const questions = [...document.querySelectorAll("#questions textarea")].map(q => q.value);

  assignments.push({ subject, title, questions });
  localStorage.setItem("assignments", JSON.stringify(assignments));

  alert("Assignment Created Successfully!");
}

/* ---------- STUDENT ---------- */
function loadAssignments() {
  const box = document.getElementById("assignmentBox");
  box.innerHTML = "<h3>Assignments</h3>";

  assignments.forEach((a, i) => {
    box.innerHTML += `
      <div class="card">
        <b>${a.subject}</b> - ${a.title}
        <button onclick="attempt(${i})">Attempt</button>
      </div>`;
  });

  toggle("assignmentBox", true);
}

function attempt(i) {
  const a = assignments[i];
  const box = document.getElementById("assignmentBox");
  let html = `<h3>${a.title}</h3>`;

  a.questions.forEach(q => {
    html += `<p>${q}</p><textarea></textarea>`;
  });

  html += `<button class="primary" onclick="submit('${a.title}')">Submit</button>`;
  box.innerHTML = html;
}

function submit(title) {
  const marks = Math.floor(Math.random() * 30) + 70;
  submissions.push({ title, marks });
  localStorage.setItem("submissions", JSON.stringify(submissions));
  alert("Submitted Successfully!");
}

function viewScores() {
  const box = document.getElementById("scoreBox");
  box.innerHTML = "<h3>My Scores</h3>";

  submissions.forEach(s => {
    box.innerHTML += `<p>${s.title} → ${s.marks}</p>`;
  });

  toggle("scoreBox", true);
}

/* UTIL */
function toggle(id, show) {
  document.getElementById(id).classList.toggle("hidden", !show);
}
