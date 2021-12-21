import React,{useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from './App'
function Navbar (){
  const navigate = useNavigate();
    const {state,dispatch} = useContext(UserContext);
    const renderList = ()=>{
      if(state){
        return[
            <li><Link to="/createpost" className="black-text">Create Post</Link></li>,
            <li><Link to="/profile" className="black-text">Profile</Link></li>,          
            <li><Link to="/subpost" className="black-text">Explore</Link></li>,          
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate("/signin")
              }}
            >Logout</button>
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