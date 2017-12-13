import React from 'react'

const DING_TALK_APP_ID = process.env.DING_TALK_APP_ID
const DING_TALK_APP_SECRET = process.env.DING_TALK_APP_SECRET

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'], secret: req.query.secret }
      : { userAgent: navigator.userAgent, secret: '' }
  }

  render () {
    return <div>
      Hello World {this.props.userAgent}
    </div>
  }
}
