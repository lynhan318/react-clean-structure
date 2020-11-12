import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const dp = useDispatch();
  React.useEffect(() => {
    dp({
      type: "get_profile",
    });
  }, [dp]);
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/feed">feed</Link>
      <Link to="/profile">profile</Link>
      this is profile page
    </div>
  );
};
export default Profile;
