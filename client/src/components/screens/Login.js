import React,{ useState,useContext } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const Login = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("")
    const PostData = () =>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "red" })
            return
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user}) 
                M.toast({html:"sign in success",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
            <div>
                <div className="card auth-card">
                    <h2 className="mylogo">memegram</h2>
                    <input placeholder="email" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                    <input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <button className="waves-effect waves-light btn blue lighten-2" onClick={()=>{PostData()}}>Login</button><br /><br />
                    New to memegram ? <Link to="/signup">SIGN UP</Link>
                </div>
            </div>
        );
}

export default Login;