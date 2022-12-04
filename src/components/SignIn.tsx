import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authFormValidation,
  saveSignedInUserInRedux,
} from "../hooks/functions";

export default function SignIn() {
  const [errors, setErrors] = useState([""]);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([""]);
    const data = new FormData(event.currentTarget);
    const email = `${data.get("email")}`;
    const password = `${data.get("password")}`;
    const errors = authFormValidation(email, password);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredential.user;
      const userToken = (await user.getIdTokenResult()).token;
      localStorage.setItem("token", userToken);
      localStorage.setItem("email", email);
      saveSignedInUserInRedux(email);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setErrors([
          ...errors,
          "*User is not found! Check you email and password",
        ]);
        return;
      }
    }

    navigate("/my-gallery");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          onChange={() => setErrors([])}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid className="sign-up-error-div">
            {errors.length > 0 &&
              errors.map((err: string, index: number) => (
                <p key={index}>{err}</p>
              ))}{" "}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
