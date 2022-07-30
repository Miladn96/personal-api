const ERROR = {
  createUserMessage_error: `There is a problem on the server. We can't create user. please be sure that fill all fields!`,
  existsUserMessage_error: `There is existing user all ready. try again!`,
  userNotFound_error: `Not found the user.`,
  usersNotFound_error: `Not found the users.`,
  server_error: `There is a problem on the server.`
}

module.exports = {
  createUserMessage_error: ERROR.createUserMessage_error,
  existsUserMessage_error: ERROR.existsUserMessage_error,
  userNotFound_error: ERROR.userNotFound_error,
  usersNotFound_error: ERROR.usersNotFound_error,
  server_error: ERROR.server_error
}