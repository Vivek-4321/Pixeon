import React from "react";
import "./UserRecommendations.css";
import Google from "./assets/google__logo.png";


function UserRecommendation () {

    return(
        <div className="user_profile_recommendation">
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1682685797439-a05dd915cee9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
        </div>
    );

}

export default UserRecommendation;