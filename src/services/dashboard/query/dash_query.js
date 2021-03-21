import { promiseDb } from '../../../db/mysqlConnection'

export const dashboardQuery = async () => {
  const user = await promiseDb.query('SELECT COUNT(*) FROM tb_users')
  const staf = await promiseDb.query(
    'SELECT COUNT(*) FROM tb_staf WHERE level = 1'
  )
  const laporan = await promiseDb.query('SELECT COUNT(*) FROM tb_laporan')
  const laporanToday = await promiseDb.query(
    'SELECT COUNT(*) FROM tb_laporan WHERE createdAt = CURDATE()'
  )

  const result = {
    user: user[0][0]['COUNT(*)'],
    staf: staf[0][0]['COUNT(*)'],
    laporan: laporan[0][0]['COUNT(*)'],
    today: laporanToday[0][0]['COUNT(*)'],
  }

  return result
}
