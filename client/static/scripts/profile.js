document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('title').innerHTML = `${window.localStorage.getItem('username')} | E-validify`;
  document.querySelector('section.welcome h1').innerHTML = `Welcome ${window.localStorage.getItem('username')}`;
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
          window.localStorage.removeItem('user_id');
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
      })
      .finally(() => {
        window.location.href = 'index.html';
      }
      );
  });

  // Get user data
  const user_id = window.localStorage.getItem('user_id');
  fetch(`https://e-validify-backend.onrender.com/user/${user_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      document.querySelector('p.user-email').innerHTML = `Email: ${data.user.email}`;
      document.querySelector('p.user-name').innerHTML = `Name: ${data.user.name}`;
    })
    .catch(error => {
      console.error('Error: ', error);
    });

  fetch(`https://e-validify-backend.onrender.com/user/${user_id}/emails`, {
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
