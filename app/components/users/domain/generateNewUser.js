const { generateNewId } = require('../../../utils/ids');
const { AppError, INVALID_ARGUMENT } = require('../../../utils/errors');

function validateBodyUser(data) {
  const { username, password } = data;

  if (!username || !password) {
    return false;
  }

  if (username && username.length < 1) {
    return false;
  }

  if (password && password.length < 1) {
    return false;
  }

  return true;
}

function generateNewUser(data) {
  if (!validateBodyUser(data)) {
    throw new AppError(INVALID_ARGUMENT, 'Check args and try again', 400);
  }

  return { ...data, createdOn: Date.now(), id: generateNewId() };
}

module.exports = generateNewUser;