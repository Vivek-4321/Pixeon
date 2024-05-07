import React, { useEffect, useState } from 'react';
import "./Leaderboard.css";
import Cup from "./assets/cup.jpg";
import Rank1 from "./assets/rank_1.png";
import Rank2 from "./assets/rank_2.png";
import Rank3 from "./assets/rank_3.png";
import TaskSidebar from './TaskSidebar';
import Coin from "./assets/Vivecoin1.png";
import axios from "axios";
import { TbDeviceAudioTape } from 'react-icons/tb';

function Leaderboard() {
  const [data, setData] = useState([]);
  const token = useStore((state) => state.token);

  async function fetchData() {
    const response = await axios.post('https://pixeon-server.onrender.com/api/User/leaderboard',{token:token}, { withCredentials: true, credentials: 'include' });
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const getRankImage = (index) => {
    if (index === 0) {
      return Rank1;
    } else if (index === 1) {
      return Rank2;
    } else if (index === 2) {
      return Rank3;
    }
    return null;
  }

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
        {data?.map((user, index) => (
        <div className='user__details__container'>

            <span className='user__rank'>
            <img src={getRankImage(index)}/>
            <span className='user__name'>{user.userName}</span>
          </span>

          <span className='user__points'>
            <img src={Coin}/>
            <span>{user.points || 0}</span> {/* Show 0 when points are null */}
          </span>
          </div>

      ))}
    </div>
  )
}

export default Leaderboard;
