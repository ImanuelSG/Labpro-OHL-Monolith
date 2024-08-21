document.addEventListener('DOMContentLoaded', () => {
  function startLoading(loadingSpinner) {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
  }

  function stopLoading(loadingSpinner) {
    loadingSpinner.classList.remove('flex');
    loadingSpinner.classList.add('hidden');
  }

  async function registerUser(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the form element
    const form = document.getElementById('loginForm');

    const loadingSpinner = document.getElementById('loadingSpinner');

    // Show loading spinner and disable the button
    startLoading(loadingSpinner);
    const registerButton = document.getElementById('registerButton');
    registerButton.disabled = true;

    // Create an object with the form data
    const formData = {
      email: form.elements.namedItem('email').value,
      username: form.elements.namedItem('username').value,
      password: form.elements.namedItem('password').value,
      firstName: form.elements.namedItem('firstName').value,
      lastName: form.elements.namedItem('lastName').value,
    };

    try {
      // Send a POST request to the /register endpoint
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Check if the response is not successful
      if (!response.ok) {
        const errorData = await response.json();

        alert(`Error: ${errorData.message || 'Registration failed'}`);
        return;
      }

      // Handle success (you might want to redirect the user or show a success message)
      alert('Registration successful!');
      window.location.href = '/login'; // Redirect to login page after successful registration
    } catch (error) {
      // Handle any network errors

      alert(`An error occurred: ${error.message}`);
    } finally {
      // Enable button and hide spinner
      stopLoading(loadingSpinner);
      registerButton.disabled = false;
    }
  }

  // Attach the event listener to the register button
  document.getElementById('registerButton').onclick = registerUser;

  // Attach the event listener to the form to handle the "Enter" key
  document.getElementById('loginForm').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      registerUser(event);
    }
  });
});
