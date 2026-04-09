import React, { Component } from 'react'
import Navbar2 from './components/Navbar2'

export class App extends Component {
  render() {
    return (
      <Navbar2
        leftSlot={<button>anniiu</button>}
        centerSlot={<p>xx</p>}
        rightSlot={<i>hh</i>}
      >

      </Navbar2>
    )
  }
}

export default App