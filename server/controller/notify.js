const dingTalkService = require('../service/ding_talk')
const dingTalkApi = dingTalkService.getDingTalkApi()

const DING_TALK_APP_ID = process.env.DING_TALK_APP_ID
const DING_TALK_APP_SECRET = process.env.DING_TALK_APP_SECRET
const SECRET_ENTRY_PASSWORD = process.env.SECRET_ENTRY_PASSWORD

exports.notifyDingTalk = (req, res) => {
  console.log(req)
  const jsonData = { status: 'json', params: req.query }
  res.json(jsonData)
}

const apiCaller = {
  getAccessToken: {
    fields: ['appid', 'appsecret'],
  },
  getPersistentCode: {
    fields: ['access_token', 'tmp_auth_code'],
  },
  getSnsToken: {
    fields: ['access_token', 'openid', 'persistent_code'],
  },
  getUserInfo: {
    fields: ['sns_token'],
  },
}

exports.callDingTalkApi = (req, res) => {
  const { method, secret } = req.query
  if (!apiCaller[method]) {
    res.json({
      status: false,
      msg: 'Not Found'
    })
  }

  const params = apiCaller[method].fields.map(key => req.query[key])
  if (method === 'getAccessToken' && secret === SECRET_ENTRY_PASSWORD ){
    params['appid'] = DING_TALK_APP_ID
    params['appsecret'] = DING_TALK_APP_SECRET
  }

  const responsePromise = dingTalkApi[method].apply(dingTalkApi, params)

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
