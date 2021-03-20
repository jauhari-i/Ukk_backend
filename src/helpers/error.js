export default class ErrorConstructor extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

export const handleError = (err, res) => {
  const { code, message } = err
  if (!code) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal server error',
    })
  } else {
    return res.status(code).json({
      status: 'error',
      code,
      message,
    })
  }
}
