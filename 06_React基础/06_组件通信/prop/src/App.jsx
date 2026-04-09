import React, { Component } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Addbtn from './components/Addbtn'
import Subbtn from './components/Subbtn'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      counter: 100
    }
  }

  changeCounter(count) {
    this.setState({
      counter: this.state.counter + count
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
        <p>{counter}</p>
        <Addbtn Add={(count) => { this.changeCounter(count) }} />
        <Subbtn Sub={(count) => { this.changeCounter(count) }} />
      </div>
    )
  }
}

export default App