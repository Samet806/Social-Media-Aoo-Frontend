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
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

function PostForm(props) {
  const {userId,userName,refreshPost } = props;
  const [expanded, setExpanded] = useState(false);
 const [liked,setLiked]=useState(false);
  const [text,setText]=useState("");
  const [title,setTitle]=useState("");
  const [isSent,setIsSent]=useState(false)
  const savePost=()=>{
    fetch("/posts",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            title:title,
            userId:userId,
            text:text,
        }),
    }).then((res)=>res.json()).catch((err)=>console.log("error"))
  }
 const handleSubmit=()=>{
    savePost();
    setIsSent(true)
    setTitle("")
    setText("")
    refreshPost();
 }
 const handleTitle=(value)=>{
    setTitle(value);
    setIsSent(false)
 }
 const handleText=(value)=>{
    setText(value);
    setIsSent(false)
 }
 const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSent(false);
  };


  return (
    <div>
        <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
     Your post is sent!!
    </Alert>
     </Snackbar>
    
    <Card style={{margin:"20px", width:"1200px",display:"block",textAlign:"left"}}>
      <CardHeader
      
        avatar={
            <Link className='linkUser' to={`/users/${userId}`}>
          <Avatar style={{background:"#1565C0"}}  aria-label="recipe">
        {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        title={<OutlinedInput style={{width:"100%"}}
        id="outlined-adornment-amount"
            multiline
            placeholder="Title"
            inputProps={{maxLength:25}}
            fulWidth
            onChange={(i)=>handleTitle(i.target.value)}
             value={title} >

        </OutlinedInput>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <OutlinedInput  style={{width:"100%"}}
        id="outlined-adornment-amount"
            multiline
            placeholder="Text"
            inputProps={{maxLength:250}}
            fulWidth
            endAdornment={
                <InputAdornment position="end">
                 <Button variant="contained" color="primary" onClick={handleSubmit} >Add</Button>
                </InputAdornment>
            }
            onChange={(i)=>handleText(i.target.value)} value={text}>
         </OutlinedInput>
        </Typography>
      </CardContent>
     
  
    </Card>
    </div>
  );
}

export default PostForm;
