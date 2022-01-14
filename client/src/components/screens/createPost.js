import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router";
import M from 'materialize-css'
const CreatePost = ()=>{
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch('/createpost',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                url
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                 M.toast({html:"poste successfully",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err);
        })
        }
    },[url])
    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        fetch("https://api.cloudinary.com/v1_1/pg1/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="card auth-card">
            <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}  />
            <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea" placeholder="body" value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
            </div>

                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>photo</span>
                        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            <button className="btn blue" onClick={()=>{postDetails()}}>SUBMIT POST</button>
        </div>
    )
}

export default CreatePost;