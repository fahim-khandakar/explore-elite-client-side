/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Helmet>
        <title>Explore Elite | About Us</title>
      </Helmet>
      <SectionTitle title={"About Explore Elite"}></SectionTitle>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Welcome to Explore Elite, your premier destination for unique and
          unforgettable travel experiences. We are passionate about providing
          you with the best travel guides who will make your journey
          extraordinary.
        </Typography>

        <Typography variant="body1" paragraph>
          Our mission is to connect travelers with knowledgeable and experienced
          guides who can turn every trip into a memorable adventure. Whether
          you're a solo traveler, a couple seeking a romantic getaway, or a
          group of friends on a thrilling expedition, Explore Elite has the
          perfect guide for you.
        </Typography>

        <Typography variant="body1">
          At Explore Elite, we believe in creating personalized and tailor-made
          experiences. Our guides are carefully selected and are experts in
          their respective fields. They are not just guides; they are
          storytellers, historians, and companions on your journey.
        </Typography>
      </Paper>

      <SectionTitle title={"Meet Our Team"}></SectionTitle>
      <Grid my={3} container justifyContent={"center"} spacing={3}>
        {/* Add stylish cards for team members */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <Grid display={"flex"} justifyContent={"center"}>
              <CardMedia
                sx={{ borderRadius: "50%", width: "200px", height: "200px" }}
                component="img"
                image="https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/405729805_1061669741629000_4717981073382564289_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EYH5OWh2mGoAX_nHODV&_nc_ht=scontent.fdac20-1.fna&oh=00_AfCggBJEPePRC-qzOFtZuqX9MAObOd6MBO3ysSYjI7bxFQ&oe=656B9656"
                alt="Team Member"
              />
            </Grid>
            <CardContent>
              <Typography variant="h6" fontWeight={800} color={"#e65728"}>
                Zubayer Hossain Price
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                Managing Director
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color={"#666666"}>
                Meet our visionary Managing Director, John Doe, the driving
                force behind Explore Elite's commitment to delivering
                unparalleled travel experiences. With a passion for adventure
                and a keen eye for selecting the finest guides, John ensures
                that every journey with Explore Elite is a journey of a
                lifetime.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <Grid display={"flex"} justifyContent={"center"}>
              <CardMedia
                sx={{ borderRadius: "50%", width: "200px", height: "200px" }}
                component="img"
                height="200"
                image="https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/335722718_1055726432458716_8383668068014780513_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DRJVIhXHJnIAX9ptBBg&_nc_ht=scontent.fdac20-1.fna&oh=00_AfAzvhB_lF6W_avvERnoG_BJYpfVOitEIVh10MUflSXEqw&oe=656A4C88"
                alt="Team Member"
              />
            </Grid>
            <CardContent>
              <Typography variant="h6" fontWeight={800} color={"#e65728"}>
                Fahim Khandakar
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                Founder & CEO
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color={"#666666"}>
                Meet our visionary Founder and CEO, Jane Smith, the driving
                force behind Explore Elite's commitment to delivering
                unparalleled travel experiences. With a passion for adventure
                and a keen eye for selecting the finest guides, Jane ensures
                that every journey with Explore Elite is a journey of a
                lifetime.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <Grid display={"flex"} justifyContent={"center"}>
              <CardMedia
                sx={{ borderRadius: "50%", width: "200px", height: "200px" }}
                component="img"
                height="200"
                image="https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-1/377885944_1681563399009710_4892096977308786069_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Aai40CLfO7wAX8cnRRL&_nc_ht=scontent.fdac20-1.fna&oh=00_AfCAf2Df-48f76GvcF4Y9z1Ldb6-xkce5c7OOjqlTWV8FQ&oe=656A815D"
                alt="Team Member"
              />
            </Grid>
            <CardContent>
              <Typography fontWeight={800} variant="h6" color={"#e65728"}>
                Mehedi Hasan
              </Typography>
              <Typography fontWeight={700} variant="body2">
                Specialist Of Marketing
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color={"#666666"}>
                Meet our innovative Marketing Director, Alex Johnson, the
                creative mind behind Explore Elite's compelling brand presence.
                With a flair for storytelling and strategic marketing, Alex
                ensures that the spirit of exploration and adventure is
                effectively communicated to our audience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more Card items for additional team members */}
      </Grid>

      <Grid display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to={"/contact-us"}
          // sx={{ display: "block", margin: "auto" }}
          // Add a link to contact page or other relevant page
        >
          Contact Us
        </Button>
      </Grid>
    </Container>
  );
};

export default AboutUs;
