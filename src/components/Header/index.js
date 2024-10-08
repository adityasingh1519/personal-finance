import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userSvg from "../../assets/user.svg";

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFunc() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Logged Out");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p href="/"> Finance</p>

      {user && <p style={ {display: "flex" , alignItems:"center"}  } onClick={logoutFunc}> <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>Logout</p>}
    </div>
  );
}
