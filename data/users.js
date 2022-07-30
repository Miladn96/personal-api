const uuid = require("uuid");

const { createUserMessage, existsUserMessage_error } = require("../messages");
const { readDatabases, writeDatabases } = require("../utils");
const {
  DATABASES_NAME: { USERS: DATABASE_NAME_USERS },
} = require("../constant");

/**
 *  @data {
 *          firstName: string,
 *          lastName: string,
 *          email: string
 *          creationDate: Date,
 *          password: string,
 *          isAdmin: boolean,
 *        }
 */
const createUser = (data, cb) => {
  const uid = uuid.v4({});
  const _data = {
    ...data,
    uid,
  };
  readDatabases("users", (oldData) => {
    if (!oldData.find((item) => item.userName === _data.userName)) {
      const newData = [...oldData];
      newData.push(_data);
      writeDatabases(DATABASE_NAME_USERS, newData, () => {
        cb({
          data: newData,
          message: createUserMessage,
          error: false,
        });
      });
    } else {
      cb({
        message: existsUserMessage_error,
        error: true,
      });
    }
  });
};

const updateUser = (uid, cb) => {
  readDatabases(DATABASE_NAME_USERS, (users) => {
    const user = users.find((user) => user.uid === uid);
    const filterUsers = users.filter((user) => user.uid !== uid);
    const updatedUsers = [...filterUsers, user];
    writeDatabases(DATABASE_NAME_USERS, updatedUsers, () => {
      cb(updatedUsers);
    });
  });
};

const deleteUser = (uid, cb) => {
  readDatabases(DATABASE_NAME_USERS, (users) => {
    const filterUsers = users.filter((user) => user.uid !== uid);
    writeDatabases(DATABASE_NAME_USERS, filterUsers, () => {
      cb(filterUsers);
    });
  });
};

const getAllUsers = (cb) => {
  readDatabases(DATABASE_NAME_USERS, (users) => {
    cb(users);
  });
};

const getUserByUid = (uid, cb) => {
  readDatabases(DATABASE_NAME_USERS, (users) => {
    const user = users.find((user) => user.uid === uid);
    cb(user);
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByUid
};
