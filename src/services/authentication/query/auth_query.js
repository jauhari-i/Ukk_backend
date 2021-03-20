import { promiseDb } from '../../../db/mysqlConnection'
import { encrypt, salt } from '../../../constants/encyprtion'
import { v4 as uuid } from 'uuid'
import { imageDefault } from '../../../constants/defaultImage'
import { UploadFile } from '../../../middlewares/uploader'

export const getUsersEmail = async () => {
  const [rows, fields] = await promiseDb.query('SELECT email FROM tb_users')

  const result = rows.map(item => item.email)

  return { result, fields }
}

export const getUsersNik = async () => {
  const [rows, fields] = await promiseDb.query('SELECT nik FROM tb_users')

  const result = rows.map(item => item.nik)

  return { result, fields }
}

export const getUsersPhone = async () => {
  const [rows, fields] = await promiseDb.query(
    'SELECT phoneNumber FROM tb_users'
  )

  const result = rows.map(item => item.phoneNumber)

  return { result, fields }
}

export const insertUsers = async data => {
  const { name, nik, email, password, phoneNumber } = data
  const id = uuid()
  const slt = await salt(10)
  const enc = await encrypt(password, slt)
  const file = await UploadFile(imageDefault)

  const picture = JSON.stringify(file)

  const [
    query,
    error,
  ] = await promiseDb.query(
    'INSERT INTO tb_users (userId,nik,name,email,password,profilePicture, phoneNumber) VALUES (?,?,?,?,?,?,?)',
    [id, nik, name, email, enc, picture, phoneNumber]
  )

  return { query, error }
}

export const getUserById = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE userId = ?',
    userId
  )

  return { rows, fields }
}

export const getUserByEmail = async email => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE email = ?',
    email
  )

  const result = rows[0]

  return { result, fields }
}

export const getStafByEmail = async email => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE email = ?',
    email
  )

  const result = rows[0]

  return { result, fields }
}

export const getStafById = async stafId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE stafId = ?',
    stafId
  )

  const result = rows[0]

  return { result, fields }
}
