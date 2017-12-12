const dingTalkService = require('../service/ding_talk')

const dingTalkApi = dingTalkService.getDingTalkApi()

exports.notifyDingTalk = (req, res) => {
  const jsonData = { status: 'json', params: req.params }
  res.json(jsonData)
}

const apiCaller = {
  getAccessToken: {
    fields: [],
  },
  getPersistentCode: {
    fields: ['access_token', 'tmp_auth_code'],
  },
  getSnsToken: {
    fields: ['openid', 'persistent_code'],
  },
  getUserInfo: {
    fields: ['sns_token'],
  },
}

exports.callDingTalkApi = (req, res) => {
  const { method } = req.params
  if (!apiCaller[method]) {
    res.json({
      status: false,
      msg: 'Not Found'
    })
  }

  const params = apiCaller[method].fields.map(key => { req.params[key] })
  const responsePromise = dingTalkApi[method].call(dingTalkApi, params)

  responsePromise.then(response => {
    res.json({
      status: true,
      data: response
    })
  }).catch(err => {
    res.json({
      status: false,
      msg: err.message
    })
  })
}
