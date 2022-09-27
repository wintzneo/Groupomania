import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Heart } from "../Likes/red-heart-icon.svg";

const particleList = Array.from(Array(10));

const LikeButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <Heart />
        <span className={cn("suffix", { liked })}>Liké !</span>
      </div>
    </button>
  );
};

export default LikeButton;