import { promiseDb } from '../../../db/mysqlConnection'
import faker from 'faker/locale/id_ID'
import { encrypt, salt } from '../../../constants/encyprtion'
import { v4 as uuid } from 'uuid'
import { imageDefault } from '../../../constants/defaultImage'
import { getInitial } from '../../../constants/getinitial'
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

export const seedUsers = async length => {
  for (var i = 0; i <= length; i++) {
    const id = faker.random.uuid()
    const nik = faker.random.number(999999999999999)
    const name = faker.name.findName()
    const email = faker.internet.email()
    const hash = await encrypt('1sampai8', 10)
    const ph = faker.phone.phoneNumber('08## #### ####')
    const query = await promiseDb.query(
      'INSERT INTO tb_users (userId,nik,name,email,password,phoneNumber) VALUES (?,?,?,?,?,?)',
      [id, nik, name, email, hash, ph]
    )
    if (i === length) {
      return query
    }
  }
}

export const seedStaf = async (length, role) => {
  for (var i = 0; i <= length; i++) {
    const id = faker.random.uuid()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const hash = await encrypt('1sampai8', 10)
    const picture =
      '{"asset_id":"282c704e9c59af1542e1917d94f47faa","public_id":"laporan/upbngfirl81turgffmqh","version":1616008563,"version_id":"62faa03ba40d72cfcec6f47f631cdfbe","signature":"b7be87be33fe57d512b68e72aaed6015048df5c2","width":600,"height":400,"format":"png","resource_type":"image","created_at":"2021-03-17T19:16:03Z","tags":[],"bytes":1783,"type":"upload","etag":"4cd807dc36584e88fbcbd429e6a2ea0a","placeholder":false,"url":"http://res.cloudinary.com/mygalleryfile/image/upload/v1616008563/laporan/upbngfirl81turgffmqh.png","secure_url":"https://res.cloudinary.com/mygalleryfile/image/upload/v1616008563/laporan/upbngfirl81turgffmqh.png"}'
    const initial = await getInitial(name)
    const query = await promiseDb.query(
      'INSERT INTO tb_staf (stafId, name, email, password, initial, profilePicture, level) VALUES (?,?,?,?,?,?,?)',
      [id, name, email, hash, initial, picture, role]
    )
    console.log(query)
    if (i === length) {
      return query
    }
  }
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
