import React, {useEffect,useState,useContext} from "react";
import {UserContext} from '../App'
const Profile = ()=>{
    const [posts,setPosts] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    const [image,setImage] = useState();
    const [st,editst]=useState(0);
    const [entVal,setVal]=useState(); 
    const [status,setStatus] = useState();
    useEffect(()=>{
        fetch('https://memegram.onrender.com/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setPosts(result.myposts);
        })
    },[])
    useEffect(()=>{
        if(image){
            const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        fetch("https://api.cloudinary.com/v1_1/pg1/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            fetch("/updatepic",{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result); 
                return result
            })
            .then((result)=>{
                dispatch({type:"UPDATEPIC",payload:result.pic});
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>{
            console.log(err)
        })

        }
    },[image])

    useEffect(()=>{
        if(status){
            fetch("/updatestatus",{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    status
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                dispatch({type:"UPDATESTATUS",payload:result.status});
                localStorage.setItem("user",JSON.stringify({...state,status:result.status}))
                editst(0);
            })
            .catch(err=>console.log(err))
        }
    },[status])
    const updatePhoto=(f)=>{
        setImage(f)
    }
    const updateStatus=(s)=>{
        setStatus(s);
    }
    return(
    <>
    {state?
    <div style={{maxWidth:"1000px" , margin:"auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px auto",
                borderBottom: "1px solid grey",
            }}>
                <div>
                <div><img style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%"
                }} src={state.pic}  />
                </div>
                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>Update pic</span>
                        <input type="file" onChange={(e)=>{updatePhoto(e.target.files[0])}}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                </div>
                <div>
                    <h4>{state.name}</h4>
                    <h6>{state.status?state.status+" ":"No status "}<i className="material-icons" onClick={()=>{st===0?editst(1):editst(0)}}>edit</i></h6>
                    {st==1?<><input type="text" defaultValue={state.status} onChange={(e)=>{setVal(e.target.value)}} ></input><button className="btn blue" onClick={()=>{updateStatus(entVal)}}>update</button></>:<></>}
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h6 style={{margin:"10px"}}>{state.followers.length} followers</h6>
                        <h6 style={{margin:"10px"}}>{state.following.length} following </h6>
                        <h6 style={{margin:"10px"}}>{posts.length} posts</h6>
                    </div>
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

export default Profile;