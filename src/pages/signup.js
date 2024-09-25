import React, { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider, doc, setDoc } from "../firebase";

import { Await, useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [login, setlogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (name, email, password, confirmPassword) => {
    const errors = {};
    console.log(password, confirmPassword);

    // Validate Name
    if (!name) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = "Name can only contain letters and spaces.";
    }

    // Validate Email
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate Password
    if (!password || !confirmPassword) {
      errors.password = "Password and confirm password are required.";
    } else if (password !== confirmPassword) {
      errors.password = "Both passwords should be the same";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }

    return errors;
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(name, email, password, confirmPassword);
    if (Object.keys(errors) > 0) {
      setLoading(false);

      for (let key of Object.keys(errors)) {
        toast.error(errors[key]);
      }
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          toast.success("user created");
          setConfirmPassword("");
          setEmail("");
          setName("");
          setPassword("");
          createDoc(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(name, email, password, confirmPassword);
    if (Object.keys(errors) > 0) {
      setLoading(false);

      for (let key of Object.keys(errors)) {
        toast.error(errors[key]);
      }
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoading(false);
          toast.success("User Loged In");
          console.log("User log in ", user);
          setConfirmPassword("");
          setEmail("");
          setName("");
          setPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  };

  async function createDoc(user) {
    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : displayName,
          email: user.email ? user.email : email,
          photoURL: user.photoURL ? user.photoURL : photoURL,
          createdAt: createdAt,
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  }

  function googleAuth(e) {
    e.preventDefault();
    setlogin(true);

    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user>>" , user)
        toast.success("User Aunthicated")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    } catch (error) {
      toast.error(error.message);
    }

  
  }

  return (
    <>
      <Header></Header>

      {login ? (
        <div className="wrapper">
          <div className="signup-signin-container">
            <h2 style={{ textAlign: "center" }}>
              Sign In on <span className="blue-text">Financely.</span>
            </h2>
            <form onSubmit={signInWithEmail}>
              <div className="input-wrapper">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn">
                {loading ? `loading...` : ` Sign In with Email and Password`}
              </button>
              <p style={{ textAlign: "center" }}>or</p>
              <button
                onClick={googleAuth}
                disabled={loading}
                type="submit"
                className="btn"
              >
                {loading ? `loading...` : `  Sign In with Google `}
              </button>
            </form>
            <p
              onClick={() => setlogin(!login)}
              style={{
                textAlign: "center",
                marginBottom: 0,
                marginTop: "0.5rem",
                cursor: "pointer",
              }}
            >
              Don't have an account ? Click Here.
            </p>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="signup-signin-container">
            <h2 style={{ textAlign: "center" }}>
              Sign Up on <span className="blue-text">Financely.</span>
            </h2>
            <form onSubmit={signUpWithEmail}>
              <div className="input-wrapper">
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn">
                {loading ? `loading...` : ` Sign Up with Email and Password`}
              </button>
              <p style={{ textAlign: "center" }}>or</p>
              <button
                onClick={googleAuth}
                disabled={loading}
                type="submit"
                className="btn"
              >
                {loading ? `loading...` : `  Sign Up with Google `}
              </button>
            </form>
            <p
              onClick={() => setlogin(!login)}
              style={{
                textAlign: "center",
                marginBottom: 0,
                marginTop: "0.5rem",
                cursor: "pointer",
              }}
            >
              Alrady have an account ? Click Here.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpSignIn;
