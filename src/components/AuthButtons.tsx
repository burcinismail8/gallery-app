import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "./NavTabs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { store } from "..";
import { removeUser } from "../store/actions/actions";

export const AuthButtons = () => {
  const [value, setValue] = useState("/");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/sign-in");
  };
  const handleSignUpClick = () => {
    navigate("/sign-up");
  };
  const handleLogOutClick = () => {
    localStorage.clear();
    store.dispatch(removeUser());
    navigate("/");
  };
  return (
    <div>
      {localStorage.email ? (
        <div>
          <div className="auth-buttons">
            <p>{localStorage.getItem("email")}</p>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ margin: 5 + "px" }}
              size="medium"
              onClick={handleLogOutClick}
            >
              Log Out
            </Button>
          </div>
          <NavTabs />
        </div>
      ) : (
        <div>
          <div className="auth-buttons">
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: 5 + "px" }}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ margin: 5 + "px" }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
