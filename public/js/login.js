document.addEventListener('DOMContentLoaded', () => {
  async function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the form element
    const form = document.getElementById('loginForm');

    // Create an object with the form data
    const formData = {
      username: form.elements.namedItem('username').value,
      password: form.elements.namedItem('password').value,
    };

    try {
      // Send a POST request to the /login endpoint
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is not successful

      const data = await response.json();
      console.log(data);

      if (data.status === 'error') {
        alert(`Error: ${data.message || 'Login failed'}`);
        return;
      }

      // Handle success (you might want to redirect the user or show a success message)
      alert('Login successful!');
      // window.location.href = '/'; // Redirect to / after successful login
    } catch (error) {
      // Handle any network errors
      alert(`An error occurred: ${error.message}`);
    }
  }

  // Attach the event listener to the login button
  document.getElementById('loginButton').onclick = handleLogin;

  // Attach the event listener to the form to handle the "Enter" key
  document.getElementById('loginForm').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  });
});
