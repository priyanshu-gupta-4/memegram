import React,{ useState, useEffect } from "react";
import {Link} from 'react-router-dom'
function Search(){
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState("");
    useEffect(()=>{
            if(search===""){
                fetch("/alluser",{
                    method:"get",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                })
                .then(res=>res.json())
                .then(result=>{
                    setUsers(result.users)
                })
            }
            else{
                    const t=setTimeout(()=>{
                    fetch('/searchUser/'+search,{
                        method:"get",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        setUsers(result.users)
                    }
                )},300);
                    return () => clearTimeout(t);
            }   
        },[search])
    return(
        <div>
            <input type="text" style={{padding:"0 2%"}} onChange={(e)=>{setSearch(e.target.value)}} placeholder="enter user name"></input>
            <div className="UserList">
                {users.map(user=>{
                    return <div className="card home-card" key={user._id}>
                        <h5 style={{padding:"1%"}}><Link to={"/profile/"+user._id} style={{color:"black"}}>
                        <img src={user.pic} style={{height:"30px",width:"30px",borderRadius:"100%",margin:"5px 0 0 0"}}></img>
                        {user.name}</Link></h5>
                        </div> 
                })
                }
            </div>
        </div>
    )
}

export default Search;