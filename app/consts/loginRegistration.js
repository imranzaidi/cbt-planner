const errorMessages = {
  emailLookUp: 'No user with that email.',
  existingUser: 'A user with that email already exists!',
  incorrectPassword: 'Incorrect password.',
  invalidEmail: 'Please enter a valid email!',
  missingPassword: 'Password cannot be blank!',
  invalidPasswordLength: 'Password must be at least 8 characters long!'
};

const errorTypes = {
  login: 'LoginError',
  signUp: 'SignUpError'
};


module.exports = {
  errorMessages,
  errorTypes
};
