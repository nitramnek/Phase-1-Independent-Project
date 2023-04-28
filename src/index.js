const apiUrl = 'http://localhost:3000';
const signInForm = document.querySelector('.signIn');
const dashboard = document.querySelector('#dashboard');
const doctorNameSpan = document.querySelector('#doctorName');
const patientsDeu = document.querySelector('#patientsDeu');
const patientsTreated = document.querySelector('#patientsTreated');
const patientDetails = document.querySelector('#patientDetails');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


async function signInDoctor(username, password) {
  const response = await fetch(`${apiUrl}/doctors`);
  const doctors = await response.json();
  return doctors.find(d => d.username === username && d.password === password);
}

async function getPatients() {
  const response = await fetch(`${apiUrl}/patients`);
  return await response.json();
}

async function updatePatient(id, updatedData) {
  const response = await fetch(`${apiUrl}/patients/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updatedData)
  });
  return await response.json();
}

function displayDashboard(doctor) {
  doctorNameSpan.textContent = doctor.displayname;
  signInForm.style.display = 'none';
  dashboard.style.display = 'block';
}

function displayPatients(patients) {
  patientsDeu.innerHTML = '';
  patientsTreated.innerHTML = '';
  patients.forEach(patient => {
    const li = document.createElement('li');
    li.textContent = patient.firstName + ' ' + patient.lastName;
    li.addEventListener('click', () => displayPatientDetails(patient));
    li.style.cursor = 'pointer';
    if (!patient.treated) {
      patientsDeu.appendChild(li);
    } else {
      patientsTreated.appendChild(li);
    }
  });
}

function displayPatientDetails(patient) {
  const details = `
    <ul>
      <li>Name: ${patient.firstName} ${patient.lastName}</li>
      <li>Gender: ${patient.gender}</li>
      <li>Age: ${patient.age}</li>
      <li>Temperature: ${patient.temp}C</li>
      <li>Blood Pressure: ${patient.BP}</li>
      <li>Illness: ${patient.elment}</li>
      <li>Treated: ${patient.treated ? 'Yes' : 'No'}</li>
    </ul>
    <form id="updateSymptoms">
      <h3>Update Patient Symptoms:</h3>
      <label>
        Temperature:
        <input type="number" name="temp" value="${patient.temp}">
      </label>
      <label>
        Blood Pressure:
        <input type="text" name="BP" value="${patient.BP}">
      </label>
      <label>
        Illness:
        <input type="text" name="elment" value="${patient.elment}">
      </label>
      <button type="submit">Update</button>
    </form>
  `;
  patientDetails.innerHTML = details;
  const updateForm = patientDetails.querySelector('#updateSymptoms');
  updateForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const updatedPatient = {
      temp: formData.get('temp'),
      BP: formData.get('BP'),
      elment: formData.get('elment'),
      treated: true
    };
    try {
      const patient = await updatePatient(patient.id, updatedPatient);
      displayPatients(await getPatients());
      displayPatientDetails(patient);
    } catch (error) {
      console.error(error);
      const message = document.createElement('div');
      message.textContent = error.message;
      message.classList.add('message', 'error');
      patientDetails.appendChild(message);
    }
  });
}
if (!signInForm || !usernameInput || !passwordInput) {
  console.error('One or more form elements not found');
}

signInForm.addEventListener('submit', async event => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      // Login was successful
      window.location.href = '/dashboard';
    } else {
      // Login failed
      const error = new Error(data.message || 'Unable to sign in');
      throw error;
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
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
