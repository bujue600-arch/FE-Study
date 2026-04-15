import React, { PureComponent } from 'react'
import store from "../store/index"

export class Profile extends PureComponent {
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
        {counter}
        <button>-1</button>
        <button>-5</button>
        <button>-10</button>
      </div>
    )
  }
}

export default Profile