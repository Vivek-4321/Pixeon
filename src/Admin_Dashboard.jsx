import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "./Admin_Dashboard.css";

function Admin_Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Post/getAllUsersPost",
          { withCredentials: true, credentials: "include" }
        );
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className="admin__container">
      <Chart
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
          legend: { // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            
          },
          
          titleTextStyle: { // add this option
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
          legend: { // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          hAxis: {
            title: "Date",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: { // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Number of Posts",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: { // add this option
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
            titleTextStyle: { // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: { // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Number of Posts",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: { // add this option
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
            titleTextStyle: { // add this option
              color: getCSSVariable("--primary-color"),
            },
          },
          legend: { // add this option
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
          },
          vAxis: {
            title: "Likes",
            textStyle: {
              color: getCSSVariable("--primary-color"),
            },
            titleTextStyle: { // add this option
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
  );
}

export default Admin_Dashboard;
