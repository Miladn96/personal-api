const express = require("express");
const { cloneDeep } = require("lodash");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserByUid,
  getAllMessages,
  deleteMessageWithMessageUid,
} = require("../data");
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
  const pageNumber = req.query.pageNumber;
  const perPage = req.query.perPage;
  getAllMessages((messages) => {
    if (messages) {
      res.status(200);
      switch (undefined) {
        case pageNumber:
        case perPage:
          res.send(
            createResponse(
              { messages: messages, totalMessages: messages.length },
              null,
              false
            )
          );
          break;

        default:
          res.send(
            createResponse(
              {
                messages: cloneDeep(messages).filter(
                  (message, index) =>
                    perPage * (pageNumber - 1) <= index &&
                    perPage * pageNumber > index
                ),
                page: pageNumber,
                totalMessages: messages.length,
              },
              null,
              false
            )
          );
          break;
      }
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

//? delete message by uid
router.delete("/message/:messageUid", (req, res) => {
  const { messageUid } = req.params;
  deleteMessageWithMessageUid(messageUid, (response) => {
    res.status(200);
    res.send(response);
  });
});

module.exports = {
  routerAdmin: router,
};
