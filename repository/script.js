const form = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');
const statusMessage = document.querySelector('#statusMessage');

// Temporary sample accounts (palitan kapag may backend na)
const users = [
  { email: 'admin@bucn.edu.ph', password: 'admin123', role: 'admin' },
  { email: 'student@bucn.edu.ph', password: 'student123', role: 'student' },
  { email: 'faculty@bucn.edu.ph', password: 'faculty123', role: 'faculty' }
];

// Show / Hide password
togglePassword.addEventListener('click', () => {
  const showPassword = password.type === 'password';
  password.type = showPassword ? 'text' : 'password';
  togglePassword.classList.toggle('visible', showPassword);
  togglePassword.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
  togglePassword.setAttribute('aria-pressed', String(showPassword));
});

// Error message helper
function showError(input, message) {
  input.classList.toggle('invalid', Boolean(message));
  document.querySelector(`#${input.id}Error`).textContent = message;
}

// Login form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = email.value.trim().toLowerCase();
  const passwordValue = password.value;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const validPassword = passwordValue.length >= 6;

  showError(email, validEmail ? '' : 'Please enter a valid email address.');
  showError(password, validPassword ? '' : 'Password must be at least 6 characters.');

  if (!validEmail || !validPassword) {
    statusMessage.textContent = '';
    return;
  }

  // Hanapin ang user
  const user = users.find(
    (u) => u.email === emailValue && u.password === passwordValue
  );

  if (!user) {
    statusMessage.textContent = 'Invalid email or password.';
    return;
  }

  // Success
  statusMessage.textContent = 'Login successful. Opening your account…';

  setTimeout(() => {
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      // student at faculty → client.html
      window.location.href = 'client.html';
    }
  }, 450);
});

// Clear error habang nagta-type
[email, password].forEach((input) => {
  input.addEventListener('input', () => showError(input, ''));
});

// Continue with Google (demo → student)
document.querySelector('#googleLogin').addEventListener('click', () => {
  statusMessage.textContent = 'Opening your NEST account…';
  setTimeout(() => {
    window.location.href = 'client.html';
  }, 450);
});

// Continue as Guest
document.querySelector('#guestLogin').addEventListener('click', () => {
  window.location.href = 'guest.html';
});

// Register as Student
document.querySelector('#studentRegister').addEventListener('click', (event) => {
  event.preventDefault();
  statusMessage.textContent = 'Student registration is ready to be connected.';
});