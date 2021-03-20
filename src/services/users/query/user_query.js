import { promiseDb } from '../../../db/mysqlConnection'
import { encrypt, salt, checkMatch } from '../../../constants/encyprtion'
import { UploadFile, DeleteFile } from '../../../middlewares/uploader'
import { isValidURL } from '../../../helpers/checkUrl'

export const getUsersEmail = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT email FROM tb_users WHERE userId NOT IN (?)',
    userId
  )

  const result = rows.map(item => item.email)

  return { result, fields }
}

export const getUsersNik = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT nik FROM tb_users WHERE userId NOT IN (?)',
    userId
  )

  const result = rows.map(item => item.nik)

  return { result, fields }
}

export const getUsersPhone = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT phoneNumber FROM tb_users WHERE userId NOT IN (?)',
    userId
  )

  const result = rows.map(item => item.phoneNumber)

  return { result, fields }
}

export const getUserList = async () => {
  const [rows, fields] = await promiseDb.query('SELECT * FROM tb_users')

  const result = rows.map(item => ({
    userId: item.userId,
    nik: item.nik,
    name: item.name,
    email: item.email,
    profilePicture: JSON.parse(item.profilePicture).secure_url,
    phoneNumber: item.phoneNumber,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  return { result, fields }
}

export const getUserById = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE userId = ?',
    userId
  )

  const res = rows[0]

  if (res !== undefined) {
    const result = {
      userId: res.userId,
      nik: res.nik,
      name: res.name,
      email: res.email,
      profilePicture: JSON.parse(res.profilePicture).secure_url,
      phoneNumber: res.phoneNumber,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    }

    return { result, fields }
  } else {
    return { result: false, fields }
  }
}

export const updateUser = async (userId, data) => {
  const { name, phoneNumber, picture } = data
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE userId = ?',
    userId
  )

  const user = rows[0]

  if (user !== undefined) {
    let img
    if (isValidURL(picture)) {
      img = user.profilePicture
    } else {
      const curImg = JSON.parse(user.profilePicture)
      const { public_id } = curImg
      const deleteImg = await DeleteFile(public_id)
      if (deleteImg.result) {
        const file = await UploadFile(picture)
        img = JSON.stringify(file)
      } else {
        img = user.profilePicture
      }
    }

    const [
      result,
      error,
    ] = await promiseDb.query('UPDATE tb_users SET ? WHERE userId = ?', [
      { name: name, phoneNumber: phoneNumber, profilePicture: img },
      userId,
    ])

    if (error === undefined) {
      return { result, fields, success: true }
    } else {
      return false
    }
  } else {
    return false
  }
}

export const updatePasswordUser = async (userId, data) => {
  const { oldPassword, newPassword } = data

  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE userId = ?',
    userId
  )

  const user = rows[0]

  if (user !== undefined) {
    const isMatch = await checkMatch(oldPassword, user.password)
    if (isMatch) {
      const salted = await salt(10)
      const encrypted = await encrypt(newPassword, salted)

      const [
        result,
        error,
      ] = await promiseDb.query('UPDATE tbl_users SET ? WHERE userId = ?', [
        { password: encrypted },
        userId,
      ])

      return { match: true, result, error, fields }
    } else {
      return { match: false, error: true, fields }
    }
  } else {
    return false
  }
}

export const deleteUser = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_users WHERE userId = ?',
    userId
  )

  const user = rows[0]

  if (user !== undefined) {
    const img = JSON.parse(user.profilePicture)
    const deleteImg = await DeleteFile(img.public_id)

    const [result, error] = await promiseDb.query(
      'DELETE FROM tb_users WHERE userId = ?',
      userId
    )
    if (error === undefined) {
      return { result, fields, deleteImg, success: true }
    } else {
      return false
    }
  } else {
    return false
  }
}
