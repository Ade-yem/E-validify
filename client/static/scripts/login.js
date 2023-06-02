document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form#login').addEventListener('submit', function (event) {
    event.preventDefault();
    const login = document.querySelector('form#login');
    const username = login.elements.email.value;
    const password = login.elements.password.value;
    const data = {
      username: username, password: password
    };

    fetch('http://localhost:5000/api/v1/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          window.localStorage.setItem('loggedIn', true);
          window.location.href('index.html');
        }
        return response.json();
      })
      .then(data => {
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('user_id', data.id);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  });
});
