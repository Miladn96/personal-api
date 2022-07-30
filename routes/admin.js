const express = require("express");
const router = express.Router();

const { createUser, getAllUsers, getUserByUid, getAllMessages } = require("../data");
const {
  getUser,
  getUsers,
  createUserMessage_error,
  usersNotFound_error,
  userNotFound_error,
  server_error,
} = require("../messages");
const { createResponse } = require("../utils");

//? create new user
router.post("/new-user", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    creationDate,
    isAdmin,
    userName,
  } = req?.body;
  if (firstName && lastName && email && password && creationDate && userName) {
    createUser({ ...req.body, isAdmin: isAdmin | false }, (response) => {
      res.send(JSON.stringify(response));
    });
  } else {
    res.status(500);
    const response = {
      message: createUserMessage_error,
      error: 1,
    };
    res.send(JSON.stringify(response));
  }
});

//? get all users
router.get("/users", (req, res) => {
  getAllUsers((users) => {
    users
      ? res.send(createResponse(users, getUsers, 0))
      : res.send(createResponse(users, usersNotFound_error, 1));
  });
});

//? get user with uid
router.get("/users/:uid", (req, res) => {
  const { firstName, lastName, email, creationDate, isAdmin } = req.query;
  getUserByUid(req.params.uid, (user) => {
    if (!user) res.send(createResponse(user, userNotFound_error, 1));
    else {
      if (firstName || lastName || email || creationDate || isAdmin) {
        res.send(
          createResponse(
            {
              firstName: firstName && user.firstName,
              lastName: lastName && user.lastName,
              email: email && user.email,
              creationDate: creationDate && user.creationDate,
              isAdmin: isAdmin && user.isAdmin,
            },
            getUser,
            0
          )
        );
      } else {
        res.send(createResponse(user, getUser, 0));
      }
    }
  });
});

//? get All Messages
router.get("/messages", (req, res) => {
  getAllMessages((messages) => {
    if (messages) {
      res.status(200);
      res.send(createResponse(messages, null, false));
    } else {
      res.status(404);
      res.send(createResponse(undefined, `There is not messages!`, true));
    }
  });
});

//? get message by uid
router.get("/message/:messageUid", (req, res) => {
  getUserByUid(req.params.messageUid, (message) => {
    if (message) {
      res.status(200);
      res.send(createResponse(message, null, false));
    } else {
      res.status(500);
      res.send(createResponse(undefined, server_error, true));
    }
  });
});

module.exports = {
  routerAdmin: router,
};
