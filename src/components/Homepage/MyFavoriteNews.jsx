import React, { useEffect, useState } from "react";
import NewsFeedCard from "./NewsFeedCard";

const MyFavoriteNews = (props) => {
  const { favoriteItem } = props;
  return (
    <>
      {!favoriteItem?.favoriteNews?.length ? (
        <div>No Items found</div>
      ) : (
        <>
          {favoriteItem.favoriteNews.map((news, i) => (
            <NewsFeedCard onClickRemoveFav={props.onClickFavRemove} key={i} selected={true} news={news} />
          ))}
        </>
      )}
    </>
  );
};

export default MyFavoriteNews;
