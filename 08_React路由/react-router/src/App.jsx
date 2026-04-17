import React, { PureComponent } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import HomeRecommand from './pages/HomeRecommand'
import HomeRanking from './pages/HomeRanking'
import Detail from './pages/Detail'
import User from './pages/User'


import './pages/style.css'





export class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <div className="header">
          <span>header</span>
          <div className="nav">
            <NavLink to="/home">首页</NavLink>
            <NavLink to="/about">关于</NavLink>
            <NavLink to="/login">登录</NavLink>
            <NavLink to="/user">用户</NavLink>
          </div>
        </div>
        <hr />

        <div className="content">
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />}>
              <Route path='/home/recommand' element={<HomeRecommand />} />
              <Route path='/home/ranking' element={<HomeRanking />} />
            </Route >
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/detail:id' element={<Detail />} />
            <Route path='/user' element={<User />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>

        <hr />
        <div className="footer">Footer</div>
      </div>
    )
  }
}

export default App