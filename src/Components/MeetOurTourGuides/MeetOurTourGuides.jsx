/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HashLoader } from "react-spinners";

const MeetOurTourGuides = ({ guide }) => {
  console.log(guide);
  if (!guide) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }
  return (
    <Card sx={{ maxWidth: 345, textAlign: "left", margin: "20px 10px" }}>
      <CardMedia
        component="img"
        sx={{
          borderRadius: "100%",
          width: "150px",
          margin: "auto",
          display: "block",
          paddingBottom: "10px",
          paddingTop: "20px",
        }}
        image={guide.photo}
        alt="User Profile"
      />
      <CardContent>
        <Typography color={"#e65728"} fontWeight={600} mt={1}>
          Position: {guide.role === "guide" ? "Guide" : ""}
        </Typography>
        <Typography color={"#e65728"} fontWeight={600} mt={1}>
          Name: {guide.name}
        </Typography>
        <Typography mt={2} variant="body2" color="#666666">
          Email: {guide.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item>
            <Button
              component={RouterLink}
              to={`/guideDetails/${guide._id}`}
              variant="contained"
              sx={{ backgroundColor: "#e65728", color: "#ffffff" }}
            >
              Guide Details
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MeetOurTourGuides;
