import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import MainEditor from "./components/Editor";

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "get_home",
      payload: {
        text: "hello there",
      },
    });
  }, [dispatch]);

  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/feed">feed</Link>
      <Link to="/profile">profile</Link>
      this is home page
      <MainEditor />
    </div>
  );
};

export default Home;
