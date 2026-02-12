let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

function openTeacher() {
  hideAll();
  teacherDashboard.classList.remove("hidden");
}

function openStudent() {
  hideAll();
  studentDashboard.classList.remove("hidden");
}

function goHome() {
  hideAll();
  roleScreen.classList.remove("hidden");
}

function hideAll() {
  roleScreen.classList.add("hidden");
  teacherDashboard.classList.add("hidden");
  studentDashboard.classList.add("hidden");
}

function showCreateAssignment() {
  createAssignment.classList.remove("hidden");
  submissionsDiv.classList.add("hidden");
}

function addQuestion() {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<textarea placeholder="Enter Question"></textarea>`;
  questions.appendChild(qDiv);
}

function saveAssignment() {
  const subject = document.getElementById("subject").value;
  const title = document.getElementById("title").value;
  const qs = [...questions.querySelectorAll("textarea")].map(q => q.value);

  assignments.push({ subject, title, questions: qs });
  localStorage.setItem("assignments", JSON.stringify(assignments));
  alert("Assignment Saved!");
}

function viewAssignments() {
  assignmentList.innerHTML = "<h3>Assignments</h3>";
  assignments.forEach((a, i) => {
    assignmentList.innerHTML += `
      <div>
        <b>${a.subject}</b> - ${a.title}
        <button onclick="attempt(${i})">Attempt</button>
      </div>`;
  });
  assignmentList.classList.remove("hidden");
}

function attempt(i) {
  const a = assignments[i];
  let html = `<h3>${a.title}</h3>`;
  a.questions.forEach((q, idx) => {
    html += `<p>${q}</p><textarea id="ans${idx}"></textarea>`;
  });
  html += `<button onclick="submit(${i})">Submit</button>`;
  assignmentList.innerHTML = html;
}

function submit(i) {
  submissions.push({ assignment: i, marks: Math.floor(Math.random() * 100) });
  localStorage.setItem("submissions", JSON.stringify(submissions));
  alert("Submitted Successfully");
}

function viewScores() {
  scoreList.innerHTML = "<h3>My Scores</h3>";
  submissions.forEach(s => {
    scoreList.innerHTML += `<p>Assignment ${s.assignment} : ${s.marks} marks</p>`;
  });
  scoreList.classList.remove("hidden");
}

function viewSubmissions() {
  submissionsDiv.innerHTML = "<h3>Student Submissions</h3>";
  submissions.forEach(s => {
    submissionsDiv.innerHTML += `<p>Assignment ${s.assignment} → ${s.marks} marks</p>`;
  });
  submissionsDiv.classList.remove("hidden");
}
