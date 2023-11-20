import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import "./Comment.css"
import Avatar from "@mui/material/Avatar";



function Comment (props) {

const {text, userId, userName} = props;

return (
    <CardContent style={{width:"100%", height:"100px"}} className="container">
        <OutlinedInput fullWidth className="input"
            disabled
            id="outlined-adornment-amount"
            multiline
            value={text}
            inputProps={{maxLength:250}}
            fulWidth
            startAdornment={
                <InputAdornment position="start">
                      <Avatar style={{background:"#1565C0"}}  aria-label="recipe">
                      {userName.charAt(0).toUpperCase()}
                      </Avatar>
                </InputAdornment>
            } 
            style={{color:"black",backgroundColor:"white"}}>
        </OutlinedInput>
    </CardContent>
)

}
export default Comment;