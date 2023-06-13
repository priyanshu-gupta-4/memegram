import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import M from 'materialize-css'
const CreatePost = ()=>{
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("");
    const [aimg,setaimg]=useState(0);
    const [aitxt,setaitxt]=useState("");
    const [aiurl,setaiurl]=useState("");
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
        if(aiurl){
            const data = new FormData()
            data.append("file",aiurl)
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
        else{
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
    }
    const handleGen=()=>{
        setaiurl("data:image/png;base64,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")
        axios.get("https://lexica.art/api/v1/search?q="+aitxt)
            .then(response => {
                const data = response.data;
                console.log(data);
                if (!data.images) {
                    M.toast({ html: "no data found", classes: "#c62828 red darken-3" });
                    setaiurl("");
                }
                let x=Math.floor(Math.random()*data.images.length)
                setaiurl(data.images[x].src);
            })
            .catch(error => {
                console.log(error);
            });
        
    }
    return(
        <div className="card auth-card">
            <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}  />
            <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea" placeholder="body" value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
            </div>
                {aimg?<></>:<div className="file-field input-field">
                    <div className="btn blue">
                        <span>photo</span>
                        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>}
                <div className="btn blue" onClick={()=>{setaimg(!aimg); setaiurl("")}}>
                        <span>{aimg?"Cancel":"AI IMAGE"}</span>
                </div>
                {aimg?<div><input type="text" onChange={(e)=>setaitxt(e.target.value)}></input><button className="btn blue" onClick={()=>{handleGen()}}>get Image</button></div>:<></>}
                {aiurl?<img className="aiImg" src={aiurl}></img>:<></>}
            <br></br><br></br><button className="btn blue" onClick={()=>{postDetails()}}>SUBMIT POST</button>
        </div>
    )
}

export default CreatePost;