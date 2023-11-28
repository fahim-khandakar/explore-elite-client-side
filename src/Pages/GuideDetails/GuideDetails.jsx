/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";

const GuideDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = userAxiosPublic();
  const { data: guideDetails, isLoading } = useQuery({
    queryKey: ["guideDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/guideDetails/${id}`);
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const form = e.target;
    const comment = form.comment.value;
    const rating = form.rating.value;
    console.log(comment, rating);
    swal("Success", "Thanks for your feedback", "success");
    form.reset();
  };
  return (
    <Container maxWidth={"lg"}>
      {!isLoading && guideDetails && (
        <Grid display={"flex"} justifyContent={"center"} alignItems={"start"}>
          <Grid container mt={2} height="100vh">
            <Card sx={{ maxWidth: 545, gap: "50px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: "50%",
                    width: "100px",
                    margin: "auto",
                    display: "block",
                    paddingBottom: "10px",
                    paddingTop: "20px",
                  }}
                  image={guideDetails.photo}
                  alt="User Profile"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    textAlign="center"
                    component="div"
                    sx={{ paddingBottom: "10px" }}
                  >
                    {guideDetails.role === "guide" ? "Guide" : ""}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h5"
                    textAlign="center"
                    component="div"
                    sx={{ paddingBottom: "10px" }}
                  >
                    {guideDetails.name}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h6"
                    textAlign="center"
                    component="div"
                    sx={{ paddingBottom: "10px" }}
                  >
                    Email: {guideDetails.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    As a charismatic travel guide, {guideDetails.name} becomes
                    your gateway to unforgettable adventures. Fueled by a
                    passion for storytelling and armed with profound knowledge
                    of local cultures, she effortlessly turns each journey into
                    a personalized and enchanting experience.{" "}
                    {guideDetails.name}'s boundless enthusiasm and expertise
                    redefine exploration, transcending it from a mere tour to a
                    captivating narrative that leaves a lasting imprint on your
                    memories. Embark on a journey with {guideDetails.name} to
                    uncover hidden gems and craft moments that go beyond the
                    ordinary.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid mt={5}>
            <Typography fontSize={20} color={"#e65728"} fontWeight={700}>
              Please Comment Here About Guide
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Comment"
                name="comment"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Rating"
                name="rating"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                required
              />

              <Button
                disabled={user ? false : true}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default GuideDetails;
