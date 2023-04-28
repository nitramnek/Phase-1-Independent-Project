//k3n5c0d3
const apiUrl = 'http://localhost:3000';

// Doctor-related code
const signInForm = document.querySelector('.signIn');
const dashboard = document.querySelector('#dashboard');
const doctorNameSpan = document.querySelector('#doctorName');

async function signInDoctor(username, password) {
  try {
    const response = await fetch(`${apiUrl}/doctors`);
    const doctors = await response.json();
    const doctor = doctors.find(d => d.username === username && d.password === password);
    return doctor;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while signing in. Please try again later.');
  }
}

function displayDashboard(doctor) {
  doctorNameSpan.textContent = doctor.displayname;
  signInForm.style.display = 'none';
  dashboard.style.display = 'block';
}

signInForm.addEventListener('submit', async event => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  try {
    const doctor = await signInDoctor(username, password);
    if (doctor) {
      displayDashboard(doctor);
      const patients = await getPatients();
      displayPatients(patients);
    } else {
      throw new Error('Invalid username or password.');
    }
  } catch (error) {
    console.error(error);
    const message = document.createElement('div');
    message.textContent = error.message;
    message.classList.add('message', 'error');
    signInForm.appendChild(message);
  }
});

// Patient-related code
const patientsDeu = document.querySelector('#patientsDeu');
const patientsTreaded = document.querySelector('#patientsTreated');
const patientDetails = document.querySelector('#patientDetails');

async function getPatients() {
  try {
    const response = await fetch(`${apiUrl}/patients`);
    const patients = await response.json();
    return patients;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching patients. Please try again later.');
  }
}

async function updatePatient(id, updatedData) {
  try {
    const response = await fetch(`${apiUrl}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const updatedPatient = await response.json();
    return updatedPatient;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the patient. Please try again later.');
  }
}

function displayPatients(patients) {
  patientsDeu.innerHTML = '';
  patientsTreaded.innerHTML = '';
  patients.forEach(patient => {
    const li = document.createElement('li');
    li.textContent = patient.firstName + ' ' + patient.lastName;
    li.addEventListener('click', () => displayPatientDetails(patient));
    li.style.cursor = 'pointer';
    if (!patient.treated) {
      patientsDeu.appendChild(li);
    } else {
      patientsTreaded.appendChild(li);
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
      <label>Symptoms:</label>
      <br>
      <input type="checkbox" name="symptoms" value="Fever">Fever</input>
      <br>
      <input type="checkbox" name="symptoms" value="Cough">Cough</input>
      <br>
      <input type="checkbox" name="symptoms" value="Shortness of breath">Shortness of breath</input>
      <br>
      <input type="checkbox" name="symptoms" value="Fatigue">Fatigue</input>
      <br>
      <button type="submit">Update</button>
    </form>
  `;
  patientDetails.innerHTML = details;
  const updateSymptomsForm = document.querySelector('#updateSymptoms');
  updateSymptomsForm.addEventListener('submit', async event => {
    event.preventDefault();
    const symptoms = [];
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        symptoms.push(checkbox.value);
      }
    });
    const patientId = patient.id;
    try {
      const response = await fetch(`${apiUrl}/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          symptoms: symptoms,
          treated: true
        })
      });
      const updatedPatient = await response.json();
      patientDetails.innerHTML = '';
      displayPatients(await getPatients());
      console.log(updatedPatient);
    } catch (error) {
      console.error(error);
      const message = document.createElement('div');
      message.textContent = error.message;
      message.classList.add('message', 'error');
      patientDetails.appendChild(message);
    }
  });
}

  

  






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