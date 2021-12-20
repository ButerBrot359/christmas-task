import React from 'react'
import { Link } from 'react-router-dom'
import BigBall from '../../images/bg_ball_1.png'
import SmallBall from '../../images/bg_ball_2.png'


export const MainPage: React.FC = () => (
  <main id="mainPage" className="main">
    <h1 className='main-page_title'>Новогодняя игра<br />«Наряди ёлку»</h1>
    <StartButton />
    <div className='big-ball mp-balls'><img src={BigBall} alt="big_ball" /></div>
    <div className='small-ball mp-balls'><img src={SmallBall} alt="small_ball" /></div>
  </main>
)

const StartButton: React.FC = () => (
  <>
    <Link to="/settings" className='start-button'>Начать</Link>
  </>
)
