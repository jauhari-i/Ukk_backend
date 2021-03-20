import validates from 'validate.js'

const addLaporanRules = {
  report: {
    presence: true,
  },
}

export const validateLaporan = async data => {
  const validate = await validates(data, addLaporanRules)
  if (validate === undefined) {
    return false
  } else if (validate.report) {
    return validate.report[0]
  } else {
    return false
  }
}
