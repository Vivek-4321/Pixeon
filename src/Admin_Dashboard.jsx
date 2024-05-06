import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Chart } from "react-google-charts";
import "./Admin_Dashboard.css";
import { toast, Toaster } from "react-hot-toast";
const socket = io("https://pixeon-server.onrender.com");
import useStore from "./store.js";
import TaskSidebar from "./TaskSidebar";
import { HiOutlineUsers } from "react-icons/hi2";
import { GiTargetPoster } from "react-icons/gi";
import { MdOutlineAssignment } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";

function Admin_Dashboard() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [memoryUsageData, setMemoryUsageData] = useState([]);
  const [networkUsageData, setNetworkUsageData] = useState([]);

  useEffect(() => {
    socket.on("serverStats", (stats) => {
      setCpuUsageData((prevData) => [
        ...prevData,
        [new Date(), stats.cpuUsage],
      ]);

      setMemoryUsageData((prevData) => [
        ...prevData,
        [
          new Date(),
          (1 - stats.memoryStats.free / stats.memoryStats.total) * 100,
        ],
      ]);

      const networkUsage = calculateNetworkUsage(stats.networkInterfaces);
      setNetworkUsageData((prevData) => [
        ...prevData,
        [new Date(), networkUsage],
      ]);
    });

    return () => {
      socket.off("serverStats");
    };
  }, []);

  const calculateNetworkUsage = (networkInterfaces) => {
    let rxBytes = 0;
    let txBytes = 0;

    Object.values(networkInterfaces).forEach((interfaces) => {
      interfaces.forEach((iface) => {
        if (iface.family === "IPv4" && !iface.internal) {
          rxBytes += iface.bytesReceived;
          txBytes += iface.bytesSent;
        }
      });
    });

    // Convert bytes to a more appropriate unit (e.g., KB, MB) if needed
    const totalBytes = rxBytes + txBytes;
    const networkUsage = totalBytes / 1024; // Convert to KB

    return networkUsage;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pixeon-server.onrender.com/api/Task/getAllUsersTask",
          { withCredentials: true, credentials: "include" }
        );
        console.log("This is from tasks", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pixeon-server.onrender.com/api/Post/getAllUsersPost",
          { withCredentials: true, credentials: "include" }
        );
        console.log("This is userPost", response.data);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pixeon-server.onrender.com/api/User/getAllUsers",
          { withCredentials: true, credentials: "include" }
        );
        console.log("Users", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function verifyUser(userId) {
    const promise = axios
      .put(
        "https://pixeon-server.onrender.com/api/User/update",
        {
          userId: userId,
          newUserData: {
            verified: true,
          },
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    toast.promise(promise, {
      loading: "Verifying user...",
      success: "User verified successfully ✔",
      error: "Error verifying user ❌",
    });
  }

  async function deleteUser(userId) {
    const promise = axios
      .delete(`https://pixeon-server.onrender.com/api/User/delete/${userId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    toast.promise(promise, {
      loading: "Deleting user...",
      success: "User deleted successfully ✔",
      error: "Error deleting user ❌",
    });
  }

  // Count the number of posts for each user
  let postCounts = {};
  items.forEach((item) => {
    if (!postCounts[item.user.id]) {
      postCounts[item.user.id] = 0;
    }
    postCounts[item.user.id]++;
  });
  let timestamps = items.map((item) => new Date(item.timestamp));
  let userIds = Object.keys(postCounts);
  let postCountArray = Object.values(postCounts);
  let uniqueDates = Object.keys(postCounts);
  let likes = items.map((item) => item.likes.length);

  function getCSSVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `https://pixeon-server.onrender.com/api/Post/deletePost`,
        { data: { postId } }
      );
      toast.promise(
        response,
        {
          loading: "Deleting post...",
          success: "Post deleted successfully",
          error: "Error deleting post",
        },
        {
          success: "Post deleted successfully",
          error: "Error deleting post",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://pixeon-server.onrender.com/api/Task/deleteTask/${user?.userId}/${taskId}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response.data);
      // handle successful response
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const handleShowUsers = () => setShowUsers(!showUsers);
  const handleShowPosts = () => setShowPosts(!showPosts);
  const handleShowTasks = () => setShowTasks(!showTasks);

  return (
    <div className="admin__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <div className="wrapper">
        <TaskSidebar />
      </div>

      <div className="admin__wrapper">
        <div className="admin__poster__contents">
          <div className="admin__poster__boxes">
            <span>
              <p>Total Users</p>
              <span>{users.length}</span>
            </span>
            <div>
              <HiOutlineUsers />
            </div>
          </div>
          <div className="admin__poster__boxes">
            <span>
              <p>Total Posts</p>
              <span>{items.length}</span>
            </span>
            <div>
              <GiTargetPoster />
            </div>
          </div>
          <div className="admin__poster__boxes">
            <span>
              <p>Total Tasks</p>
              <span>{tasks.length}</span>
            </span>
            <div>
              <MdOutlineAssignment />
            </div>
          </div>
          <div className="admin__poster__boxes">
            <span>
              <p>Total Points</p>
              <span>{tasks.length}</span>
            </span>
            <div>
              <RiFilePaper2Line />
            </div>
          </div>
        </div>
        <div className="admin__chart__wrapper">
          <div className="admin__chart__boxes">
            <Chart
              width={"500px"}
              height={"350px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["User", "Number of Posts"],
                ...userIds.map((id, index) => [id, postCountArray[index]]),
              ]}
              options={{
                title: "Posts by User",
                legend: {
                  // add this option
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                },

                titleTextStyle: {
                  // add this option
                  color: getCSSVariable("--primary-color"),
                },
                animation: {
                  startup: true,
                  easing: "out",
                  duration: 1000,
                },
                color: getCSSVariable("--primary-color"),
                backgroundColor: getCSSVariable("--secondary-color-white"),
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
          <div className="admin__chart__boxes">
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Date", "Number of Posts"],
                ...uniqueDates.map((date, index) => [
                  date,
                  postCountArray[index],
                ]),
              ]}
              options={{
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                legend: {
                  // add this option
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                },
                hAxis: {
                  title: "Date",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                vAxis: {
                  title: "Number of Posts",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                animation: {
                  startup: true,
                  easing: "out",
                  duration: 1000,
                },
                color: getCSSVariable("--primary-color"),
                backgroundColor: getCSSVariable("--secondary-color-white"),
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </div>
        <div className="admin__chart__wrapper">
          <div className="admin__chart__boxes">
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Date", "Number of Posts"],
                ...uniqueDates.map((date, index) => [
                  date,
                  postCountArray[index],
                ]),
              ]}
              options={{
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                legend: {
                  // add this option
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                },
                hAxis: {
                  title: "Date",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                vAxis: {
                  title: "Number of Posts",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                animation: {
                  startup: true,
                  easing: "out",
                  duration: 1000,
                },
                color: getCSSVariable("--primary-color"),
                backgroundColor: getCSSVariable("--secondary-color-white"),
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
          <div className="admin__chart__boxes">
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Date", "Number of Posts"],
                ...uniqueDates.map((date, index) => [
                  date,
                  postCountArray[index],
                ]),
              ]}
              options={{
                hAxis: {
                  title: "Date",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                legend: {
                  // add this option
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                },
                vAxis: {
                  title: "Number of Posts",
                  textStyle: {
                    color: getCSSVariable("--primary-color"),
                  },
                  titleTextStyle: {
                    // add this option
                    color: getCSSVariable("--primary-color"),
                  },
                },
                animation: {
                  startup: true,
                  easing: "out",
                  duration: 1000,
                },
                color: getCSSVariable("--primary-color"),
                backgroundColor: getCSSVariable("--secondary-color-white"),
                chartArea: {
                  backgroundColor: {
                    fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
                  },
                },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </div>
        <div className="checkbox__container">
          <label>
            <input
              type="checkbox"
              checked={showUsers}
              onChange={handleShowUsers}
            />
            Show Users
          </label>
          <label>
            <input
              type="checkbox"
              checked={showPosts}
              onChange={handleShowPosts}
            />
            Show Posts
          </label>
          <label>
            <input
              type="checkbox"
              checked={showTasks}
              onChange={handleShowTasks}
            />
            Show Tasks
          </label>
        </div>
        <div className="tables__boxes">
          {showUsers && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  // .filter((user) => !user.verified)
                  .map((user) => (
                    <tr key={user.userId}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.verified ? "Yes" : "No"}</td>
                      <td>
                        <button
                          style={{ display: user.verified ? "none" : "block" }}
                          onClick={() => verifyUser(user.userId)}
                        >
                          Verify User
                        </button>
                        <button onClick={() => deleteUser(user.userId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {showPosts && (
            <table>
              <thead>
                <tr>
                  <th>Post ID</th>
                  <th>User ID</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.postId}>
                    <td>{item.postId}</td>
                    <td>{item.user.id}</td>
                    <td>{item.content}</td>
                    <td>
                      <button onClick={() => deletePost(item.postId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showTasks && (
            <table>
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>User ID</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task?.taskId}>
                    <td>{task?.taskId}</td>
                    <td>{task?.ownerId}</td>
                    <td>{task?.description}</td>
                    <td>
                      <button onClick={() => deleteTask(task.taskId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="Memory__usage">
          <p>Cpu Usage of Server</p>
          <Chart
            width={"1300px"}
            height={"500px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[["Time", "CPU Usage (%)"], ...cpuUsageData]}
            options={{
              hAxis: {
                title: "Time",
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },
              legend: {
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },
              vAxis: {
                title: "CPU Usage (%)",
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },

              color: getCSSVariable("--primary-color"),
              backgroundColor: getCSSVariable("--secondary-color-white"),
              chartArea: {
                backgroundColor: {
                  fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
                },
              },
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
        <div className="Memory__usage">
          <p>Memory Usage of Server</p>
          <Chart
            width={"1300px"}
            height={"500px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[["Time", "Memory Usage (%)"], ...memoryUsageData]}
            options={{
              hAxis: {
                title: "Time",
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },
              legend: {
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },
              vAxis: {
                title: "Memory Usage (%)",
                textStyle: {
                  color: getCSSVariable("--primary-color"),
                },
                titleTextStyle: {
                  color: getCSSVariable("--primary-color"),
                },
              },

              color: getCSSVariable("--secondary-color"),
              backgroundColor: getCSSVariable("--secondary-color-white"),
              chartArea: {
                backgroundColor: {
                  fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
                },
              },
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
        
      </div>
      {/* <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["User", "Number of Posts"],
          ...userIds.map((id, index) => [id, postCountArray[index]]),
        ]}
        options={{
          title: "Posts by User",
          legend: {
            // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },

          titleTextStyle: {
            // add this option
            color: getCSSVariable("--primary-color"),
          },
          animation: {
            startup: true,
            easing: "out",
            duration: 1000,
          },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Number of Posts"],
          ...uniqueDates.map((date, index) => [date, postCountArray[index]]),
        ]}
        options={{
          titleTextStyle: {
            color: getCSSVariable("--primary-color"),
          },
          legend: {
            // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          hAxis: {
            title: "Date",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Number of Posts",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          animation: {
            startup: true,
            easing: "out",
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Number of Posts"],
          ...uniqueDates.map((date, index) => [date, postCountArray[index]]),
        ]}
        options={{
          titleTextStyle: {
            color: getCSSVariable("--primary-color"),
          },
          legend: {
            // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          hAxis: {
            title: "Date",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Number of Posts",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          animation: {
            startup: true,
            easing: "out",
            duration: 1000,
          },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
        }}
        rootProps={{ "data-testid": "1" }}
      />      duration: 1000,
          },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Number of Posts"],
          ...uniqueDates.map((date, index) => [date, postCountArray[index]]),
        ]}
        options={{
          hAxis: {
            title: "Date",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: {
            // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Number of Posts",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          animation: {
            startup: true,
            easing: "out",
            duration: 1000,
          },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
          chartArea: {
            backgroundColor: {
              fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
            },
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Likes"],
          ...timestamps.map((date, index) => [
            date.toLocaleDateString(),
            likes[index],
          ]),
        ]}
        options={{
          hAxis: {
            title: "Date",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: {
            // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Likes",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          animation: {
            startup: true,
            easing: "out",
            duration: 1000,
          },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
          chartArea: {
            backgroundColor: {
              fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
            },
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={showUsers}
            onChange={handleShowUsers}
          />
          Show Users
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPosts}
            onChange={handleShowPosts}
          />
          Show Posts
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTasks}
            onChange={handleShowTasks}
          />
          Show Tasks
        </label>
      </div>

      {showUsers && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              // .filter((user) => !user.verified)
              .map((user) => (
                <tr key={user.userId}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.verified ? "Yes" : "No"}</td>
                  <td>
                    <button
                      style={{ display: user.verified ? "none" : "block" }}
                      onClick={() => verifyUser(user.userId)}
                    >
                      Verify User
                    </button>
                    <button onClick={() => deleteUser(user.userId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {showPosts && (
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>User ID</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.postId}>
                <td>{item.postId}</td>
                <td>{item.user.id}</td>
                <td>{item.content}</td>
                <td>
                  <button onClick={() => deletePost(item.postId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTasks && (
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>User ID</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task?.taskId}>
                <td>{task?.taskId}</td>
                <td>{task?.ownerId}</td>
                <td>{task?.description}</td>
                <td>
                  <button onClick={() => deleteTask(task.taskId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[["Time", "CPU Usage (%)"], ...cpuUsageData]}
        options={{
          hAxis: {
            title: "Time",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: {
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "CPU Usage (%)",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },

          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
          chartArea: {
            backgroundColor: {
              fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
            },
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />

      <Chart
        width={"1000px"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[["Time", "Memory Usage (%)"], ...memoryUsageData]}
        options={{
          hAxis: {
            title: "Time",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: {
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "CPU Usage (%)",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },

          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
          chartArea: {
            backgroundColor: {
              fill: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
            },
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="ScatterChart"
        data={[
          ["Likes", "Comments"],
          ...items.map((item) => [item.likes.length, item.comments.length]),
        ]}
        options={{
          title: "Post Likes vs. Comments",
          hAxis: { title: "Likes" },
          vAxis: { title: "Comments" },
          color: getCSSVariable("--primary-color"),
          backgroundColor: getCSSVariable("--secondary-color-white"),
        }}
      /> */}
    </div>
  );
}

export default Admin_Dashboard;
