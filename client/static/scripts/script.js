// Get the sign up, sign in, and log out buttons
const signUpBtn = document.querySelector('.signup-btn');
const signInBtn = document.querySelector('.signin-btn');
const logOutBtn = document.querySelector('.logout-btn');

// Check if the user is logged in
const isLoggedIn = true; // Replace with your logic to determine if the user is logged in

// Toggle the visibility of the buttons based on the user's login status
if (isLoggedIn) {
  signUpBtn.style.display = 'none';
  signInBtn.style.display = 'none';
  logOutBtn.style.display = 'block';
} else {
  signUpBtn.style.display = 'block';
  signInBtn.style.display = 'block';
  logOutBtn.style.display = 'none';
}