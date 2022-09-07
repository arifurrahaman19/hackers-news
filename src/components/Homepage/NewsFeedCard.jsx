import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import moment from "moment";

const NewsFeedCard = (props) => {
  const { favoriteHandler, news, selected, onClickRemoveFav } = props;

  const [isFavorite, setIsfavorite] = useState(false);

  const onClickFavoriteHandler = (objId) => {
    if (onClickRemoveFav) {
      onClickRemoveFav(objId);
    } else {
      favoriteHandler(objId);
    }

    setIsfavorite(!isFavorite);
  };

  return (
    <div className="news-feed-card">
      <a href={news?.story_url} target="_blank">
        <div className="post-time">
          <AiOutlineClockCircle fontSize="2rem" />
          <p>{news?.author}</p>
          <p>{moment.utc(news?.created_at).local().startOf("seconds").fromNow()}</p>
        </div>
        <h2>{news?.story_title}</h2>
      </a>
      <div onClick={() => onClickFavoriteHandler(news.objectID)} className="favorite-icon">
        <button>{isFavorite || selected ? <MdFavorite /> : <MdFavoriteBorder />}</button>
      </div>
    </div>
  );
};

export default NewsFeedCard;
