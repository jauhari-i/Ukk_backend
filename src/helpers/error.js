export default class ErrorConstructor extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

export const handleError = (err, res) => {
  const { code, message } = err
  return res.status(code).json({
    status: 'error',
    code,
    message,
  })
}
