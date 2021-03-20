import { promiseDb } from '../../../db/mysqlConnection'
import { encrypt, salt, checkMatch } from '../../../constants/encyprtion'
import { UploadFile, DeleteFile } from '../../../middlewares/uploader'
import { isValidURL } from '../../../helpers/checkUrl'
import { getInitial } from '../../../constants/getinitial'
import { v4 as uuid } from 'uuid'
import { imageDefault } from '../../../constants/defaultImage'

export const getStafEmails = async () => {
  const [rows, fields] = await promiseDb.query('SELECT email FROM tb_staf')

  const result = rows.map(item => item.email)

  return { result, fields }
}

export const getStafUpdateEmails = async stafId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT email FROM tb_staf WHERE stafId NOT IN (?)',
    stafId
  )

  const result = rows.map(item => item.email)

  return { result, fields }
}

export const insertStaf = async data => {
  const { name, email, password, level } = data

  const initial = await getInitial(name)
  const salted = await salt(10)
  const encrypted = await encrypt(password, salted)
  const file = await UploadFile(imageDefault)

  const img = JSON.stringify(file)

  const {
    result,
    error,
  } = await promiseDb.query(
    'INSERT INTO tb_staf (stafId, name, email, password, initial, profilePicture, level) VALUES (?,?,?,?,?,?,?)',
    [uuid(), name, email, encrypted, initial, img, level]
  )

  return { result, error }
}

export const getStafData = async stafId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE stafId = ?',
    stafId
  )

  const staf = rows[0]

  if (staf === undefined) {
    return false
  } else {
    const result = {
      stafId: staf.stafId,
      name: staf.name,
      email: staf.email,
      initial: staf.initial,
      profilePicture: staf.profilePicture,
      level: staf.level,
      createdAt: staf.createdAt,
      updatedAt: staf.updatedAt,
    }
    return { result, fields }
  }
}

export const getListStaf = async level => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE level = ?',
    level
  )

  const result = rows.map(item => ({
    stafId: item.stafId,
    email: item.email,
    name: item.name,
    initial: item.initial,
    profilePicture: item.profilePicture,
    level: item.level,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  return { result, fields }
}

export const updateStaf = async (stafId, data) => {
  const { name, picture, level } = data
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE stafId = ?',
    stafId
  )

  const staf = rows[0]

  if (staf !== undefined) {
    let img
    if (isValidURL(picture)) {
      img = staf.profilePicture
    } else {
      const curImg = JSON.parse(staf.profilePicture)
      const { public_id } = curImg
      const deleteImg = await DeleteFile(public_id)
      if (deleteImg.result) {
        const file = await UploadFile(picture)
        img = JSON.stringify(file)
      } else {
        img = staf.profilePicture
      }
    }

    const initial = await getInitial(name)

    const [
      result,
      error,
    ] = await promiseDb.query('UPDATE tb_staf SET ? WHERE stafId = ?', [
      { name: name, initial: initial, profilePicture: img, level: level },
      stafId,
    ])

    if (error === undefined) {
      return { result, fields, success: true, found: true }
    } else {
      return { success: false, found: true }
    }
  } else {
    return { success: false, found: false }
  }
}

export const updatePasswordStaf = async (stafId, data) => {
  const { oldPassword, newPassword } = data

  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE stafId = ?',
    stafId
  )

  const staf = rows[0]

  if (staf !== undefined) {
    const isMatch = await checkMatch(oldPassword, staf.password)
    if (isMatch) {
      const salted = await salt(10)
      const encrypted = await encrypt(newPassword, salted)

      const [
        result,
        error,
      ] = await promiseDb.query('UPDATE tbl_staf SET ? WHERE stafId = ?', [
        { password: encrypted },
        stafId,
      ])

      return { match: true, result, error, fields }
    } else {
      return { match: false, error: true, fields }
    }
  } else {
    return false
  }
}

export const deleteStaf = async stafId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE stafId = ?',
    stafId
  )

  const staf = rows[0]

  if (staf !== undefined) {
    const img = JSON.parse(staf.profilePicture)
    const deleteImg = await DeleteFile(img.public_id)

    const [result, error] = await promiseDb.query(
      'DELETE FROM tb_staf WHERE stafId = ?',
      stafId
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
