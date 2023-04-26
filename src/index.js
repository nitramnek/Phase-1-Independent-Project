const signInForm = document.querySelector('.signIn');
const dashboard = document.querySelector('#dashboard');
const doctorNameSpan = document.querySelector('#doctorName');
const patientsDeu = document.querySelector('#patientsDeu');
const patientsTreaded = document.querySelector('#patientsTreated');

function displayDashboard(doctor) {
  doctorNameSpan.textContent = doctor.displayname;
  patientsDeu.innerHTML = '';
  patientsTreaded.innerHTML = '';
  fetch('http://localhost:3000/patients')
    .then(response => response.json())
    .then(patients => {
      patients.forEach(patient => {
        if (!patient.treated) {
          const li = document.createElement('li');
          li.textContent = patient.firstName + ' ' + patient.lastName;
          patientsDeu.appendChild(li);
        } else {
          const li = document.createElement('li');
          li.textContent = patient.firstName + ' ' + patient.lastName;
          patientsTreaded.appendChild(li);
        }
      });
    })
    .catch(error => {
      console.error(error);
      const message = document.createElement('div');
      message.textContent = 'An error occurred. Please try again later.';
      message.classList.add('message', 'error');
      signInForm.appendChild(message);
    });
  signInForm.style.display = 'none';
  dashboard.style.display = 'block';
}

signInForm.addEventListener('submit', event => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  fetch('http://localhost:3000/doctors')
    .then(response => response.json())
    .then(doctors => {
      const doctor = doctors.find(d => d.username === username && d.password === password);
      if (doctor) {
        displayDashboard(doctor);
      } else {
        const message = document.createElement('div');
        message.textContent = 'Invalid username or password.';
        message.classList.add('message', 'error');
        signInForm.appendChild(message);
      }
    })
    .catch(error => {
      console.error(error);
      const message = document.createElement('div');
      message.textContent = 'An error occurred. Please try again later.';
      message.classList.add('message', 'error');
      signInForm.appendChild(message);
    });
});




// //API Version
// const apiUrl = 'http://localhost:3000/doctors';

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
//       const isValidUser = data.doctors.some(user => user.username === username && user.password === password);

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
