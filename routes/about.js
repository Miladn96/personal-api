const express = require("express");
const { putNewMessage } = require("../data");
const { server_error } = require("../messages");
const { createResponse } = require("../utils");
const router = express.Router();

router.post("/send-message", (req, res) => {
  console.log(req.body);
  const { name, email } = req?.body;
  if (email && name) {
    res.status(201);
    putNewMessage(req.body, (_res) => {
      res.send(_res);
    });
  } else {
    res.status(500);
    res.send(createResponse(req.body, server_error, true));
  }
});

module.exports = {
  routerAbout: router,
};
