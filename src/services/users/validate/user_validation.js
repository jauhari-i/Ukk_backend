import validates from 'validate.js'

const updateUserRules = async (email, niks, phone) => {
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
    picture: {
      presence: true,
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

export const validateUpdate = async (email, nik, phone, data) => {
  const constraints = await updateUserRules(email, nik, phone)
  const validate = await validates(data, constraints)
  if (validate === undefined) {
    return false
  } else if (validate.name) {
    return validate.name[0]
  } else if (validate.email) {
    return validate.email[0]
  } else if (validate.nik) {
    return validate.nik[0]
  } else if (validate.picture) {
    return validate.picture[0]
  } else if (validate.phoneNumber) {
    return validate.phoneNumber[0]
  } else {
    return false
  }
}

const passwordRules = {
  oldPassword: {
    presence: true,
  },
  newPssword: {
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
}

export const validatePassword = async data => {
  const constraints = passwordRules
  const validate = await validates(data, constraints)
  if (validate === undefined) {
    return false
  } else if (validate.oldPassword) {
    return validate.oldPassword[0]
  } else if (validate.newPassword) {
    return validate.newPassword[0]
  } else if (validate.confirmPassword) {
    return validate.confirmPassword[0]
  } else {
    return false
  }
}
