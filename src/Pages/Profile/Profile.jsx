import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) {
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };
  console.log(user);
  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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
      </Grid>
      <Grid mt={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Profile;
