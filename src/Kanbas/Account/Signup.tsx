import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Signup() {
  const [user, setUser] = useState<any>({role:"FACULTY"});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async () => {
    try {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kanbas/Account/Profile");
      } catch (err: any) {
        setError(err.response.data.message);
      }
  
  };
  return (
    <div>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="form-control mb-2" placeholder="username" />
      <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
             className="form-control mb-2" placeholder="password" />
      <button onClick={signup} className="btn btn-primary mb-2"> Sign up </button><br />
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          className="form-select"
          onChange={(e) => setUser({ ...user, role: e.target.value === "faculty" ?  "FACULTY" : "STUDENT"})}
        >
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
      </div>
      <Link to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}

