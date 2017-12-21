import React from 'react'
import Head from 'next/head'
// import cx from 'classnames'
import { Menu, Segment } from 'semantic-ui-react'
// import CommonStyle from '../styles/common.scss'
import IndexStyle from '../styles/index.scss'

const DING_TALK_APP_ID = process.env.DING_TALK_APP_ID
const DING_TALK_APP_SECRET = process.env.DING_TALK_APP_SECRET

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'], secret: req.query.secret }
      : { userAgent: navigator.userAgent, secret: '' }
  }

  render () {
    console.log(IndexStyle)
    return <div className={IndexStyle['main']}>
      <div className={IndexStyle.nav}>
        <div className={IndexStyle['nav-logo']}>

        </div>
      </div>
      <div className={IndexStyle.content}>
        <div></div>
      </div>
    </div>
  }
}
