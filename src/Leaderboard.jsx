import React, { useEffect, useState } from 'react';
import "./Leaderboard.css";
import Cup from "./assets/cup.jpg";
import Rank1 from "./assets/rank_1.png";
import TaskSidebar from './TaskSidebar';
import Coin from "./assets/Vivecoin1.png";
import axios from "axios";
import { TbDeviceAudioTape } from 'react-icons/tb';

function Leaderboard() {

  const [data, setData] = useState([]);
  
  async function fetchData() {
    const response = await axios.get('http://localhost:3000/api/User/leaderboard', { withCredentials: true, credentials: 'include' });
    setData(response.data);
    console.log(response.data);



  }

  useEffect(() => {
    fetchData();
  }, [])

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
        {data?.map((user) => (
        <div className='user__details__container'>

            <span className='user__rank'>
            <img src={Rank1}/>
            <span className='user__name'>{user.userName}</span>
          </span>
          
          <span className='user__points'>
            <img src={Coin}/>
            <span>{user.points}</span>
          </span>
          </div>

      ))}
    </div>
  )
}

export default Leaderboard;