const response = (res, status, result = '', err = false) => {
  let desc = ''

  switch (status) {
    case 200:
      desc = 'OK'
      break
    case 201:
      desc = 'Created'
      break
    case 202:
      desc = 'Accepted'
      break
    case 304:
      desc = 'Not Modified'
      break
    case 400:
      desc = 'Bad Request'
      break
    case 401:
      desc = 'Unauthorized'
      break
    case 403:
      desc = 'Forbidden'
      break
    case 404:
      desc = 'Not Found'
      break
    case 500:
      desc = 'Internal Server Error'
      break
    case 502:
      desc = 'Bad Gateway'
      break
    default:
      desc = ''
  }

  // const isObject = (data) => {
  //   return !!data && data.constructor === Object
  // }

  const isString = (data) => {
    if (typeof data === 'string') {
      return true
    } else {
      return false
    }
  }

  const results = {}

  if (err === true) {
    results.status = status
    results.description = desc
    results.isError = true
    results.result = result
  } else {
    results.status = status
    results.description = desc
    results.result = result
  }

  if (isString(result)) {
    results.result = { msg: result }
  }

  return res.status(status).json(results)
}

module.exports = response
