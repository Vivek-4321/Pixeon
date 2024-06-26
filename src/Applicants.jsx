import React from "react";
import "./Applicants.css";

function Applicants({ items, taskId, status, handleSubmit }) {
  return (
    <div className="Applicants__container">
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.userApplied.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} alt="Profile" />
              </td>
              <td>{new Date(item.applicationDate).toLocaleString()}</td>
              <td>{item.status}</td>
              <td>{item.userApplied.userName}</td>
              <td>{item.userApplied.email}</td>
              <td>
                {item.status === "APPLIED" ? (
                  <button
                    onClick={() =>
                      handleSubmit(taskId, "ACCEPTED", item.applicationId)
                    }
                    style={{ backgroundColor: "green" }}
                  >
                    Select
                  </button>
                ) : item.status === "ACCEPTED" ? (
                  <button disabled style={{ backgroundColor: "#13A280", opacity: 0.5, fontWeight: "bold" }}>
                    Selected
                  </button>
                ) : item.status === "REJECTED" ? (
                  <button disabled style={{ backgroundColor: "#d73d63", opacity: 0.5, fontWeight: "bold" }}>
                    Rejected
                  </button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applicants;
