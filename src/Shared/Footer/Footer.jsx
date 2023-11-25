import { Container, Grid, Paper, Typography } from "@mui/material";
import logo from "../../assets/logo-no-background.png"; // Replace with the actual path to your logo
import twitLogo from "../../assets/twitter.png";
import instaLogo from "../../assets/insta.png";

const Footer = () => {
  return (
    <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
      <Container maxWidth={"lg"}>
        <Grid
          container
          py={7}
          textAlign={"left"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={"#666666"}
        >
          <Grid pb={{ xs: 5, sm: 0 }} item xs={10} sm={6} md={4}>
            {/* Your Logo */}
            <img
              src={logo}
              alt="Explore Elite"
              style={{ width: "80%", height: "auto" }}
            />
            <Typography variant="body2">
              Copyright © Explore Elite {new Date().getFullYear()}. All rights
              reserved.
            </Typography>
          </Grid>
          <Grid pb={{ xs: 5, sm: 0 }}>
            <Typography variant="h6" pb={2}>
              Address
            </Typography>
            <Typography>Address: Mirpur-1, Dhaka-1216.</Typography>
            <Typography>Email: fahimkhandakar01@gmai.com</Typography>
          </Grid>

          <Grid>
            <Typography variant="h6" pb={2}>
              Social
            </Typography>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <img style={{ width: "40px" }} src={instaLogo} alt="" />
              <img style={{ width: "40px" }} src={twitLogo} alt="" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
