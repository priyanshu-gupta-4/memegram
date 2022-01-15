import React,{useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from './App'
function Navbar (){
  const navigate = useNavigate();
    const {state,dispatch} = useContext(UserContext);
    const renderList = ()=>{
      if(state){
        return[
            <li><Link to="/createpost" className="black-text"><i class="material-icons">add</i></Link></li>,
            <li><Link to="/profile" className="black-text"><img src={state.pic} style={{width:"30px",height:"30px",borderRadius:"100%",position:"relative",top:"10px"}}></img></Link></li>,          
            <li><Link to="/subpost" className="black-text"><i class="material-icons">explore</i></Link></li>,          
            <button className="btn waves-effect waves-light #64b5f6 red darken-1"
              style={{height:"20%"}}
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate("/signin")
              }}
            ><i class="material-icons" style={{fontSize:"20px"}}>power_settings_new</i></button>
          ];
      }
      else {
        return[
          <li><Link to="/signup" className="black-text">signup</Link></li>,
          <li><Link to="/signin" className="black-text">login</Link></li>
        ];
      }
    }
    return( 
      <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left black-text mylogo">MemeGram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
        );
}
export default Navbar;