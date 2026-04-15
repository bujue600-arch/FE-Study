import React, { PureComponent } from 'react'
import store from "../store"
import * as actionCreators from '../store/actionCreators'

export class Home extends PureComponent {
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

  addNumber(num) {
    store.dispatch(actionCreators.addNumberAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        {counter}
        <button onClick={() => this.addNumber(1)}>+1</button>
        <button onClick={() => this.addNumber(5)}>+5</button>
        <button onClick={() => this.addNumber(10)}>+10</button>
      </div>
    )
  }
}

export default Home