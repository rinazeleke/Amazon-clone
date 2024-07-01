import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name === "signin") {
      setLoading((prev) => ({ ...prev, signIn: true }));
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((prev) => ({ ...prev, signIn: false }));
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signIn: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, signUp: true }));
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((prev) => ({ ...prev, signUp: false }));
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signUp: false }));
        });
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: Type.REMOVE_USER,
        });
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG21.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.login_container}>
        <h1>{user ? "Sign Out" : "Sign In"}</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        {!user ? (
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="signin"
              className={classes.login_signInButton}
            >
              {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
            </button>
          </form>
        ) : (
          <button onClick={handleSignOut} className={classes.login_signOutButton}>
            Sign Out
          </button>
        )}
        {!user && (
          <>
            <p>
              By signing in, you agree to the AMAZON FAKE CLONE condition of use and sale. Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
            </p>
            <button
              type="button"
              onClick={authHandler}
              name="signup"
              className={classes.login_registerButton}
            >
              {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create your Amazon Account"}
            </button>
          </>
        )}
        {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
