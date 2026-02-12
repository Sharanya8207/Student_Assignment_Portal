let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let results = JSON.parse(localStorage.getItem("results")) || [];
let student = localStorage.getItem("student");

/* -------- LOGIN -------- */
function loginStudent() {
  const name = document.getElementById("studentName").value;
  if (!name) return alert("Enter name");
  localStorage.setItem("student", name);
  location.href = "student.html";
}

/* -------- TEACHER -------- */
function addMCQ() {
  const q = document.createElement("div");
  q.className = "mcq";
  q.innerHTML = `
    <input placeholder="Question">
    <input placeholder="Option A">
    <input placeholder="Option B">
    <input placeholder="Option C">
    <input placeholder="Option D">
    <input placeholder="Correct Option (A/B/C/D)">
  `;
  document.getElementById("questions").appendChild(q);
}

function saveAssignment() {
  const subject = subject.value;
  const title = title.value;

  const qs = [...document.querySelectorAll(".mcq")].map(q => {
    const inputs = q.querySelectorAll("input");
    return {
      question: inputs[0].value,
      options: [
        inputs[1].value,
        inputs[2].value,
        inputs[3].value,
        inputs[4].value
      ],
      correct: inputs[5].value.toUpperCase()
    };
  });

  assignments.push({ subject, title, questions: qs });
  localStorage.setItem("assignments", JSON.stringify(assignments));
  alert("Assignment Created");
}

/* -------- STUDENT -------- */
if (location.pathname.includes("student")) {
  document.getElementById("welcome").innerText =
    `Welcome ${student}`;

  const box = document.getElementById("assignments");

  assignments.forEach((a, i) => {
    box.innerHTML += `
      <button onclick="attempt(${i})">${a.subject} - ${a.title}</button>
    `;
  });
}

function attempt(i) {
  const a = assignments[i];
  let html = `<h3>${a.title}</h3>`;
  a.questions.forEach((q, idx) => {
    html += `
      <div class="mcq">
        <p>${q.question}</p>
        ${q.options.map((o, j) =>
          `<label><input type="radio" name="q${idx}" value="${"ABCD"[j]}"> ${o}</label><br>`
        ).join("")}
      </div>`;
  });

  html += `<button onclick="submit(${i})">Submit</button>`;
  document.body.innerHTML = html;
}

function submit(i) {
  const a = assignments[i];
  let score = 0;

  a.questions.forEach((q, idx) => {
    const ans = document.querySelector(`input[name=q${idx}]:checked`);
    if (ans && ans.value === q.correct) score++;
  });

  results.push({
    studentName: student,
    subject: a.subject,
    title: a.title,
    score,
    total: a.questions.length
  });

  localStorage.setItem("results", JSON.stringify(results));
  alert(`Score: ${score}/${a.questions.length}`);
  location.reload();
}

/* -------- RESULTS (TEACHER) -------- */
if (location.pathname.includes("teacher")) {
  const resBox = document.getElementById("results");
  results.forEach(r => {
    resBox.innerHTML += `
      <p>${r.studentName} | ${r.subject} | ${r.score}/${r.total}</p>
    `;
  });
}
