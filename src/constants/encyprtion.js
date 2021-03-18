import bcrypt from 'bcryptjs'

export const salt = async length => {
  const s = await bcrypt.genSaltSync(length)
  return s
}

export const encrypt = async (pass, salt) => {
  const encrypted = await bcrypt.hashSync(pass, salt)
  return encrypted
}

export const checkMatch = async (pass, encrypted) => {
  const isMatch = await bcrypt.compareSync(pass, encrypted)
  return isMatch
}
