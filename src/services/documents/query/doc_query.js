/* eslint-disable no-async-promise-executor */
import { promiseDb } from '../../../db/mysqlConnection'
import { UploadFile } from '../../../middlewares/uploader'
import excel4node from 'excel4node'
import fs from 'fs'
import base64 from 'base64topdf'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFont from 'pdfmake/build/vfs_fonts'
import {
  tableBody,
  tableHeader,
  tableTitle,
} from '../../../constants/excelConfig'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import { listAllQuery } from '../../laporan/query/laporan_query'

export const excelUserQuery = async () => {
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

  const wb = new excel4node.Workbook()
  const ws = wb.addWorksheet('Sheet 1', {
    sheetFormat: {
      baseColWidth: 20,
      defaultColWidth: 20,
    },
  })

  const titleStyle = wb.createStyle(tableTitle)
  const bodyStyle = wb.createStyle(tableBody)
  const headerStyle = wb.createStyle(tableHeader)

  ws.cell(1, 1, 1, 4, true)
    .string('Data User')
    .style(titleStyle)
  ws.cell(3, 1)
    .string('No')
    .style(headerStyle)
  ws.cell(3, 2)
    .string('Name')
    .style(headerStyle)
  ws.cell(3, 3)
    .string('NIK')
    .style(headerStyle)
  ws.cell(3, 4)
    .string('Email')
    .style(headerStyle)
  ws.cell(3, 5)
    .string('Picture')
    .style(headerStyle)
  ws.cell(3, 6)
    .string('Phone Number')
    .style(headerStyle)
  ws.cell(3, 7)
    .string('Register at')
    .style(headerStyle)

  ws.column(5).setWidth(100)

  result.map((item, idx) => {
    ws.cell(idx + 4, 1)
      .number(idx + 1)
      .style(bodyStyle)
    ws.cell(idx + 4, 2)
      .string(item.name)
      .style(bodyStyle)
    ws.cell(idx + 4, 3)
      .string(item.nik)
      .style(bodyStyle)
    ws.cell(idx + 4, 4)
      .string(item.email)
      .style(bodyStyle)
    ws.cell(idx + 4, 5)
      .string(item.profilePicture)
      .style(bodyStyle)
    ws.cell(idx + 4, 6)
      .string(item.phoneNumber)
      .style(bodyStyle)
    ws.cell(idx + 4, 7)
      .string(moment(item.createdAt).format('DD MMM YYYY'))
      .style(bodyStyle)
  })

  const excelId = uuid()

  const excelName = `list-user-laporan-${excelId}.xlsx`

  const excelData = await wb.writeToBuffer(`./src/uploads/${excelName}`)

  await fs.writeFileSync(`./src/uploads/${excelName}`, excelData)

  const excelFile = await fs.createReadStream(`./src/uploads/${excelName}`)

  if (excelFile) {
    const file = await UploadFile(excelFile.path)
    if (file) {
      await fs.unlinkSync(`./src/uploads/${excelName}`)
      return { error: false, file }
    } else {
      return { error: true, fields }
    }
  } else {
    return { error: true, fields }
  }
}

export const excelStafQuery = async () => {
  const [rows, fields] = await promiseDb.query(
    'SELECT * FROM tb_staf WHERE level = 1'
  )

  const result = rows.map(item => ({
    stafId: item.stafId,
    email: item.email,
    name: item.name,
    initial: item.initial,
    profilePicture: JSON.parse(item.profilePicture).secure_url,
    level: item.level,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  const wb = new excel4node.Workbook()
  const ws = wb.addWorksheet('Sheet 1', {
    sheetFormat: {
      baseColWidth: 20,
      defaultColWidth: 20,
    },
  })

  const titleStyle = wb.createStyle(tableTitle)
  const bodyStyle = wb.createStyle(tableBody)
  const headerStyle = wb.createStyle(tableHeader)

  ws.cell(1, 1, 1, 4, true)
    .string('Data Petugas')
    .style(titleStyle)
  ws.cell(3, 1)
    .string('No')
    .style(headerStyle)
  ws.cell(3, 2)
    .string('Name')
    .style(headerStyle)
  ws.cell(3, 3)
    .string('Initial')
    .style(headerStyle)
  ws.cell(3, 4)
    .string('Email')
    .style(headerStyle)
  ws.cell(3, 5)
    .string('Picture')
    .style(headerStyle)
  ws.cell(3, 6)
    .string('Level')
    .style(headerStyle)
  ws.cell(3, 7)
    .string('Register at')
    .style(headerStyle)

  ws.column(5).setWidth(100)

  result.map((item, idx) => {
    ws.cell(idx + 4, 1)
      .number(idx + 1)
      .style(bodyStyle)
    ws.cell(idx + 4, 2)
      .string(item.name)
      .style(bodyStyle)
    ws.cell(idx + 4, 3)
      .string(item.initial)
      .style(bodyStyle)
    ws.cell(idx + 4, 4)
      .string(item.email)
      .style(bodyStyle)
    ws.cell(idx + 4, 5)
      .string(item.profilePicture)
      .style(bodyStyle)
    ws.cell(idx + 4, 6)
      .string(item.level === '1' && 'Petugas')
      .style(bodyStyle)
    ws.cell(idx + 4, 7)
      .string(moment(item.createdAt).format('DD MMM YYYY'))
      .style(bodyStyle)
  })

  const excelId = uuid()

  const excelName = `list-petugas-laporan-${excelId}.xlsx`

  const excelData = await wb.writeToBuffer(`./src/uploads/${excelName}`)

  await fs.writeFileSync(`./src/uploads/${excelName}`, excelData)

  const excelFile = await fs.createReadStream(`./src/uploads/${excelName}`)

  if (excelFile) {
    const file = await UploadFile(excelFile.path)
    if (file) {
      await fs.unlinkSync(`./src/uploads/${excelName}`)
      return { error: false, file }
    } else {
      return { error: true, fields }
    }
  } else {
    return { error: true, fields }
  }
}

export const excelLaporanQuery = async () => {
  const resultData = await listAllQuery()

  const data = resultData.result.map(item => ({
    reportId: item.reportId,
    userName: item.userData.name,
    stafName: item.stafId !== null ? item.stafData.name : '-',
    reportText: item.reportText,
    reportPicture: item.reportPicture ? item.reportPicture : '-',
    responseText: item.responseText ? item.responseText : '-',
    responseDate: item.responseDate
      ? moment(item.responseDate).format('DD MMMM YYYY')
      : '-',
    isValid: item.isValid ? 'Valid' : 'Tidak Valid',
    isDone: item.isDone ? 'Selesai' : 'Belum Selesai',
    createdAt: item.createdAt,
  }))

  const wb = new excel4node.Workbook()
  const ws = wb.addWorksheet('Sheet 1', {
    sheetFormat: {
      baseColWidth: 20,
      defaultColWidth: 20,
    },
  })

  const titleStyle = wb.createStyle(tableTitle)
  const bodyStyle = wb.createStyle(tableBody)
  const headerStyle = wb.createStyle(tableHeader)

  ws.cell(1, 1, 1, 4, true)
    .string('Data Laporan')
    .style(titleStyle)
  ws.cell(3, 1)
    .string('No')
    .style(headerStyle)
  ws.cell(3, 2)
    .string('User Name')
    .style(headerStyle)
  ws.cell(3, 3)
    .string('Staf name')
    .style(headerStyle)
  ws.cell(3, 4)
    .string('Report Text')
    .style(headerStyle)
  ws.cell(3, 5)
    .string('Report Picture')
    .style(headerStyle)
  ws.cell(3, 6)
    .string('Response Text')
    .style(headerStyle)
  ws.cell(3, 7)
    .string('Response Date')
    .style(headerStyle)
  ws.cell(3, 8)
    .string('Report Valid')
    .style(headerStyle)
  ws.cell(3, 9)
    .string('Report Done')
    .style(headerStyle)
  ws.cell(3, 10)
    .string('Created At')
    .style(headerStyle)

  ws.column(5).setWidth(100)

  data.map((item, idx) => {
    ws.cell(idx + 4, 1)
      .number(idx + 1)
      .style(bodyStyle)
    ws.cell(idx + 4, 2)
      .string(item.userName)
      .style(bodyStyle)
    ws.cell(idx + 4, 3)
      .string(item.stafName)
      .style(bodyStyle)
    ws.cell(idx + 4, 4)
      .string(item.reportText)
      .style(bodyStyle)
    ws.cell(idx + 4, 5)
      .string(item.reportPicture)
      .style(bodyStyle)
    ws.cell(idx + 4, 6)
      .string(item.responseText)
      .style(bodyStyle)
    ws.cell(idx + 4, 7)
      .string(item.responseDate)
      .style(bodyStyle)
    ws.cell(idx + 4, 8)
      .string(item.isValid)
      .style(bodyStyle)
    ws.cell(idx + 4, 9)
      .string(item.isDone)
      .style(bodyStyle)
    ws.cell(idx + 4, 10)
      .string(moment(item.createdAt).format('DD MMMM YYYY'))
      .style(bodyStyle)
  })

  const excelId = uuid()

  const excelName = `list-report-laporan-${excelId}.xlsx`

  const excelData = await wb.writeToBuffer(`./src/uploads/${excelName}`)

  await fs.writeFileSync(`./src/uploads/${excelName}`, excelData)

  const excelFile = await fs.createReadStream(`./src/uploads/${excelName}`)

  if (excelFile) {
    const file = await UploadFile(excelFile.path)
    if (file) {
      await fs.unlinkSync(`./src/uploads/${excelName}`)
      return { error: false, file }
    } else {
      return { error: true }
    }
  } else {
    return { error: true }
  }
}

export const pdfUserQuery = async () => {
  const header = 'List User Laporan Masyarakat'
  let bodyTable = []
  let row = [
    { text: 'No', style: 'tableHeader' },
    { text: 'Name', style: 'tableHeader' },
    { text: 'NIK', style: 'tableHeader' },
    { text: 'Email', style: 'tableHeader' },
    { text: 'Profile Picture', style: 'tableHeader' },
    { text: 'Phone Number', style: 'tableHeader' },
    { text: 'Register At', style: 'tableHeader' },
  ]

  bodyTable.push(row)

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

  result.map((item, idx) => {
    row = []
    row = [
      { text: idx + 1, style: 'tableBody', alignment: 'center' },
      { text: item.name, style: 'tableBody' },
      { text: item.nik, style: 'tableBody' },
      { text: item.email, style: 'tableBody' },
      { text: item.profilePicture, style: 'tableBody' },
      { text: item.phoneNumber, style: 'tableBody' },
      {
        text: moment(item.createdAt).format('DD MMMM YYYY'),
        style: 'tableBody',
      },
    ]

    bodyTable.push(row)
  })

  const docDefinition = {
    pageSize: {
      width: 970,
      height: 1800,
    },
    pageOrientation: 'landscape',
    content: [
      {
        text: header,
        style: 'header',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [50, 200, 200, 100, 100, 150, 100, 100, 190, 50, 100, 200],
          body: bodyTable,
        },
        layout: 'lightHorizontalLines',
      },
    ],
    style: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center',
      },
      subHeder: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 0],
        alignment: 'center',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        fontSize: 13,
        bold: true,
        margin: [0, 0, 0, 3],
        color: 'black',
      },
      tableBody: {
        fontSize: 13,
        bold: false,
        margin: [0, 1, 0, 1],
        color: 'black',
      },
    },
  }

  pdfMake.vfs = pdfFont.pdfMake.vfs

  const pdfId = uuid()

  const pdfName = `list-user-laporan-${pdfId}`

  return await new Promise(async (resolve, reject) => {
    await pdfMake.createPdf(docDefinition).getBase64(async enc => {
      base64.base64Decode(enc, `./src/uploads/${pdfName}.pdf`)
      const pdfFile = await fs.createReadStream(`./src/uploads/${pdfName}.pdf`)

      const file = await UploadFile(pdfFile.path)

      await fs.unlinkSync(`./src/uploads/${pdfName}.pdf`)

      if (file) {
        resolve({ error: false, url: file.secure_url, fields })
      } else {
        reject({ error: true, url: null, fields })
      }
    })
  })
}
