import { promiseDb } from '../../../db/mysqlConnection'
import { UploadFile, DeleteFile } from '../../../middlewares/uploader'
import { isValidURL } from '../../../helpers/checkUrl'
import { v4 as uuid } from 'uuid'

export const insertQuery = async (userId, data) => {
  const { report, picture } = data

  let img
  if (picture) {
    img = await UploadFile(picture)
  } else {
    img = ''
  }

  const id = uuid()

  const [
    res,
    error,
  ] = await promiseDb.query(
    'INSERT INTO tb_laporan (reportId, userId, stafId, isValid, reportText, reportPicture, isDone) VALUES (?,?,?,?,?,?,?)',
    [id, userId, '', false, report, img, false]
  )

  if (error) {
    return false
  } else {
    return { res }
  }
}

export const validateQuery = async (reportId, stafId, data) => {
  const { status } = data

  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_laporan WHERE reportId = ?',
    reportId
  )

  const report = rows[0]

  if (report !== undefined) {
    const [
      res,
      error,
    ] = await promiseDb.query('UPDATE tb_laporan SET ? WHERE reportId = ?', [
      { stafId: stafId, isValid: status },
      reportId,
    ])

    if (error !== undefined) {
      return { notFound: false, error: true }
    } else {
      return { res, fields, notFound: false, error: false }
    }
  } else {
    return { notFound: true }
  }
}

export const responseQuery = async (reportId, stafId, data) => {
  const { response } = data

  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_laporan WHERE reportId = ?',
    reportId
  )

  const report = rows[0]

  if (report !== undefined) {
    const [res, error] = await promiseDb.query(
      'UPDATE tb_laporan SET ? WHERE reportId = ?',
      [
        {
          stafId: stafId,
          responseText: response,
          responseDate: new Date(),
          isDone: true,
        },
        reportId,
      ]
    )

    if (error !== undefined) {
      return { notFound: false, error: true }
    } else {
      return { res, fields, notFound: false, error: false }
    }
  } else {
    return { notFound: true }
  }
}

export const listAllQuery = async () => {
  const [rows, fields] = await promiseDb.query(
    'SELECT tb_laporan.*,tb_users.userId,tb_users.name,tb_users.email,tb_users.nik,tb_users.profilePicture, tb_users.phoneNumber FROM tb_laporan INNER JOIN tb_users ON tb_laporan.userId=tb_users.userId'
  )

  const result = await Promise.all(
    rows.map(async item => {
      if (item.stafId) {
        const query = await promiseDb.query(
          'SELECT * FROM tb_staf WHERE stafId = ?',
          item.stafId
        )

        const staf = query[0][0]

        return {
          reportId: item.reportId,
          userId: item.userId,
          stafId: item.stafId,
          reportText: item.reportText,
          reportPicture: item.reportPicture
            ? JSON.parse(item.reportPicture).secure_url
            : '',
          responseText: item.responseText,
          responseDate: item.responseDate,
          isValid: item.isValid === 1 ? true : false,
          isDone: item.isDone === 1 ? true : false,
          userData: {
            name: item.name,
            nik: item.nik,
            email: item.email,
            profilePicture: JSON.parse(item.profilePicture).secure_url,
            phoneNumber: item.phoneNumber,
          },
          stafData: {
            name: staf.name,
            email: staf.email,
            profilePicture: JSON.parse(staf.profilePicture).secure_url,
          },
          createdAt: item.createdAt,
        }
      } else {
        return {
          reportId: item.reportId,
          userId: item.userId,
          stafId: item.stafId,
          reportText: item.reportText,
          reportPicture: item.reportPicture
            ? JSON.parse(item.reportPicture).secure_url
            : '',
          responseText: item.responseText,
          responseDate: item.responseDate,
          isValid: item.isValid === 1 ? true : false,
          isDone: item.isDone === 1 ? true : false,
          userData: {
            name: item.name,
            nik: item.nik,
            email: item.email,
            profilePicture: JSON.parse(item.profilePicture).secure_url,
            phoneNumber: item.phoneNumber,
          },
          createdAt: item.createdAt,
        }
      }
    })
  )

  return { result, fields }
}

export const listUserQuery = async userId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT tb_laporan.*,tb_users.userId,tb_users.name,tb_users.email,tb_users.nik,tb_users.profilePicture, tb_users.phoneNumber FROM tb_laporan INNER JOIN tb_users ON tb_laporan.userId=tb_users.userId WHERE tb_laporan.userId = ?',
    userId
  )

  const result = await Promise.all(
    rows.map(async item => {
      if (item.stafId) {
        const query = await promiseDb.query(
          'SELECT * FROM tb_staf WHERE stafId = ?',
          item.stafId
        )

        const staf = query[0][0]

        return {
          reportId: item.reportId,
          userId: item.userId,
          stafId: item.stafId,
          reportText: item.reportText,
          reportPicture: item.reportPicture
            ? JSON.parse(item.reportPicture).secure_url
            : '',
          responseText: item.responseText,
          responseDate: item.responseDate,
          isValid: item.isValid === 1 ? true : false,
          isDone: item.isDone === 1 ? true : false,
          userData: {
            name: item.name,
            nik: item.nik,
            email: item.email,
            profilePicture: JSON.parse(item.profilePicture).secure_url,
            phoneNumber: item.phoneNumber,
          },
          stafData: {
            name: staf.name,
            email: staf.email,
            profilePicture: JSON.parse(staf.profilePicture).secure_url,
          },
          createdAt: item.createdAt,
        }
      } else {
        return {
          reportId: item.reportId,
          userId: item.userId,
          stafId: item.stafId,
          reportText: item.reportText,
          reportPicture: item.reportPicture
            ? JSON.parse(item.reportPicture).secure_url
            : '',
          responseText: item.responseText,
          responseDate: item.responseDate,
          isValid: item.isValid === 1 ? true : false,
          isDone: item.isDone === 1 ? true : false,
          userData: {
            name: item.name,
            nik: item.nik,
            email: item.email,
            profilePicture: JSON.parse(item.profilePicture).secure_url,
            phoneNumber: item.phoneNumber,
          },
          createdAt: item.createdAt,
        }
      }
    })
  )

  return { result, fields }
}

export const updateQuery = async (reportId, userId, data) => {
  const { report, picture } = data

  const [
    rows,
    fields,
  ] = await promiseDb.query(
    'SELECT * FROM tb_laporan WHERE reportId = ? AND userId = ?',
    [reportId, userId]
  )

  const reports = rows[0]

  if (reports !== undefined) {
    let img
    if (picture) {
      if (isValidURL(picture)) {
        img = reports.reportPicture
      } else {
        const curImg = JSON.parse(reports.reportPicture)
        const { public_id } = curImg
        const deleteImg = await DeleteFile(public_id)
        if (deleteImg.result) {
          const file = await UploadFile(picture)
          img = JSON.stringify(file)
        } else {
          img = reports.reportPicture
        }
      }
    } else {
      img = ''
    }

    const [
      result,
      error,
    ] = await promiseDb.query('UPDATE tb_laporan SET = ? WHERE reportId = ?', [
      { reportText: report, reportPicture: img },
      reportId,
    ])
    if (error === undefined) {
      return { result, fields, success: true }
    } else {
      return { notFound: false, error: true }
    }
  } else {
    return { notFound: true }
  }
}

export const deleteQuery = async (reportId, userId) => {
  const [
    rows,
    fields,
  ] = await promiseDb.query(
    'SELECT * FROM tb_laporan WHERE reportId = ? AND userId = ?',
    [reportId, userId]
  )

  const report = rows[0]

  if (report !== undefined) {
    const img = JSON.parse(report.reportPicture)
    const deleteImg = await DeleteFile(img.public_id)

    const [result, error] = await promiseDb.query(
      'DELETE FROM tb_laporan WHERE reportId = ?',
      reportId
    )
    if (error === undefined) {
      return { result, fields, deleteImg, success: true }
    } else {
      return { notFound: false, error: true }
    }
  } else {
    return { notFound: true }
  }
}

export const deleteQueryAdmin = async reportId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_laporan WHERE reportId = ?',
    reportId
  )

  const report = rows[0]

  if (report !== undefined) {
    const img = JSON.parse(report.reportPicture)
    const deleteImg = await DeleteFile(img.public_id)

    const [result, error] = await promiseDb.query(
      'DELETE FROM tb_laporan WHERE reportId = ?',
      reportId
    )
    if (error === undefined) {
      return { result, fields, deleteImg, success: true }
    } else {
      return { notFound: false, error: true }
    }
  } else {
    return { notFound: true }
  }
}

export const detailQuery = async reportId => {
  const [rows, fields] = await promiseDb.query(
    'SELECT tb_laporan.*,tb_users.userId,tb_users.name,tb_users.email,tb_users.nik,tb_users.profilePicture, tb_users.phoneNumber FROM tb_laporan INNER JOIN tb_users ON tb_laporan.userId=tb_users.userId WHERE reportId = ?',
    reportId
  )

  const detail = rows[0]
  if (detail) {
    let result
    if (detail.stafId) {
      const query = await promiseDb.query(
        'SELECT * FROM tb_staf WHERE stafId = ?',
        detail.stafId
      )

      const staf = query[0][0]

      result = {
        reportId: detail.reportId,
        userId: detail.userId,
        stafId: detail.stafId,
        reportText: detail.reportText,
        reportPicture: detail.reportPicture
          ? JSON.parse(detail.reportPicture).secure_url
          : '',
        responseText: detail.responseText,
        responseDate: detail.responseDate,
        isValid: detail.isValid === 1 ? true : false,
        isDone: detail.isDone === 1 ? true : false,
        userData: {
          name: detail.name,
          nik: detail.nik,
          email: detail.email,
          profilePicture: JSON.parse(detail.profilePicture).secure_url,
          phoneNumber: detail.phoneNumber,
        },
        stafData: {
          name: staf.name,
          email: staf.email,
          profilePicture: JSON.parse(staf.profilePicture).secure_url,
        },
        createdAt: detail.createdAt,
      }
    } else {
      result = {
        reportId: detail.reportId,
        userId: detail.userId,
        stafId: detail.stafId,
        reportText: detail.reportText,
        reportPicture: detail.reportPicture
          ? JSON.parse(detail.reportPicture).secure_url
          : '',
        responseText: detail.responseText,
        responseDate: detail.responseDate,
        isValid: detail.isValid === 1 ? true : false,
        isDone: detail.isDone === 1 ? true : false,
        userData: {
          name: detail.name,
          nik: detail.nik,
          email: detail.email,
          profilePicture: JSON.parse(detail.profilePicture).secure_url,
          phoneNumber: detail.phoneNumber,
        },
        createdAt: detail.createdAt,
      }
    }

    return { result, fields }
  } else {
    return { notFound: true }
  }
}
