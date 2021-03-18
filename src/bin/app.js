import express from 'express'
import configureApp from '../config/configureApp'
import { getConfig } from '../config/global_config'
import { db as mysqlConnection } from '../db/mysqlConnection'

const port = getConfig('/port')
const app = express()

configureApp(app)

mysqlConnection.getConnection((err, connection) => {
  if (connection) {
    console.log('Connected to mysql database')
  } else {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
