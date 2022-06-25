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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, firestore } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFormValidation } from "../hooks/functions";
import { doc, setDoc } from "firebase/firestore";
import { store } from "..";
import { addUser } from "../store/actions/actions";

export default function SignUp() {
  const [errors, setErrors] = useState([]) as any;
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const data = new FormData(event.currentTarget);
    const email = `${data.get("email")}`;
    const password = `${data.get("password")}`;
    const firstName = `${data.get("firstName")}`;
    const lastName = `${data.get("lastName")}`;
    const errors = authFormValidation(email, password);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredential.user;
      const userToken = (await user.getIdTokenResult()).token;
      localStorage.setItem("token", userToken);
      localStorage.setItem("email", email);
      localStorage.setItem("name", firstName + " " + lastName);

      setDoc(doc(firestore, "usersData", localStorage.email), {
        email,
        password,
        name: firstName + " " + lastName,
        photos: [],
      });

      store.dispatch(
        addUser({
          email,
          password,
          name: firstName + " " + lastName,
          photos: [],
        })
      );
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrors([...errors, "*This email is already in use"]);
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          onChange={() => setErrors([])}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid className="sign-up-error-div">
              {errors.length > 0 &&
                errors.map((err: string, index: number) => (
                  <p key={index}>{err}</p>
                ))}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
