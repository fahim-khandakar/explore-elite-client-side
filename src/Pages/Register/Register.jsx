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
import { FcGoogle } from "react-icons/fc";
import { useLottie } from "lottie-react";
import animation from "../../assets/Animation - 1700828682050.json";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  // handle submit functionality
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (password.length < 6) {
      return swal(
        "Error!",
        "Password should be at least 6 characters!",
        "error"
      );
    } else if (!/[A-Z]/.test(password)) {
      return swal("Error!", "Password must have a capital letter!", "error");
    } else if (!/[^a-zA-Z0-9\s]/.test(password)) {
      return swal("Error!", "Password must have a special character!", "error");
    }

    createUser(email, password, name, photoURL)
      .then((result) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            navigate(location?.state ? location.state : "/");
          })
          .catch();
        console.log(result);
        swal("Success!", "Successfully Account Created", "success");
        e.target.reset();
      })
      .catch((error) => {
        swal("Error!", error.message, "error");
      });
  };

  const handleLoginWithGoogle = () => {
    googleSignIn()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        swal("Success!", "Successfully Account Created", "success");
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
      // alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Helmet>
        <title>Explore Elite || Register</title>
      </Helmet>
      <Grid width={{ xs: 1, md: 1 / 2 }}>{View}</Grid>
      <Grid width={{ xs: 1, md: 1 / 2 }}>
        <Typography
          variant="h5"
          mt={3}
          fontWeight={700}
          color={"#e65728"}
          width={{ xs: "80%", md: "50%" }}
          mx={"auto"}
          textAlign={"center"}
        >
          Welcome to Explore Elite!
        </Typography>
        <Typography
          // variant="contained"
          color={"#666666"}
          my={1}
          width={{ xs: "80%", md: "50%" }}
          mx={"auto"}
          textAlign={"center"}
        >
          Sign up now to join our community of travellers and explorers
        </Typography>

        <form onSubmit={handleRegistration}>
          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              name="name"
              sx={{ width: { xs: "80%", md: "50%" } }}
              label="Name"
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
            <TextField
              required
              name="photoURL"
              sx={{ width: { xs: "80%", md: "50%" } }}
              label="Photo URL"
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
              Register
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
            // variant="contained"
            onClick={handleLoginWithGoogle}
            sx={{
              width: { xs: "80%", md: "50%" },
              gap: "15px",
              fontSize: "14px",
              border: "1px solid #666666",
            }}
          >
            <FcGoogle></FcGoogle> Google
          </Button>
        </Box>
        <Typography sx={{ width: { xs: "80%", md: "50%" } }} mx={"auto"}>
          Already have an account?{" "}
          <Button component={Link} to={"/login"}>
            Please Login
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
