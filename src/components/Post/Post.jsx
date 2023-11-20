import React, { useState, useRef, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { Container } from "@mui/material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userId, userName, postId, likes } = props;
  const [commentList, setCommentList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const isInitialMount = useRef(true);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList);
  };
  const handleLike = () => {
    setIsLike(!isLike);
    if (!isLike) {
      setLikeCount(likeCount + 1);
      saveLike();
    } else {
      setLikeCount(likeCount - 1);
      deletelike();
    }
  };
  const refreshComment = () => {
    fetch(`/comments?postId=${postId}`)
      .then((response) => response.json())
      .then(
        (result) => {
          setCommentList(result);
          setisLoaded(true);
        },
        (error) => {
          setisLoaded(true);
          setError(error);
        }
      );
  };
  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const deletelike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    }).catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setLikeId(likeControl.id);

      setIsLike(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComment();
  }, []);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <Card
      style={{
        margin: "20px",
        width: "1200px",
        display: "block",
        textAlign: "left",
      }}
    >
      <CardHeader
        avatar={
          <Link className="linkUser" to={`/users/${userId}`}>
            <Avatar style={{ background: "#1565C0" }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          style={isLike ? { color: "red" } : null}
          onClick={handleLike}
        >
          <FavoriteIcon />
        </IconButton>
        {likeCount}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <Container fixed timeout="auto" unmountOnExit>
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment) => (
                <Comment userId={1} userName={"USER"} text={comment.text} />
              ))
            : "Loading"}
        </Container>
        <CommentForm
          userId={1}
          postId={postId}
          userName={"USER"}
          refreshComment={refreshComment}
        />
      </Collapse>
    </Card>
  );
}

export default Post;
