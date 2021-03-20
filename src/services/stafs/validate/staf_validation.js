import validates from 'validate.js'

const registerStafRules = async email => {
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
    level: {
      presence: true,
    },
  }
}

export const validateRegister = async (email, data) => {
  const constraints = await registerStafRules(email)
  const validate = await validates(data, constraints)
  if (validate === undefined) {
    return false
  } else if (validate.name) {
    return validate.name[0]
  } else if (validate.email) {
    return validate.email[0]
  } else if (validate.password) {
    return validate.password[0]
  } else if (validate.confirmPassword) {
    return validate.confirmPassword[0]
  } else if (validate.level) {
    return validate.level[0]
  } else {
    return false
  }
}

const updateStafRules = async email => {
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
    picture: {
      presence: true,
    },
  }
}

export const validateUpdate = async (email, data) => {
  const constraints = await updateStafRules(email)
  const validate = await validates(data, constraints)
  if (validate === undefined) {
    return false
  } else if (validate.name) {
    return validate.name[0]
  } else if (validate.email) {
    return validate.email[0]
  } else if (validate.picture) {
    return validate.picture[0]
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
