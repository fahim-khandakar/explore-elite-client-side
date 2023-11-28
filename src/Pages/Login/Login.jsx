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
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import animation from "../../assets/Animation - 1700835226561.json";
import { useLottie } from "lottie-react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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

    signIn(email, password)
      .then((result) => {
        console.log(result);
        navigate(location?.state ? location.state : "/");
        swal("Success!", "You Are Successfully Login", "success");
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };

  const handleLoginWithGoogle = () => {
    googleSignIn()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        swal("Success!", "You Are Successfully Login", "success");
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };
  return (
    <Grid
      container
      sx={{ display: "flex" }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Helmet>
        <title>Explore Elite || Login</title>
      </Helmet>
      <Grid width={{ xs: 1, md: 1 / 3 }}>{View}</Grid>
      <Grid width={{ xs: 1, md: 1 / 2 }}>
        <Typography
          variant="h5"
          mt={3}
          fontWeight={700}
          color={"#e65728"}
          sx={{ width: { xs: "80%", md: "50%" } }}
          mx={"auto"}
          textAlign={"center"}
        >
          Welcome to Explore Elite!
        </Typography>
        <Typography
          // variant="contained"
          color={"#666666"}
          my={1}
          sx={{ width: { xs: "80%", md: "50%" } }}
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
              required
              name="email"
              sx={{ width: { xs: "80%", md: "50%" } }}
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
            <FormControl
              my={3}
              sx={{ width: { xs: "80%", md: "50%" } }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required
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
            <Button
              type="submit"
              sx={{ width: { xs: "80%", md: "50%" } }}
              variant="contained"
            >
              Login
            </Button>
          </Box>
          <Divider
            sx={{ width: { xs: "80%", md: "50%" }, margin: "12px auto" }}
          >
            <Chip label="or" />
          </Divider>
          <Typography
            color={"#666666"}
            fontSize={"12px"}
            textAlign={"center"}
            mx={"auto"}
            sx={{ width: { xs: "80%", md: "50%" } }}
          >
            Continue using the following:
          </Typography>
        </form>

        <Box my={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleLoginWithGoogle}
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
        <Typography sx={{ width: { xs: "80%", md: "50%" } }} mx={"auto"}>
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
