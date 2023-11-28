import { Container, Paper, TextField, Button, Grid } from "@mui/material";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container sx={{ mt: 1 }}>
      <Helmet>
        <title>Explore Elite | Contact Us</title>
      </Helmet>
      <Paper elevation={10} sx={{ p: 5, mt: 2, maxWidth: 600, margin: "auto" }}>
        <SectionTitle title={"Contact Us"}></SectionTitle>

        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={user ? false : true}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactUs;
