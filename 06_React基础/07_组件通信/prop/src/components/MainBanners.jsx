import React, { Component } from 'react'

export class MainBanners extends Component {

  render() {
    const { banners } = this.props

    return (
      <div>
        <ul>
          {banners.map((item) => {
            return (
              <li>{item}</li>
            )
          })}
        </ul>

      </div>
    )
  }
}

export default MainBanners