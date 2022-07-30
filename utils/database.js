const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("sqlName","root","userName",{
  dialect: "mysql",
  host: "localhost",
  password: "MiladNasiri1996",
  port: 3307
})

module.exports = sequelize;