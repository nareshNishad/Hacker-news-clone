import React, { useState, useEffect } from "react";
import "./Main.css";
import axios from "axios";
import Pagination from "../Pagination/index";

import Story from "../Story";
import Header from "../Header/index";
import Search from "../Search";

import { useHistory } from "react-router-dom";

function Main() {
  const [userInput, setUserInput] = useState("");
  const [searchType, setSearchType] = useState("story");
  const [byValue, setByValue] = useState("byPopularity");
  const [forValue, setForValue] = useState("all");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState([]);
  const [searchstat, setSearchStat] = useState({
    number: 0,
    timeTaken: 0,
    totalPage: 0,
  });
  const history = useHistory();

  useEffect(() => {
    searchQuery();
    const setting = {
      type: searchType,
      dateRange: forValue,
      sort: byValue,
      query: userInput,
      page: page,
    };

    history.push(
      `/query=${setting.query}/sort=${setting.sort}/page=${setting.page}/dateRange=${setting.dateRange}/type=${setting.type}`
    );
  }, [userInput, searchType, byValue, forValue, page]);

  const checkSort = () => {
    return byValue === "byPopularity" ? "search" : "search_by_date";
  };

  const checkType = () => {
    switch (searchType) {
      case "story":
        return "story";
      case "comment":
        return "comment";
      case "all":
        return "(story,comment)";
      default:
        return "story";
    }
  };

  const getLastWeek = () => {
    const today = new Date();
    const last = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return last.getTime() / 1000;
  };

  const getLastMonth = () => {
    const today = new Date();
    const last = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    return last.getTime() / 1000;
  };

  const getLast24h = () => {
    const today = new Date();
    const last = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    return last.getTime() / 1000;
  };

  const getLastYear = () => {
    const today = new Date();
    const last = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    return last.getTime() / 1000;
  };

  const getTime = () => {
    switch (forValue) {
      case "all":
        return null;
      case "last24h":
        return getLast24h();
      case "pastWeek":
        return getLastWeek();
      case "pastMonth":
        return getLastMonth();
      case "pastYear":
        return getLastYear();
      default:
        return null;
    }
  };

  const searchQuery = () => {
    let url;
    let sortValue = checkSort();
    let type = checkType();
    let date = getTime();
    if (date === null) {
      url = `https://hn.algolia.com/api/v1/${sortValue}?query=${userInput}&page=${page}&tags=${type}`;
    } else {
      url = `https://hn.algolia.com/api/v1/${sortValue}?query=${userInput}&page=${page}&tags=${type}&numericFilters=created_at_i>${date}`;
    }
    axios.get(url).then((data) => {
      console.log(data);
      setResult(data.data.hits);
      let temp = {
        number: data.data.nbHits,
        timeTaken: data.data.processingTimeMS / 1000,
        totalPage: data.data.nbPages,
      };
      setSearchStat(temp);
    });
  };

  return (
    <>
      <Header>
        <Search userInput={userInput} setUserInput={setUserInput} />
      </Header>

      <div className="main_container">
        <div className="container_filter">
          <div className="search_by">
            <span className="name">Search</span>
            <div>
              <select
                name="slct"
                id="slct"
                defaultValue="story"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="story">Stories</option>
                <option value="comment">Comments</option>
              </select>
            </div>
          </div>
          <div className="search_by">
            <span className="name">by</span>
            <div>
              <select
                name="slct_by"
                id="slct_by"
                onChange={(e) => setByValue(e.target.value)}
              >
                <option value="Popularity">Popularity</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
          <div className="search_by" style={{ flex: 1 }}>
            <span className="name">For</span>
            <div>
              <select
                name="slct_for"
                id="slct_for"
                defaultValue="all"
                onChange={(e) => setForValue(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="last24h">Last 24h</option>
                <option value="pastWeek">Past Week</option>
                <option value="pastYear">Past Year</option>
              </select>
            </div>
          </div>

          <span className="search_infos">
            {searchstat.number || searchstat.timeTaken
              ? `${searchstat.number.toLocaleString("en")} results(${
                  searchstat.timeTaken
                } seconds)`
              : null}
          </span>
        </div>
        {result?.map((res) => (
          <Story
            key={res.objectID}
            id={res.objectID}
            title={res.title}
            url={res.url}
            author={res.author}
            points={res.points}
            date={res.created_at_i}
            comment={res.comment_text}
            commentNum={res.num_comments}
            storyText={res.story_text}
            parent={res.parent_id}
            commentText={res.comment_text}
          />
        ))}
        <Pagination
          initialPage={page}
          setPage={setPage}
          totalPage={searchstat.totalPage}
        />
      </div>
    </>
  );
}

export default Main;
