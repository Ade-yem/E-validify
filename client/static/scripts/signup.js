document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form#signup').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = document.querySelector('form#signup');
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confPwd = form.elements.confirmPassword.value;

    if (password === confPwd) {
      const data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
      };
      fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.status === 200) {
            console.log('Sign up successful');
            window.localStorage.setItem('loggedIn', true);
            window.location.href = 'index.html';
          }
          return response.json();
        })
        .then(data => {
          document.querySelector('div.error').innerHTML = data.message;
          window.localStorage.setItem('username', data.username);
          window.localStorage.setItem('user_id', data.id);
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
