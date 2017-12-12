const NotifyController = require('./controller/notify')

module.exports = (server, app) => {
  server.get('/api/dingtalk/notify', NotifyController.notifyDingTalk)
  server.get('/api/dingtalk/call', NotifyController.callDingTalkApi)
}
