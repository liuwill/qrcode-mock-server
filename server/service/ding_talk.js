const axios = require('axios')

const DING_TALK_TOKEN_EXPIRE = 7200000
const DING_TALK_APP_ID = process.env.DING_TALK_APP_ID
const DING_TALK_APP_SECRET = process.env.DING_TALK_APP_SECRET

class DingTalkApi {
  constructor() {
    this.lastModify = Date.now()
    this.accessToken = ''
    this.userAuthMap = {}
    this.openAuthMap = {}
  }

  async getAccessToken() {
    const currentTimestamp = Date.now()
    if (this.accessToken && currentTimestamp - this.lastModify < DING_TALK_TOKEN_EXPIRE) {
      return this.accessToken
    }

    try {
      let response = await axios.get('https://oapi.dingtalk.com/sns/gettoken', {
        params: {
          appid: DING_TALK_APP_ID,
          appsecret: DING_TALK_APP_SECRET,
        }
      })

      response = response.data
      console.log(response)
      if (response.errcode !== 0) {
        throw new Error(response.errmsg)
      }

      this.accessToken = response.access_token
      this.lastModify = Date.now()
      return response
    } catch (err) {
      console.log(err.message)
      throw new Error('获取Token失败')
    }
  }

  async getPersistentCode(accessToken, tmp_auth_code) {
    try {
      let response = await axios({
        method: 'post',
        url: `https://oapi.dingtalk.com/sns/get_persistent_code?access_token=${accessToken}`,
        data: {
          tmp_auth_code,
        }
      })

      response = response.data
      console.log(response)
      if (response.errcode === 0) {
        this.openAuthMap[response.openid] = {
          persistent_code: response.persistent_code,
        }
      }
      return response
    } catch (err) {
      console.log(err.message)
      throw new Error('获取Persistent Code失败')
    }
  }

  async getSnsToken(openid, persistent_code) {
    try {
      let response = await axios({
        method: 'post',
        url: `https://oapi.dingtalk.com/sns/get_sns_token?access_token=${accessToken}`,
        data: {
          openid,
          persistent_code,
        }
      })

      response = response.data
      console.log(response)
      if (response.errcode === 0) {
        this.openAuthMap[response.openid] = {
          persistent_code: response.persistent_code,
          sns_token: response.sns_token,
          add_time: Date.now(),
        }
      }

      return response
    } catch (err) {
      console.log(err.message)
      throw new Error('获取Persistent Code失败')
    }
  }

  async getUserInfo(sns_token) {
    try {
      let response = await axios.get('https://oapi.dingtalk.com/sns/getuserinfo', {
        params: {
          sns_token
        }
      })

      response = response.data
      console.log(response)
      if (response.errcode === 0) {
        const userInfo = response.user_info
        this.openAuthMap[userInfo.openid] = {
          userInfo: userInfo,
        }
      }

      return response
    } catch (err) {
      console.log(err.message)
      throw new Error('获取Persistent Code失败')
    }
  }
}

const dingTalkApi = new DingTalkApi()

module.exports = {
  getDingTalkApi() {
    return dingTalkApi
  }
}
