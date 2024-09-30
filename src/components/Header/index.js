import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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

      {user && <p onClick={logoutFunc}>Logout</p>}
    </div>
  );
}
