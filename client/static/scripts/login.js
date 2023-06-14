document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form#login').addEventListener('submit', function (event) {
    event.preventDefault();
    const login = document.querySelector('form#login');
    const email = login.elements.email.value;
    const password = login.elements.password.value;
    const data = {
      email: email,
      password: password
    };

    fetch('https://e-validify-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          window.localStorage.setItem('loggedIn', true);
        }
        return response.json();
      })
      .then(data => {
        window.localStorage.setItem('username', data.user.username);
        window.localStorage.setItem('userId', data.user._id);
      })
      .catch(error => {
        console.error('Error: ', error);
      })
      .finally(() => {
        if (window.localStorage.getItem('loggedIn')) {
          window.location.href = 'index.html';
        }
      });
  });
});
