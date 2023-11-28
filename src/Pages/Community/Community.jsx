import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const Community = () => {
  const axiosSecure = useAxiosSecure();
  const { data: community = [], isLoading } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }

  return (
    <Grid>
      <Helmet>
        <title>Explore Elite | Community</title>
      </Helmet>
      <SectionTitle title={"Our Community"}></SectionTitle>
      <Grid container spacing={2} maxWidth="lg" margin="auto">
        {!isLoading &&
          community.length > 0 &&
          community.map((user, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ textAlign: "left" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={user && user?.photo ? user.photo : ""}
                  alt=""
                />

                <CardContent>
                  <Typography
                    color="#666666"
                    sx={{ fontSize: "1rem", marginBottom: "8px" }}
                  >
                    Email: {user.email}
                  </Typography>
                  <Typography
                    color="#e65728"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Name: {user.name}
                  </Typography>

                  <Typography color="#e65728" fontWeight={600} mt={3}>
                    Role:{" "}
                    {user.role === "tourist"
                      ? "Tourist"
                      : user.role === "guide"
                      ? "Guide"
                      : "Admin"}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to={`/guideDetails/${user._id}`}
                        variant="contained"
                        sx={{ backgroundColor: "#e65728", color: "#ffffff" }}
                      >
                        Details
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Community;
