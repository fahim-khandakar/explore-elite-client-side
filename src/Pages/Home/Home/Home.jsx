import { Container } from "@mui/material";
import Banner from "../Banner/Banner";
import TourismTravelGuide from "../TourismTravelGuide/TourismTravelGuide";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Explore Elite | Home</title>
      </Helmet>
      <Banner></Banner>
      <TourismTravelGuide></TourismTravelGuide>
    </Container>
  );
};

export default Home;
