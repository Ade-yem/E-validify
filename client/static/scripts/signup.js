document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form#signup').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = document.querySelector('form#signup');
    const name = form.elements.name.value;
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confPwd = form.elements.confirmPassword.value;

    if (password === confPwd) {
      const data = {
        name: name,
        username: username,
        email: email,
        password: password
      };

      fetch('https://e-validify-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.status === 201) {
            console.log('Sign up successful');
            window.localStorage.setItem('loggedIn', true);
            return response.json();
          }
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
            form.reset();
            window.location.href = 'index.html';
          }
        });
    } else {
      document.querySelector('div.error').innerHTML = 'Password mismatch';
    }
  });
});
