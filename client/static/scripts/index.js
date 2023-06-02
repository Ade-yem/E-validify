document.addEventListener('DOMContentLoaded', function () {
  // Get the sign up, sign in, and log out buttons
  const signUpBtn = document.querySelector('.signup-btn');
  const signInBtn = document.querySelector('.signin-btn');
  const logOutBtn = document.querySelector('.logout-btn');
  const avatar = document.querySelector('div.avatar');

  // Check if the user is logged in
  const isLoggedIn = window.localStorage.getItem('loggedIn');

  // Toggle the visibility of the buttons based on the user's login status
  if (isLoggedIn) {
    signUpBtn.style.display = 'none';
    signInBtn.style.display = 'none';
    logOutBtn.style.display = 'block';
    avatar.innerHTML = window.localStorage.getItem('username')[0].toUpperCase();

  } else {
    signUpBtn.style.display = 'block';
    signInBtn.style.display = 'block';
    logOutBtn.style.display = 'none';
  }

  avatar.addEventListener('click', function () {
    window.location.href = 'profile.html';
  });

  document.querySelector('.logout-btn').addEventListener('click', function () {
    fetch('http://localhost:5000/api/v1/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Logged out');
          window.localStorage.removeItem('loggedIn');
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('user_id');
          window.location.replace = '../index.html';
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
    if (isLoggedIn) {
      fetch('http://localhost:5000/api/v1/validate', {
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
        .then(data => appendData(data))
        .catch(error => {
          console.error('Error: ', error);
        });
    } else {
      fetch('http://localhost:5000/api/v1/validate_guest', {
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
        .then(data => appendData(data))
        .catch(error => {
          console.error('Error: ', error);
        });
    }

    const appendData = (data) => {
      const container = document.querySelector('section#result');
      container.appendChild(document.createElement('h3'));
      container.querySelector('h3').innerHTML = 'Result';
      container.appendChild(document.createElement('div'));
      container.querySelector('div').classList.add('results');
      const cont = container.querySelector('div.results');
      for (const key in data) {
        const p = document.createElement('p');
        p.innerHTML = `${key}: ${data[key]}`;
        cont.appendChild(p);
      }
    };
  });
});