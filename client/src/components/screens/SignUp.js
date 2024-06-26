import React,{ useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
import M from 'materialize-css'
const SignUp = ()=>{
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [otp,setOtp] = useState("");
    const [image,setImage]=useState("");
    const [url,setUrl] = useState(undefined)
    const [verify,setVerify] = useState(false);
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
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
    const uploadFields = ()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "red" })
            return
        }
        
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                 M.toast({html:data.message,classes:"#43a047 green darken-1"})
                 //setVerify(true);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const PostData = () =>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
    }
    const verifyEmail = ()=>{
        if(6){
            fetch("/verify",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    otp
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    navigate('/signin')  
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            M.toast({ html: "Invalid otp enter valid otp to continue", classes: "red" })
        }
    }
    return (
        <div>
            <div className="card auth-card">
                <h2 className="mylogo">memegram</h2>
                <input placeholder="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                <input placeholder="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                <input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>Upload pic </span>
                        (optional)
                        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                {verify?<><input placeholder="enter otp recieved on your regisered email" value={otp} onChange={(e)=>{setOtp(e.target.value)}}></input><button className="waves-effect waves-light btn blue lighten-2" onClick={()=>verifyEmail()}>Verify</button></>: <button className="waves-effect waves-light btn blue lighten-2" onClick={()=>PostData()} >Sign Up</button>}<br /><br />
                All ready have an account? <Link to="/signin">LOGIN</Link>
            </div>
        </div>
    );
}

export default SignUp;