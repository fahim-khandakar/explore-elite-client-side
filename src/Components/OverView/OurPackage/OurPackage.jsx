/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import swal from "sweetalert";
import { AuthContext } from "../../../Providers/AuthProvider";

const OurPackage = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const wish = {
    name: item.name,
    date: item.date,
    price: item.price,
    type: item.type,
    photoURL: item.photoURL,
    day1: item.day1,
    day2: item.day2,
    day3: item.day3,
    user: user.email,
    userName: user.displayName,
  };

  if (!item && !user) {
    return;
  }
  const handleFavoriteClick = async () => {
    axiosSecure
      .post("/addWish", wish)
      .then(() => {
        swal("success", "Successfully added you wish", "success");
      })
      .catch((err) => {
        swal("success", `${err.message}`, "success");
      });
    setIsFavorite(!isFavorite);
  };
  return (
    <Card sx={{ maxWidth: 345, textAlign: "left", margin: "20px 10px" }}>
      <Typography
        sx={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "8px" }}
      >
        Tour Type: {item.type}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem", marginBottom: "4px" }}>
        Place: {item.name}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={item && item?.photoURL ? item.photoURL : ""}
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.details}
        </Typography>
        <Typography color={"#e65728"} fontWeight={600} mt={3}>
          Price: ${item.price}
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
            <IconButton
              aria-label="add to favorites"
              onClick={handleFavoriteClick}
              style={{ color: isFavorite ? "red" : "default" }}
            >
              <FavoriteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              component={RouterLink}
              to={`/packageDetails/${item?._id}`}
              variant="contained"
              sx={{ backgroundColor: "#e65728", color: "#ffffff" }}
            >
              View Package
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default OurPackage;
