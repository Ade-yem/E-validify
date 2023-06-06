document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('form#login').addEventListener('submit', function(event) {
    event.preventDefault();
    const login = document.querySelector('form#login');
    const email = login.elements.email.value;
    const password = login.elements.password.value;
    const data = {
      email: email,
      password: password
    };

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('username', data.username);
          window.localStorage.setItem('user_id', data.id);
          window.location.href = 'index.html';
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('user_id', data.id);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  });
});
