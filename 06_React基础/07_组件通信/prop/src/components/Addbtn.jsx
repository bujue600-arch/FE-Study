import React, { Component } from 'react'

export class Addbtn extends Component {
  render() {
    const { Add } = this.props

    return (
      <div>
        <button onClick={() => Add(1)}>+1</button>
        <button onClick={() => Add(5)}>+5</button>
        <button onClick={() => Add(10)}>+10</button>
      </div>
    )
  }
}

export default Addbtn