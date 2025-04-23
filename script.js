const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");
const suggestionsDisplay = document.getElementById("suggestions");
const meterBars = document.querySelectorAll(".strength-meter .bar");

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  let strength = "";
  let suggestions = [];

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const length = password.length;

  let score = 0;
  if (hasLower) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;
  if (length >= 8) score++;

  // Update strength bar colors
  meterBars.forEach((bar, index) => {
    if (index < score) {
      if (score <= 2) {
        bar.className = "bar red";
      } else if (score === 3 || score === 4) {
        bar.className = "bar yellow";
      } else {
        bar.className = "bar green";
      }
    } else {
      bar.className = "bar";
    }
  });

  // Display text + suggestions
  if (length === 0) {
    strength = "";
    suggestions = [];
  } else if (score <= 2) {
    strength = "Weak";
    if (!hasUpper) suggestions.push("Add uppercase letters.");
    if (!hasNumber) suggestions.push("Include numbers.");
    if (!hasSpecial) suggestions.push("Use special characters.");
    if (length < 6) suggestions.push("Use at least 6 characters.");
  } else if (score === 3 || score === 4) {
    strength = "Medium";
    if (!hasUpper) suggestions.push("Add uppercase letters.");
    if (!hasSpecial) suggestions.push("Use special characters.");
    if (length < 8) suggestions.push("Make it at least 8 characters long.");
  } else {
    strength = "Strong 💪";
  }

  strengthDisplay.textContent = `Strength: ${strength}`;
  suggestionsDisplay.innerHTML = suggestions.join("<br>");
});
