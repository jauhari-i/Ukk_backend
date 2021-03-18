import validates from 'validate.js'

const registerUserRules = async (email, niks, phone) => {
  return {
    name: {
      presence: true,
    },
    email: {
      email: true,
      presence: true,
      exclusion: {
        within: email,
        message: 'is already used',
      },
    },
    nik: {
      presence: true,
      exclusion: {
        within: niks,
        message: 'is already used',
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters',
      },
    },
    confirmPassword: {
      presence: true,
      equality: 'password',
    },
    phoneNumber: {
      presence: true,
      format: {
        pattern: '[0-9]+',
        flags: 'i',
        message: 'can only contain 0-9',
      },
      exclusion: {
        within: phone,
        message: 'is already used',
      },
    },
  }
}

export const validateRegister = async (email, nik, phone, data) => {
  const constraints = await registerUserRules(email, nik, phone)
  const validate = await validates(data, constraints)
  if (validate === undefined) {
    return false
  } else if (validate.name) {
    return validate.name[0]
  } else if (validate.email) {
    return validate.email[0]
  } else if (validate.nik) {
    return validate.nik[0]
  } else if (validate.password) {
    return validate.password[0]
  } else if (validate.confirmPassword) {
    return validate.confirmPassword[0]
  } else if (validate.phoneNumber) {
    return validate.phoneNumber[0]
  } else {
    return false
  }
}

const loginRules = {
  email: {
    email: true,
    presence: true,
  },
  password: {
    presence: true,
  },
}

export const validatelogin = async data => {
  const validate = await validates(data, loginRules)
  if (validate === undefined) {
    return false
  } else if (validate.email) {
    return validate.email[0]
  } else if (validate.password) {
    return validate.password[0]
  } else {
    return false
  }
}
