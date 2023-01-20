import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './Navbar'
import './App.css'
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Signup from './screens/SignUp';
import CreatePost from './screens/createPost';
import UserProfile from './screens/UserProfile';
import SubUserPost from './screens/SubUserPost';
import Search from './screens/Search';
import {reducer,initialState} from '../reducers/useReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user});
    }
    else{
      navigate('/signin');
    }
  },[])
  return(
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/signin' element={<Login />} />
    <Route exact path='/profile' element={<Profile/>} />
    <Route exact path='/signup' element={<Signup />} />
    <Route exact path='/createpost' element={<CreatePost />} />
    <Route exact path='/profile/:userid' element={<UserProfile />} />
    <Route exact path='/subpost' element={<SubUserPost/>} />
    <Route exact path='/search' element={<Search/>} />
    </Routes>
  );
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div>
      <UserContext.Provider value ={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;