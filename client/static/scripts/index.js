document.addEventListener('DOMContentLoaded', function () {
  // Get the sign up, sign in, and log out buttons
  const signUpBtn = document.querySelector('.signup-btn');
  const signInBtn = document.querySelector('.signin-btn');
  const logOutBtn = document.querySelector('.logout-btn');
  const avatar = document.querySelector('.avatar');

  // Check if the user is logged in
  const isLoggedIn = window.localStorage.getItem('loggedIn');

  // Toggle the visibility of the buttons based on the user's login status
  if (isLoggedIn) {
    signUpBtn.style.visibility = 'hidden';
    signInBtn.style.visibility = 'hidden';
    logOutBtn.style.visibility = 'visible';
    avatar.innerHTML = window.localStorage.getItem('username');
  } else {
    signUpBtn.style.visibility = 'visible';
    signInBtn.style.visibility = 'visible';
    logOutBtn.style.visibility = 'hidden';
  }

  avatar.addEventListener('click', function () {
    window.location.href = 'profile.html';
  });

  document.querySelector('.logout-btn').addEventListener('click', function () {
    fetch('https://e-validify-backend.onrender.com/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Logged out');
          window.localStorage.removeItem('loggedIn');
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('userId');
          window.location.replace = 'index.html';
          // reload the page
          window.location.reload();
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      }
      )
      .catch(error => {
        console.error('Error: ', error);
      }
      );
  });

  document.querySelector('form#emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.querySelector('form#emailForm').elements.email.value;
    const data = {
      email: email
    };
    fetch('https://e-validify-backend.onrender.com/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Email sent');
        }
        return response.json();
      })
      .then(data => appendData(data.result))
      .catch(error => {
        console.error('Error: ', error);
      });

    const ignore = ['possible_typo', 'last_changed_at'];
    const appendData = (data) => {
      document.querySelector('main').style.height = '100%';
      const container = document.querySelector('section#result');
      container.innerHTML = '';
      container.appendChild(document.createElement('h3'));
      container.querySelector('h3').innerHTML = 'Result';
      container.appendChild(document.createElement('div'));
      container.querySelector('div').classList.add('results');
      const cont = container.querySelector('div.results');
      for (const key in data) {
        if (!ignore.includes(key)) {
          const p = document.createElement('p');
          p.innerHTML = `${key}: ${data[key]}`;
          cont.appendChild(p);
        }
      }
    };
  });
});
