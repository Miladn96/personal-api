const uuid = require("uuid");

const { putNewMessage_message, deleteMessageSuccessful } = require("../messages");
const { readDatabases, writeDatabases, createResponse } = require("../utils");
const {
  DATABASES_NAME: { MESSAGE: DATABASE_NAME_MESSAGE },
} = require("../constant");
const { cloneDeep } = require("lodash");

/**
 *  @data {
 *          fullName: string,
 *          email: string,
 *          message: string
 *          uuid: string,
 *          creationDate: Date,
 *        }
 */
const putNewMessage = (data, cb) => {
  const uid = uuid.v4({});
  const _data = {
    ...data,
    messageUid: uid,
  };
  readDatabases(DATABASE_NAME_MESSAGE, (oldData) => {
    const newData = cloneDeep(oldData);
    newData.push(_data);
    writeDatabases(DATABASE_NAME_MESSAGE, newData, () => {
      cb(createResponse(newData, putNewMessage_message, false));
    });
  });
};

const getAllMessages = (cb) => {
  readDatabases(DATABASE_NAME_MESSAGE, (data) => {
    cb(data);
  });
};

const getMessageWithMessageUid = (messageUid, cb) => {
  readDatabases(DATABASE_NAME_MESSAGE, (data) => {
    const message = data.find((message) => message.messageUid === messageUid)
    cb(message)
  })
}

const deleteMessageWithMessageUid = (messageUid, cb) => {
  readDatabases(DATABASE_NAME_MESSAGE, (messages) => {
    const theMessage = messages.find((message) => message.messageUid === messageUid)
    const _messages = cloneDeep(messages.filter((message) => message.messageUid !== messageUid))
    writeDatabases(DATABASE_NAME_MESSAGE, _messages, () => {
      cb(createResponse(theMessage, deleteMessageSuccessful, false))
    })
  })
}

module.exports = {
  putNewMessage,
  getAllMessages,
  getMessageWithMessageUid,
  deleteMessageWithMessageUid,
};
