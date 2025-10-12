document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Check if user already exists
  const exists = users.some(user => user.username === username);
  if (exists) {
    showMessage("Username already taken.");
    return;
  }

  // Store user
  users.push({ username, password });
  showMessage(`Account created for ${username}`);
});
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    showMessage(`Welcome back, ${username}!`);
  } else {
    showMessage("Invalid credentials.");
  }
});
function showMessage(msg) {
  document.getElementById("message").innerText = msg;
}
