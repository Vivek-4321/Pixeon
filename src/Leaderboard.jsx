import React from 'react';
import "./Leaderboard.css";
import Cup from "./assets/cup.jpg";
import Rank1 from "./assets/rank_1.png";
import TaskSidebar from './TaskSidebar';
import Coin from "./assets/Vivecoin1.png";

function Leaderboard() {
  return (
    <div className='leaderboard__container'>
        <TaskSidebar/>
        <div className='leaderboard__poster'>
            <div className='leaderboard__poster__contents'>
              <h2>Leaderboard</h2>
              <p>Meet the top contributors...</p>
            </div>
            <img src={Cup}/>
        </div>
        <div className='user__details__container'>
        <span className='user__rank'>
            <img src={Rank1}/>
            <span className='user__name'>Vivek Venugopal</span>
          </span>
          
          <span className='user__points'>
            <img src={Coin}/>
            <span>4500</span>
          </span>
          
        </div>
    </div>
  )
}

export default Leaderboard;