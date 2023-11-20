import { Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import "./CommentForm.css"
import Avatar from "@mui/material/Avatar";



function Comment (props) {

const {userId, userName,postId,refreshComment} = props;
const [text,setText]=useState("");

const saveComment=()=>{
    fetch("/comments",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            postId:postId,
            userId:userId,
            text:text,
        }),
    }).then((res)=>res.json()).catch((err)=>console.log("error"))
  }

const handleComment=()=>{
    saveComment();
    setText("");
    refreshComment();
}
const handleText=(value)=>{
    setText(value);
}

return (
    <CardContent  style={{width:"100%", height:"50px"}} className="container">
        <OutlinedInput  style={{width:"100%"}} className="input"
             onChange={(e)=>handleText(e.target.value)}
            id="outlined-adornment-amount"
            multiline
            inputProps={{maxLength:250}}
            fulWidth
            startAdornment={
                <InputAdornment position="start">
                      <Avatar style={{background:"#1565C0"}}  aria-label="recipe">
                      {userName.charAt(0).toUpperCase()}
                      </Avatar>
                </InputAdornment>
            } 
            endAdornment={
                <InputAdornment position="end">
                 <Button onClick={handleComment} variant="contained" color="primary"  >Add</Button>
                </InputAdornment>
            }
            value={text}
            >
        </OutlinedInput>
    </CardContent>
)

}
export default Comment;