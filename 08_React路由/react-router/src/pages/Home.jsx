import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router'

export class Home extends PureComponent {
  render() {
    return (
      <div>
        <Link to='/home/recommand'>推荐</Link>
        <Link to='/home/ranking'>排行</Link>

        <Outlet />
      </div>
    )
  }
}

export default Home