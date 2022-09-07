import React, { useEffect, useState } from "react";
import NewsFeedCard from "./NewsFeedCard";
import axios from "../../config/axios";
import Pagination from "./Pagination";
import Preloader from "./Preloader";
import MyFavoriteNews from "./MyFavoriteNews";
import CustomSelect from "./CustomSelect";

const HomepageContainer = () => {
  const [state, setState] = useState({
    favoriteStatus: false,
    newsCategory: "angular",
    isActive: "all",
    pagination: {
      selectedPage: 0,
      pageCount: 50,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [allNews, setAllNews] = useState(null);

  const favoriteHandler = (objId) => {
    const getFavoriteItem = allNews?.data.filter((news) => news.objectID === objId);
    const favoriteNewsObj = getFavoriteItem.map((news) => {
      const newItem = { favoriteStatus: true, author: news.author, created_at: news.created_at, objectID: news.objectID, story_title: news.story_title, story_url: news.story_url };
      return newItem;
    });

    if (localStorage.getItem("hackerNews") !== null) {
      const getFavItemFromStorage = JSON.parse(localStorage?.getItem("hackerNews"));
      const filterPreviousItem = getFavItemFromStorage.favoriteNews.filter((item) => item.objectID !== favoriteNewsObj[0].objectID);
      console.log(getFavItemFromStorage, favoriteNewsObj);
      const favoriteNews = {
        ...getFavItemFromStorage,
        favoriteNews: [...filterPreviousItem, ...favoriteNewsObj],
      };
      localStorage.setItem("hackerNews", JSON.stringify(favoriteNews));
    } else {
      localStorage.setItem(
        "hackerNews",
        JSON.stringify({
          filter: state.newsCategory,
          favoriteNews: favoriteNewsObj,
        })
      );
    }
  };

  const paginationHandler = (val) => {
    setState({
      ...state,
      pagination: { ...state.pagination, selectedPage: val.selected },
    });

    getData(state.newsCategory, val.selected);
  };

  const options = [
    { value: "angular", label: "Angular", img: "/angular.png" },
    { value: "react", label: "React", img: "/react.png" },
    { value: "vuejs", label: "Vuejs", img: "/vuejs.png" },
  ];

  const getData = async (query, page) => {
    setIsLoading(true);
    await axios
      .get(`search_by_date?query=${query}&page=${page}`)
      .then((res) => {
        // console.log(res);
        setAllNews({
          data: res.data.hits,
          status: res.status,
        });
      })
      .then((error) => {
        setIsLoading(false);
        // console.log(error);
      });

    setIsLoading(false);
  };

  const fetchAndSetDataFromLocalStorage = () => {
    const itemsFromLocalStorage = localStorage.getItem("hackerNews");
    setFavoriteItem(JSON.parse(itemsFromLocalStorage));
  };

  const menuHandler = (val) => {
    if (val === "all") getData(state.newsCategory, state.pagination.selectedPage).then(() => setState({ ...state, isActive: val }));
    if (val === "my-faves") {
      setState({ ...state, isActive: val });
      fetchAndSetDataFromLocalStorage();
    }
  };

  const onChangeSelectHandler = (val) => {
    setState({ ...state, newsCategory: val.value });
    getData(val.value, 0);
  };

  const onClickFavRemove = (val) => {
    if (localStorage.getItem("hackerNews") !== null) {
      const getFavItemFromStorage = JSON.parse(localStorage?.getItem("hackerNews"));
      const filterPreviousItem = getFavItemFromStorage.favoriteNews.filter((item) => item.objectID !== val);
      setFavoriteItem({ ...getFavItemFromStorage, favoriteNews: [...filterPreviousItem] });
      localStorage.setItem("hackerNews", JSON.stringify({ ...getFavItemFromStorage, favoriteNews: [...filterPreviousItem] }));
    }
  };

  useEffect(() => {
    const res = getData(state.newsCategory, state.pagination.selectedPage);
    fetchAndSetDataFromLocalStorage();
    if (favoriteItem?.categoryFilter) {
      setState({ ...state, newsCategory: favoriteItem?.categoryFilter });
    }
  }, []);

  return (
    <div className="homepage container">
      <div className="menu flex">
        <button onClick={() => menuHandler("all")} className={`font-roboto ${state.isActive === "all" ? "active" : ""}`}>
          All
        </button>
        <button onClick={() => menuHandler("my-faves")} className={`font-roboto ${state.isActive === "my-faves" ? "active" : ""}`}>
          My Faves
        </button>
      </div>

      {state.isActive === "all" && <CustomSelect onChange={onChangeSelectHandler} options={options} defaultValue={state.newsCategory} />}

      {isLoading ? (
        <div className="preloader-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((val) => (
            <Preloader key={val} />
          ))}
        </div>
      ) : (
        <div className="news-feed-container">
          {state.isActive === "all" ? (
            <>
              {allNews &&
                allNews?.data &&
                allNews?.data.map((news, i) => news?.story_title && news?.story_url && <NewsFeedCard key={i} news={news} favoriteStatus={state.favoriteStatus} favoriteHandler={favoriteHandler} />)}
            </>
          ) : (
            <MyFavoriteNews favoriteItem={favoriteItem} onClickFavRemove={onClickFavRemove} />
          )}
        </div>
      )}

      {state.isActive === "all" && allNews?.data && allNews?.data.length > 10 && (
        <div className="pagination-container">
          <Pagination handler={paginationHandler} state={state} />
        </div>
      )}
    </div>
  );
};

export default HomepageContainer;
