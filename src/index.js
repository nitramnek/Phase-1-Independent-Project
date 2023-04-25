// Get the form element
const form = document.querySelector('.signIn');

// Add an event listener for the button click
const button = document.querySelector('input[type="button"]');
button.addEventListener('click', function(event) {
  // Prevent the default button click behavior
  event.preventDefault();

  // Get the username and password input values
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if the username and password are valid (for example, you could check them against a database)
  if (username === 'DemoUser' && password === 'DomoPassword') {
    // If the username and password are valid, display a success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Sign in successful!';
    successMessage.style.color = 'green';
    form.appendChild(successMessage);
  } else {
    // If the username and password are invalid, display an error message
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Invalid username or password.';
    errorMessage.style.color = 'red';
    form.appendChild(errorMessage);
  }
});
