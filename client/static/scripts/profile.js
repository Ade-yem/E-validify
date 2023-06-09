document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('title').innerHTML = `${window.localStorage.getItem('username')} | E-validify`;
  document.querySelector('section.welcome h1').innerHTML = `Welcome ${window.localStorage.getItem('username')}`;
  document.querySelector('.logout-btn').addEventListener('click', function () {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Logged out');
          window.localStorage.removeItem('loggedIn');
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('user_id');
          // reload the page
          window.location.reload();
          window.location.replace = 'index.html';
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

  // Get user data
  fetch("http://localhost:3000/user", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      document.querySelector('p.user-email').innerHTML = `Email: ${data.email}`;
      document.querySelector('#username').innerHTML = `Name: ${data.name}`;
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  fetch("http://localhost:3000/emails", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      let html = '';
      data.forEach(email => {
        html += `<li class="email-box"><p class="email">${email.email}</p><div class="email-details">${email.details}</div></li>`;
      });
      document.querySelector('ul.emails').innerHTML = html;
      document.querySelector('li.email-box').addEventListener('click', function () {
        document.querySelector('div.email-details').toggleVisibility();
      });
    })
    .catch(error => {
      console.error('Error: ', error);
    });
});
