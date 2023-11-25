import { Button, Grid, Stack, Typography } from "@mui/material";
import { useLottie } from "lottie-react";
import animation from "../../../assets/Animation - 1700892926443.json";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const Banner = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      mt={5}
    >
      <Grid width={{ xs: 1, md: 1 / 2 }}>
        <Typography
          fontSize={{ xs: 25, md: 70 }}
          fontWeight={800}
          color={"#c83d86"}
          lineHeight={{ xs: 1.5, md: 1 }}
        >
          Explore The <br /> World With <br />
          <Typography
            fontSize={{ xs: 25, md: 70 }}
            fontWeight={800}
            color={"#e65728"}
            lineHeight={{ xs: 1.5, md: 1.2 }}
            pb={2}
          >
            Explore Elite
          </Typography>
        </Typography>
        <Typography
          className="mt-5 text-[#482551] font-semibold"
          color={"#666666"}
          fontWeight={700}
          pb={3}
        >
          Welcome to Explore Elite, where every trip is an exhilarating odyssey
          waiting to unfold. Whether you seek adrenaline-pumping escapades or
          serene escapes, our expertly crafted adventures cater to all types of
          travelers. Explore the world with confidence, guided by our passionate
          team of adventurers. Your next unforgettable journey begins here, at
          Explore Elite.
        </Typography>

        <Button
          variant="contained"
          sx={{ gap: "8px", fontWeight: "700" }}
          component={Link}
          to={`/register`}
        >
          Register Now <AiOutlineArrowRight></AiOutlineArrowRight>
        </Button>
      </Grid>
      <Grid width={{ xs: 1, md: 1 / 2 }}>{View}</Grid>
    </Stack>
  );
};

export default Banner;
