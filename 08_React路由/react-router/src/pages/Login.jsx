import React, { PureComponent } from 'react'
import { Navigate } from 'react-router'

export class Login extends PureComponent {
  constructor() {
    super()

    this.state = {
      isLogin: false
    }
  }

  logIn() {
    this.setState({
      isLogin: !this.isLogin
    })
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        {isLogin ? <Navigate to='/home' /> : <button onClick={e => { this.logIn() }}>登录</button>}
      </div>
    )
  }
}

export default Login