let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let selectedAssignmentIndex = null;

const assignmentList = document.getElementById("assignmentList");
const modal = document.getElementById("modal");

document.getElementById("assignmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;

  assignments.push({
    title,
    description,
    deadline,
    submission: null
  });

  localStorage.setItem("assignments", JSON.stringify(assignments));
  e.target.reset();
  renderAssignments();
});

function renderAssignments() {
  assignmentList.innerHTML = "";

  assignments.forEach((a, index) => {
    const today = new Date().toISOString().split("T")[0];
    let status = "Not Submitted";
    let statusClass = "";

    if (a.submission) {
      status = "Submitted";
      statusClass = "submitted";
    } else if (today > a.deadline) {
      status = "Late";
      statusClass = "late";
    }

    assignmentList.innerHTML += `
      <div class="assignment">
        <h3>${a.title}</h3>
        <p>${a.description}</p>
        <p>Deadline: ${a.deadline}</p>
        <p class="status ${statusClass}">Status: ${status}</p>
        <button onclick="openModal(${index})">Submit</button>
      </div>
    `;
  });
}

function openModal(index) {
  selectedAssignmentIndex = index;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function submitAssignment() {
  const name = document.getElementById("studentName").value;
  const file = document.getElementById("fileUpload").files[0];

  if (!name || !file) {
    alert("Please fill all fields");
    return;
  }

  if (!file.name.endsWith(".pdf")) {
    alert("Only PDF files allowed");
    return;
  }

  assignments[selectedAssignmentIndex].submission = {
    student: name,
    fileName: file.name,
    submittedAt: new Date().toLocaleString()
  };

  localStorage.setItem("assignments", JSON.stringify(assignments));
  closeModal();
  renderAssignments();
}

renderAssignments();
