// Encryption and decryption helper functions
const encrypt = (text, key = "secret") => {
  return btoa(unescape(encodeURIComponent(text + key))); // Base64 + key
};
const decrypt = (encrypted, key = "secret") => {
  try {
    const decoded = decodeURIComponent(escape(atob(encrypted)));
    return decoded.replace(key, ""); // Remove key from decrypted text
  } catch {
    return null; // If decryption fails
  }
};

// Simulated backend using metadata.json (mocked for static app)
let users = {}; // Decrypted users from metadata.json
let currentUser = null;

// Fetch metadata.json
fetch("metadata.json")
  .then((res) => res.json())
  .then((data) => {
    // Decrypt stored user data
    for (const user in data) {
      users[user] = decrypt(data[user]);
    }
  })
  .catch(() => {
    console.error("Could not load metadata.json");
  });

// Sign up
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (users[username]) {
    alert("User already exists. Try logging in.");
    return;
  }

  users[username] = password;
  updateMetadataFile();
  alert("Signup successful! You can now log in.");
  document.getElementById("signup-form").reset();
});

// Login
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (users[username] === password) {
    currentUser = username;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("notepad-section").style.display = "block";
  } else {
    alert("Invalid credentials!");
  }
});

// Save notes (localStorage only for simplicity)
document.getElementById("save-btn").addEventListener("click", () => {
  if (currentUser) {
    localStorage.setItem(currentUser, document.getElementById("notepad").value);
    alert("Notes saved!");
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  currentUser = null;
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("notepad-section").style.display = "none";
  document.getElementById("notepad").value = "";
});

// Update metadata.json
function updateMetadataFile() {
  const encryptedUsers = {};
  for (const user in users) {
    encryptedUsers[user] = encrypt(users[user]);
  }

  // Simulating writing to metadata.json
  console.log("Write this to metadata.json:", JSON.stringify(encryptedUsers, null, 2));
}
