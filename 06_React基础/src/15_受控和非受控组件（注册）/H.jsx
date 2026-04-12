import React, { PureComponent } from 'react'

export class H extends PureComponent {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isChecked: false,
      hobbies: ["唱", "跳", "rap"],
      fruits: ["苹果", "香蕉", "西瓜"]
    }
  }

  changeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  Submit() {

  }



  render() {
    const { username, password, isChecked, hobbies, fruits } = this.state

    return (
      <form onSubmit={() => { this.Submit() }}>

        <div>
          <label htmlFor="username">
            用户名：
            <input
              type="text"
              id='username'
              value={username}
              onChange={(e) => { this.changeUsername(e) }} />
          </label>
        </div>


        <div>
          <label htmlFor="password">
            密码：
            <input
              type="text"
              id='password'
              value={password}
              onChange={(e) => { this.changePassword(e) }} />
          </label>
        </div>

        <label htmlFor="agree">
          <input
            type="checkbox"
            id='agree'
            checked={isChecked} />同意协议
        </label>

        <div>
          爱好：
          {hobbies.map(item => {
            return (
              <label htmlFor="hobbies">
                <input
                  type="checkbox"
                  id='hobbies'
                  value={item}
                  key={item} />{item}
              </label>
            )
          }
          )
          }
        </div>

        <select name="" id="" multiple>
          {fruits.map(item => {
            return (
              <option
                value="item"
                key={item}>{item}</option>
            )
          })}
        </select>

        <button>注册</button>

      </form>
    )
  }
}

export default H