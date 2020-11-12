import React from "react";

import { getLikes } from "#api";
import { viewMore } from "#helpers";
import { Header, Button, Text } from "#components";
import firebase from "#services/firebase";

import Like from "./Like";
import Comment from "./Comment";
import Share from "./Share";

const FeedItem = (props) => {
  const { id = 123, description = "123" } = props;
  const [likes, setLikes] = React.useState(false);

  React.useEffect(() => {
    firebase();
    getLikes(id).then((res) => setLikes(res));
  }, [id]);

  return (
    <div>
      <Header />
      <Text>{viewMore(description)}</Text>
      <Share />
      <Like>{likes}</Like>
      <Button />
      <Comment />
    </div>
  );
};

export default FeedItem;
