import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.config";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user, isLoading, errors] = useAuthState(auth);
  const handleSignOut = async () => {
    await signOut(auth);
  };
  // console.log(auth);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/create">Create Post</Link>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p>userName: {user?.displayName}</p>
            <img src={user?.photoURL || ""} alt="" width="20" height="20" />
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
