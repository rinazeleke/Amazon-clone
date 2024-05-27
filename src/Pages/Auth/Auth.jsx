import React, { useState, useContext } from "react";
import classes from "./Auth.module.css"
import {Link, useNavigate} from "react-router-dom"
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {ClipLoader} from "react-spinners"
import{DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type";
function Auth() {

  const[email, setEmail] = useState("");
  const[password, setpassword] = useState("");
  const[error, setError] = useState("");
  const[loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })

  const [user, dispatch] = useContext(DataContext);
  const navigate =useNavigate()

  
const authHandler = async(e) => {
  e.preventDefault()
  console.log(e.target.name);
  if(e.target.name == "sigin"){
    // firebase auth
    setLoading({...loading, signIn:true})
    signInWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
      setLoading({...loading, signIn:false});
      navigate("/")
    }).catch((err)=>{
    setError(err.message);
    setLoading({...loading, signIn:false})
    })
  }else{
    setLoading({...loading, signIn:true})
    createUserWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
      setLoading({...loading, signIn:false})
      navigate("/")
  }).catch((err)=>{
    setError(err.message);
    setLoading({...loading, signIn:false})
  })
  }

};  

  return (
      <section className={classes.login}>
        <Link>
            <img 
              src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" 
              alt=""
            />
        </Link>
        <div className={classes.login_container}>
            <h1>sign in</h1>
            <form action="">
              <div>
                <label htmlfor="email">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"/>
              </div> 
              <div>
                <label htmlfor="password">password</label>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" id="password"/>
              </div> 
              <button
                type="submit" 
                onClick={authHandler} 
                name="sigin"
                className={classes.login_signInButton}
              > 
                {loading.signIn ? (<ClipLoader color="#000" size={15} />):("sign In")}
              </button> 
            </form>

            <p>By signing in your agree to the AMAZON FAKE CLONE condition of use and sale. please see our Privacy Notice, our cookies Notice and our interest.Based ADs Notice</p>

            <button 
              type="submit" 
              onClick={authHandler} 
              name="sigup"
              className={classes.login_registerButton}
              >
                {loading.signUp ? (<ClipLoader color="#000" size={15} />):(" Create your Amazon Account")}
            </button>
            {error && <small style={{paddingTop:"5px", color:"red"}}>{error}</small>}
            </div>
      </section>
    
  );
}

export default Auth;
