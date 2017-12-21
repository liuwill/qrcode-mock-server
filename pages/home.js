import React from 'react'
import Head from 'next/head'
// import cx from 'classnames'
import { Menu, Segment, Icon } from 'semantic-ui-react'
// import CommonStyle from '../styles/common.scss'
import HomeStyle from '../styles/home.scss'

const DING_TALK_APP_ID = process.env.DING_TALK_APP_ID
const DING_TALK_APP_SECRET = process.env.DING_TALK_APP_SECRET

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'], secret: req.query.secret }
      : { userAgent: navigator.userAgent, secret: '' }
  }
  state = { activeItem: 'home', sideActiveItem: 'gamepad' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSideClick = (e, { name }) => this.setState({ sideActiveItem: name })

  render () {
    const { activeItem, sideActiveItem } = this.state

    console.log(HomeStyle)
    return <div className={HomeStyle['main']}>
      <div className={HomeStyle['nav']}>
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
            <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          </Menu>
        </Segment>
      </div>
      <div className={HomeStyle.content}>
        <Menu icon='labeled' vertical>
          <Menu.Item name='gamepad' active={sideActiveItem === 'gamepad'} onClick={this.handleItemClick}>
            <Icon name='gamepad' />
            Games
          </Menu.Item>

          <Menu.Item name='video camera' active={sideActiveItem === 'video camera'} onClick={this.handleItemClick}>
            <Icon name='video camera' />
            Channels
          </Menu.Item>

          <Menu.Item name='video play' active={sideActiveItem === 'video play'} onClick={this.handleItemClick}>
            <Icon name='video play' />
            Videos
          </Menu.Item>
        </Menu>

      </div>
    </div>
  }
}
