const password = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

// Show / Hide password
togglePassword.addEventListener('click', () => {
  const showPassword = password.type === 'password';
  password.type = showPassword ? 'text' : 'password';
  togglePassword.classList.toggle('visible', showPassword);
  togglePassword.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
  togglePassword.setAttribute('aria-pressed', String(showPassword));
});
