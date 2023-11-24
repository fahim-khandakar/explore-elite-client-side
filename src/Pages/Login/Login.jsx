/* eslint-disable react/no-unescaped-entities */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import animation from "../../assets/Animation - 1700835226561.json";
import { useLottie } from "lottie-react";

const Login = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
  };
  return (
    <Grid
      container
      sx={{ display: "flex" }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Grid width={{ xs: 1, md: 1 / 3 }}>{View}</Grid>
      <Grid width={{ xs: 1, md: 1 / 2 }}>
        <Typography
          variant="h5"
          mt={3}
          fontWeight={700}
          color={"#e65728"}
          width={"50%"}
          mx={"auto"}
          textAlign={"center"}
        >
          Welcome to Explore Elite!
        </Typography>
        <Typography
          // variant="contained"
          color={"#666666"}
          my={1}
          width={"50%"}
          mx={"auto"}
          textAlign={"center"}
        >
          Sign In now to join our community of travellers and explorers
        </Typography>

        <form onSubmit={handleLogin}>
          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              name="email"
              sx={{ width: "50%" }}
              label="Email"
              variant="outlined"
            />
          </Box>

          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl my={3} sx={{ m: 1, width: "50%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" sx={{ width: "50%" }} variant="contained">
              Register
            </Button>
          </Box>
          <Divider sx={{ width: "50%", margin: "12px auto" }}>
            <Chip label="or" />
          </Divider>
          <Typography
            color={"#666666"}
            fontSize={"12px"}
            textAlign={"center"}
            mx={"auto"}
            width={"50%"}
          >
            Continue using the following:
          </Typography>
        </form>

        <Box my={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            // variant="contained"

            sx={{
              gap: "15px",
              width: "50%",
              fontSize: "14px",
              border: "1px solid #666666",
            }}
          >
            <FcGoogle></FcGoogle> Google
          </Button>
        </Box>
        <Typography width={"50%"} mx={"auto"}>
          Don't have an account yet?
          <Button component={Link} to={"/register"}>
            Sign up now
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
