import React,{useEffect,useState,useContext} from "react";
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
function Home(){
    const [comen,setComen] = useState(0);
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('/allposts',{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    const likePost=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    item.likes=result.likes
                    return item
                }
                else{
                    return item
                }
            })
            setData(newData);
        })
    }


    const unlikePost=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    item.likes=result.likes
                    return item;
                }
                else{
                    return item
                }
            })
            setData(newData);
        })
    }

    const makeComment=(id,com)=>{
        fetch("/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text:com,
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    item.comments=result.comments
                    return item;
                }
                else{
                    return item
                }
            })
            setData(newData);
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !==result._id
            })
            setData(newData);
        })
    }

    return (
        <>{data?
        <div className="home">
        {/* <div className="stories">
            <div className="story"></div>
            <div className="story"></div>
            <div className="story"></div>
            <div className="story"></div>
        </div> */}
            {data.map(item=>{
                return(
                    <div className="card home-card" key={item._id}>
                        <h5 style={{padding:"1%"}}><Link to={"/profile/"+item.postedBy._id} style={{color:"black"}}><img src={item.postedBy.pic} style={{height:"30px",width:"30px",borderRadius:"100%",margin:"5px 0 0 0"}}></img> {item.postedBy.name}</Link>{item.postedBy._id == state._id&&<i className="material-icons" onClick={()=>{deletePost(item._id)}} style={{float:"right"}}>delete</i>}</h5>
                        <div className="card-image postimg">
                            <a href={item.photo}><img src={item.photo} /></a>
                        </div>
                        <div className="card-content">
                            {item.likes.includes(state._id)
                              ?
                              <i className="material-icons" style={{color:"red"}} onClick={()=>unlikePost(item._id)}>favorite </i>
                              :
                              <i className="material-icons" onClick={()=>likePost(item._id)}>favorite_border</i>
                            }
                            <i className="material-icons" onClick={()=>{comen===1?setComen(0):setComen(1)}} >comment</i>
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            {item.body}
                            {comen===1?<>
                            <form onSubmit={(e)=>{
                                e.preventDefault();
                                makeComment(item._id,e.target[0].value);
                                e.target[0].value="";
                            }}>
                            <input type="text" placeholder="Add a Comment" /></form>
                            {item.comments.map(com=>{
                                return(
                                    <div>
                                        <h6 key={com._id} style={{fontWeight:"500"}}>{com.postedBy.name}</h6>
                                        {com.text}
                                     </div>
                                )
                            })}
                            </>:<></>}
                    
                        </div>
                    </div>
                );
            })}
        </div>
        :<h2>Loading....</h2>}
        </>
    );
}

export default Home;