/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const [startDate, setStartDate] = useState(new Date());

  const axiosSecure = useAxiosSecure();

  const { user, loading } = useContext(AuthContext);

  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const place = form.place.value;
    const story = form.story.value;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const photo = user?.photoURL;

    const storyInfo = {
      place,
      story,
      type,
      userName,
      userEmail,
      startDate,
      photo,
    };

    const res = axiosSecure.post("/addStory", storyInfo);
    res
      .then((res) => {
        swal("Success!", "You Are Successfully Added Your Story", "success");
        form.reset();
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });

    console.log(storyInfo);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }
  return (
    <Grid>
      <Helmet>
        <title>Explore Elite | Profile</title>
      </Helmet>
      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ maxWidth: 545, gap: "50px", marginBottom: "30px" }}>
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
              image={user.photoURL}
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
                {user.displayName}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                textAlign="center"
                component="div"
                sx={{ paddingBottom: "10px" }}
              >
                Email: {user.email}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                As a charismatic travel guide, {user.displayName} becomes your
                gateway to unforgettable adventures. Fueled by a passion for
                storytelling and armed with profound knowledge of local
                cultures, she effortlessly turns each journey into a
                personalized and enchanting experience. {user.displayName}'s
                boundless enthusiasm and expertise redefine exploration,
                transcending it from a mere tour to a captivating narrative that
                leaves a lasting imprint on your memories. Embark on a journey
                with {user.displayName} to uncover hidden gems and craft moments
                that go beyond the ordinary.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Grid>
          <Grid>
            <SectionTitle title={"Share Your Story With Us"}></SectionTitle>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Place"
                name="place"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />

              <FormControl fullWidth>
                <InputLabel id="select-label">Select a Type</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={type}
                  label="Select an Option"
                  onChange={handleChange}
                >
                  <MenuItem value="cultural">Cultural</MenuItem>
                  <MenuItem value="adventure">Adventure</MenuItem>
                  <MenuItem value="walking">Walking</MenuItem>
                  <MenuItem value="urban">Urban</MenuItem>
                  <MenuItem value="nature">Nature</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Write Your Story"
                variant="outlined"
                name="story"
                fullWidth
                multiline
                rows={4}
                required
              />

              <Grid width={"100%"} my={2}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Grid>

              <Button type="submit" variant="contained" color="primary">
                Add Story
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
