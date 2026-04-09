import React, { Component } from 'react'
import MainBanners from './MainBanners'
import MainLists from './MainLists'

export class Main extends Component {
  constructor() {
    super()
    this.state = {
      banners: ["banner1", "banners2", "banner3"],
      lists: ["list1", "list2", "list3"]
    }
  }

  render() {
    const { banners, lists } = this.state


    return (
      <div>
        <div>Main</div>
        <MainBanners banners={banners}></MainBanners>
        <MainLists lists={lists}></MainLists>
      </div>
    )
  }
}

export default Main