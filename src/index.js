//k3n5c0d3
// feth from json without api

// Get the form element
const form = document.querySelector('.signIn');

// Add an event listener for the button click
const button = document.querySelector('input[type="submit"]');
button.addEventListener('click', function(event) {
  // Prevent the default button click behavior
  event.preventDefault();

  // Get the username and password input values
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const username = usernameInput.value;
  const password = passwordInput.value;

   // Fetch the users from the db.json file
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const users = data.users;

      // Check if the username and password are valid
      const validUser = users.find(user => user.username === username && user.password === password);

      if (!validUser) {
        // If the username and password are invalid, display an error message
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.color = 'red';
        form.appendChild(errorMessage);        
        // If the username and password are valid, display a success message
      } else {
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Sign in successful!';
        successMessage.style.color = 'green';
        form.appendChild(successMessage);
      }
    })
    .catch(error => console.log(error));
});



// //API Version
// const apiUrl = 'http://localhost:3000/users';

// // Get the form element
// const form = document.querySelector('.signIn');

// // Add an event listener for the button click
// const button = document.querySelector('input[type="submit"]');
// button.addEventListener('click', function(event) {
//   // Prevent the default form submission behavior
//   event.preventDefault();

//   // Get the username and password input values
//   const usernameInput = document.querySelector('input[type="text"]');
//   const passwordInput = document.querySelector('input[type="password"]');
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   // Fetch the user data from the API
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       // Check if the username and password are valid (for example, you could check them against the data from the API)
//       const isValidUser = data.users.some(user => user.username === username && user.password === password);

//       if (isValidUser) {
//         // If the username and password are valid, display a success message
//         const successMessage = document.createElement('div');
//         successMessage.textContent = 'Sign in successful!';
//         successMessage.style.color = 'green';
//         form.appendChild(successMessage);
//       } else {
//         // If the username and password are invalid, display an error message
//         const errorMessage = document.createElement('div');
//         errorMessage.textContent = 'Invalid username or password.';
//         errorMessage.style.color = 'red';
//         form.appendChild(errorMessage);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching user data:', error);
//     });
// });




// //Hard coded login

// // Get the form element
// const form = document.querySelector('.signIn');

// // Add an event listener for the button click
// const button = document.querySelector('input[type="submit"]');
// button.addEventListener('click', function(event) {
//   // Prevent the default button click behavior
//   event.preventDefault();

//   // Get the username and password input values
//   const usernameInput = document.querySelector('input[type="text"]');
//   const passwordInput = document.querySelector('input[type="password"]');
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   // Check if the username and password are valid (for example, you could check them against a database)
//   if (username === 'DemoUser' && password === 'DomoPassword') {
//     // If the username and password are valid, display a success message
//     const successMessage = document.createElement('div');
//     successMessage.textContent = 'Sign in successful!';
//     successMessage.style.color = 'green';
//     form.appendChild(successMessage);
//   } else {
//     // If the username and password are invalid, display an error message
//     const errorMessage = document.createElement('div');
//     errorMessage.textContent = 'Invalid username or password.';
//     errorMessage.style.color = 'red';
//     form.appendChild(errorMessage);
//   }
// });
