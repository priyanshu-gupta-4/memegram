import React, {useEffect,useState,useContext} from "react";
import {useParams} from 'react-router-dom'
import {UserContext} from '../App'
const UserProfile = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const [profile,setProfile] = useState();
    const [posts,setPosts] = useState([]);
    const {userid} = useParams();
    useEffect(()=>{
        fetch(`/profile/${userid}`,{
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
                <div><img style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%"
                }} src={profile.pic} />
                </div>
                <div>
                    <h4>{profile.name}</h4>
                    <h6>{profile.status}</h6>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h6 style={{margin:"10px"}}>{profile.followers.length} followers</h6>
                        <h6 style={{margin:"10px"}}> {profile.following.length} following </h6>
                        <h6 style={{margin:"10px"}}> {posts.length} posts</h6>
                    </div>
                    {profile.followers.includes(state._id)?
                    <button onClick={()=>{unfollow(profile._id)}} className="btn waves-effect waves-light #64b5f6 blue darken-1">Unfollow</button>
                    :
                    <button onClick={()=>{follow(profile._id)}} className="btn waves-effect waves-light #64b5f6 blue darken-1">Follow</button>}
                </div>
            </div>
            <div className="gallery">
            {posts.map((post)=>{
                return (
                        <img key={post._id} className="item" src={post.photo} alt={post.title} />
                );
        })}
        </div>   
    </div>
    :<h2>Loading</h2>}
    </>
    );
}

export default UserProfile;