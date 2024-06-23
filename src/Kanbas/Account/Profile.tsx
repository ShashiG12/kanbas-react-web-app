import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
        const account = await client.profile();
        setProfile(account);
      } catch (err: any) {
        navigate("/Kanbas/Account/Signin");
      }  
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
      <div className="container mt-5">
        <h1 className="mb-4">Profile</h1>
        {profile && (
          <div className="card p-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
              readOnly
                id="username"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
              readOnly
                id="password"
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
              readOnly
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
              readOnly
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input
                readOnly
                id="dob"
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                type="date"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                readOnly
                id="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
                Role: <b>{profile.role}</b>
            </div>
            <button onClick={signout} className="btn btn-danger w-100 mt-3">
              Sign out
            </button>
          </div>
        )}
      </div>
    );
}
