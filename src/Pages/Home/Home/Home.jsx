import { Container } from "@mui/material";
import Banner from "../Banner/Banner";
import TourismTravelGuide from "../TourismTravelGuide/TourismTravelGuide";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Banner></Banner>
      <TourismTravelGuide></TourismTravelGuide>
    </Container>
  );
};

export default Home;
