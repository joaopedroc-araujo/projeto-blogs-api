const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
};
  
const validatePassword = (password) => {
  if (password.length < 6) {
    throw new Error('"password" length must be at least 6 characters long');
  }
};
  
const validateEmail = (email) => {
  if (!email || !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    throw new Error('"email" must be a valid email');
  }
};

module.exports = {
  validateDisplayName,
  validatePassword,
  validateEmail,
};