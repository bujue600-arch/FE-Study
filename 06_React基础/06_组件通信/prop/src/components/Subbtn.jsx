import React, { Component } from 'react'

export class Subbtn extends Component {
  render() {
    const { Sub } = this.props

    return (
      <div>
        <button onClick={() => Sub(-1)}> -1</button>
        <button onClick={() => Sub(-5)}> -5</button>
        <button onClick={() => Sub(-10)}> -10</button>
      </div>
    )
  }
}

export default Subbtn