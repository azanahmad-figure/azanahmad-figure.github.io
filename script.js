// Simulated backend using localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};
const notes = JSON.parse(localStorage.getItem("notes")) || {};

// Elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const authSection = document.getElementById("auth-section");
const notepadSection = document.getElementById("notepad-section");
const notepad = document.getElementById("notepad");
const saveBtn = document.getElementById("save-btn");
const logoutBtn = document.getElementById("logout-btn");

let currentUser = null;

// Sign up
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (users[username]) {
    alert("User already exists. Try logging in.");
    return;
  }

  users[username] = password;
  notes[username] = "";
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("notes", JSON.stringify(notes));
  alert("Signup successful! You can now log in.");
  signupForm.reset();
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (users[username] === password) {
    currentUser = username;
    authSection.style.display = "none";
    notepadSection.style.display = "block";
    notepad.value = notes[currentUser];
  } else {
    alert("Invalid credentials!");
  }
});

// Save notes
saveBtn.addEventListener("click", () => {
  if (currentUser) {
    notes[currentUser] = notepad.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Notes saved!");
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  currentUser = null;
  authSection.style.display = "block";
  notepadSection.style.display = "none";
  notepad.value = "";
});
