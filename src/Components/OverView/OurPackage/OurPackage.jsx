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
import swal from "sweetalert";
import { AuthContext } from "../../../Providers/AuthProvider";
import { HashLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const OurPackage = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
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
    user: user?.email,
    userName: user?.displayName,
    id: item?._id,
  };

  if (!item && !user) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }

  const handleFavoriteClick = async () => {
    axiosSecure
      .post("/addWish", wish)
      .then(() => {
        swal("success", "Successfully added you wish", "success");
        setOpen(true);
      })
      .catch((err) => {
        swal("error", `${err.message}`, "error");
        setOpen(false);
      });
    setIsFavorite(!isFavorite);
  };
  return (
    <Grid>
      <Card
        sx={{
          maxWidth: 345,
          textAlign: "left",
          margin: "20px 10px",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={item && item?.photoURL ? item.photoURL : ""}
          alt=""
        />

        <CardContent>
          <Typography
            color={"#666666"}
            sx={{ fontSize: "1rem", marginBottom: "8px" }}
          >
            Tour Type: {item.type}
          </Typography>
          <Typography
            color={"#e65728"}
            sx={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "8px" }}
          >
            Place: {item.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: "clamp(80px, 10vw, 200px)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
            }}
          >
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
                disabled={open}
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
    </Grid>
  );
};

export default OurPackage;
