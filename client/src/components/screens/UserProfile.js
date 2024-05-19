import React, {useEffect,useState,useContext} from "react";
import {useParams} from 'react-router-dom'
import {UserContext} from '../App'
const UserProfile = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const [profile,setProfile] = useState();
    const [posts,setPosts] = useState([]);
    const {userid} = useParams();
    useEffect(()=>{
        fetch(`https://memegram.onrender.com/profile/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setProfile(result.user);
            setPosts(result.posts);
        })
    },[])

    const follow = (followId)=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId
            }) 
        })
        .then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATE",payload:{following:result.LogUser.following,followers:result.LogUser.followers}})
            localStorage.setItem("user",JSON.stringify(result.LogUser));
            setProfile(result.foundUser);
        })
    }
    const unfollow = (followId)=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId
            }) 
        })
        .then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATE",payload:{following:result.LogUser.following,followers:result.LogUser.followers}})
            setProfile(result.foundUser);
            localStorage.setItem("user",JSON.stringify(result.LogUser));
        })
    }
    return(
    <>
    {profile?
    <div style={{maxWidth:"1000px" , margin:"auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px auto",
                borderBottom: "1px solid grey",
            }}>
                <img class="profileImg" src={profile.pic} />
                <div>
                    <h4>{profile.name}</h4>
                    
                    {profile.followers.includes(state._id)?
                    <button onClick={()=>{unfollow(profile._id)}} className="btn waves-effect waves-light #64b5f6 blue darken-1">Unfollow</button>
                    :
                    <button onClick={()=>{follow(profile._id)}} className="btn waves-effect waves-light #64b5f6 blue darken-1">Follow</button>}
                    <h6>{profile.status}</h6>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h6>{profile.followers.length} followers</h6>
                        <h6 style={{margin:"10px"}}> {profile.following.length} following </h6>
                        <h6> {posts.length} posts</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
            {posts.map((post)=>{
                return (
                        <a className="item" href={post.photo}><img style={{width:"100%" ,height:"100%"}} key={post._id} src={post.photo} alt={post.title} /></a>
                );
        })}
        </div>   
    </div>
    :<h2>Loading</h2>}
    </>
    );
}

export default UserProfile;