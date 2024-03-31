import React from "react";
import "./SideBar.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCookies } from "react-cookie";

function SideBar() {
  const [cookies, setCookies] = useCookies(["theme"]);
  return (
    <SkeletonTheme
      baseColor={cookies.theme.includes("dark") ? "#000d0d" : ""}
      highlightColor={cookies.theme.includes("dark") ? "#14111d" : ""}
      borderRadius={8}
    >
      <div className="sidebar__navigation">
        <div className="sidebar__navigation__loading">
          <Skeleton
            count={6}
            height={40}
            width={200}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SideBar;
