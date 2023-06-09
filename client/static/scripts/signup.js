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

      fetch('http://localhost:5000/register', {
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
            window.localStorage.setItem('username', data.username);
            window.localStorage.setItem('user_id', data.id);
            window.location.href = 'index.html';
          } else {
            console.log('Sign up failed');
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });

      form.reset();
    } else {
      document.querySelector('div.error').innerHTML = 'Password mismatch';
    }
  });
});
