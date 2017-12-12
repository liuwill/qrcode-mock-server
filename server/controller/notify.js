
exports.callDingTalk = (req, res) => {
  const jsonData = { status: 'json' }
  jsonData['DING_TALK_APP_ID'] = process.env.DING_TALK_APP_ID
  jsonData['DING_TALK_APP_SECRET'] = process.env.DING_TALK_APP_SECRET
  res.json(jsonData)
}
