import React, { PureComponent } from 'react'
import Home from './pages/home'
import Profile from './pages/profile'
import "./style.css"
import store from "./store/index"

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({ counter: state.counter })
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        计数：{counter}
        <div className='content'>
          <Home />
          <Profile />
        </div>
      </div>
    )
  }
}

export default App