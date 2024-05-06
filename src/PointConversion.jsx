import React, { useEffect, useState } from "react";
import "./PointConversion.css";
import axios from "axios";
import TaskSidebar from "./TaskSidebar";

function PointConversion() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Request/getAllRequest",
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const updateRequest = async (reqId, status) => {
    try {
      const response = await axios.post(
        'https://pixeon-server.onrender.com/api/Request/reqStatusChange',
        { reqId, status },
        { withCredentials: true, credentials: 'include' }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="point__conversion__container">
      <TaskSidebar />
      <div className="point__conversion__contents">
        <h4>Point Conversion Applicants</h4>
        <div className="point__conversion__table">
        <table>
      <thead>
        <tr>
        <th>User Profile</th>
          <th>Time Created</th>
          <th>Message</th>
          <th>Points</th>
          <th>Status</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((item) => (
          <tr key={item.requestId}>
            <td>
              <img src={item.user.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} alt="profile" width="50" height="50" />
            </td>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>{item.message}</td>
            <td>{item.points}</td>
            <td>{item.status}</td>
            
            <td>
            {item.status === "APPLIED" && (
                  <button
                    onClick={() =>
                      updateRequest(
                        item.requestId,
                        "ACCEPTED")
                    }
                    style={{ backgroundColor: "green" }}
                  >
                    Select
                  </button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>
  );
}

export default PointConversion;
