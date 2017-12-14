import React from 'react'
import Head from 'next/head'
// import cx from 'classnames'
import { Modal, Header, Button, List } from 'semantic-ui-react'
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
    return <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='stylesheet' href='/static/styles/semantic.min.css' />
      {/* <style dangerouslySetInnerHTML={{ __html: CommonStyle }} /> */}
    </Head>
      <div className={IndexStyle.main}>
        Hello World!
        <p>{this.props.secret}</p>
        <p>{this.props.userAgent}</p>
      </div>

      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <List vertical="true" relaxed>
        <List.Item>
          <List.Content>
            <List.Header as='a'>Next.js</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header as='a'>React</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header as='a'>Vue.js</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </div>
  }
}
