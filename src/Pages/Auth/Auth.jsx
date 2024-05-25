import React from "react";
import classes from "./Auth.module.css"
import {Link} from "react-router-dom"
function Auth() {
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
                <input type="email" id="email"/>
              </div> 
              <div>
                <label htmlfor="password">password</label>
                <input type="password" id="password"/>
              </div> 
              <button className={classes.login_signInButton}>sign in</button> 
            </form>

            <p>By signing in your agree to the AMAZON FAKE CLONE condition of use and sale. please see our Privacy Notice, our cookies Notice and our interest.Based ADs Notice</p>

            <button className={classes.login_registerButton}>Create your Amazon Account</button>
            </div>
      </section>
    
  );
}

export default Auth;
