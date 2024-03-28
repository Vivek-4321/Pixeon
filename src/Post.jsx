import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Post.css";
import { SlLike } from "react-icons/sl";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";

function Post() {
  return (
    <div className="post__show__container">
      <div className="post__show__container__top">
        <div className="post__image__container">
          <div className="post__image">
            <img
              src="https://images.unsplash.com/photo-1535579710123-3c0f261c474e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
            />
          </div>
          <div className="post__content">
            <span className="post__content__heading">Williams Perry Davis</span>
            <span className="post__content__date">Posted on 10/10/2022</span>
          </div>
        </div>
        <div className="post__icon__container">
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="post__show__container__middle">
        <span className="post__contents">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum consequuntur quisquam molestiae cumque voluptates error in corrupti quasi natus inventore? Odio architecto fugiat reprehenderit quod suscipit, dolore unde praesentium, non deserunt quidem quibusdam iste esse optio. Officiis vitae explicabo voluptatibus et ad eaque, dolorem eum repellat, accusamus quis dolore asperiores.</span>
        <img src="https://images.unsplash.com/photo-1711475312495-705611a9d52d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="post__show__container__bottom">
        <div className="post__icon__group__left">
          <span className="post__icon">
            <SlLike />
          </span>
          <p>10 K</p>
          <span className="post__icon">
            <IoShareSocialOutline/>
          </span>
        </div>
        <div className="post__icon__group__right">
          <span className="post__icon">
            <AiOutlineComment/>
          </span>
          <p>10 K</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
