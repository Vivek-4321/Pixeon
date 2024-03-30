import React from "react";
import "./RecommendationSideBar.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useCookies } from "react-cookie";

function RecommendationSideBar() {

    const [cookies, setCookie] = useCookies(["theme"]);

  return (
    <SkeletonTheme
    baseColor={cookies.theme === "dark" ? "#202020" : ""}
    highlightColor={cookies.theme === "dark" ? "#444" : ""}
    borderRadius={8}
  >
      <div className="recommendation__container">
        <div className="recommendation__container__loading">
          <Skeleton width={200} height={30} style={{ marginBottom: "10px" }} />
          <Skeleton
            count={5}
            height={40}
            width={200}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default RecommendationSideBar;
