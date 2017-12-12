const NotifyController = require('./controller/notify')

module.exports = (server, app) => {
  server.get('/api/dingtalk/notify', NotifyController.callDingTalk)
}
