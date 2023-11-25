/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import animation from "../../assets/Animation - 1699122041602.json";
import { Helmet } from "react-helmet-async";
import { Button, Grid } from "@mui/material";

const ErrorPage = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <div>
      <Helmet>
        <title>Explore Elite | Error</title>
      </Helmet>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          height: screen,
        }}
      >
        {View}
        <Link to="/">
          <Button variant="contained">Back To Home</Button>
        </Link>
      </Grid>
    </div>
  );
};

export default ErrorPage;
