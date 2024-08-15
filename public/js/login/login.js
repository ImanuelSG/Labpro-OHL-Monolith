document.addEventListener('DOMContentLoaded', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleLogin() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';

    if (!usernameInput.value) {
      usernameError.textContent = 'Username or email is required.';
      isValid = false;
    } else if (!emailRegex.test(usernameInput.value)) {
      usernameError.textContent = 'Please enter a valid email.';
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    if (isValid) {
      const loginForm = document.getElementById('loginForm');
      loginForm.submit();
    }
  }

  document.getElementById('loginButton').onclick = handleLogin;
});
