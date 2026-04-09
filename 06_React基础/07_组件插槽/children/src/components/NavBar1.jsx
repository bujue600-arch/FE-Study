import React, { Component } from 'react'

export class NavBar1 extends Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    )
  }
}

export default NavBar1