import { Button, Grid, Paper, Typography } from "@mui/material";
import logo from "../../../public/logo-no-background.png"; // Replace with the actual path to your logo
import { Link } from "react-router-dom";

const Footer = () => {
  const login = true;
  const footerLinks = [
    "Home",
    "Community",
    "Blogs",
    "About Us",
    "Contact Us",
    ...(login ? ["Login"] : []),
    ...(login ? ["Register"] : []),
  ];

  return (
    <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} sm={6} md={4} textAlign="center">
          {/* Your Logo */}
          <img
            src={logo}
            alt="Explore Elite"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {footerLinks.map((link, index) => (
              <Grid item key={index}>
                <Button
                  key={index}
                  component={Link}
                  to={
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  sx={{
                    my: 2,
                    color: "#666666",
                    display: "block",
                    "&:hover": { color: "#e65728" },
                  }}
                >
                  {link}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="#666666" align="center">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
