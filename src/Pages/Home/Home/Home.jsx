import { Container, Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import TourismTravelGuide from "../TourismTravelGuide/TourismTravelGuide";
import { Helmet } from "react-helmet-async";
import CategoryType from "../CategoryType/CategoryType";
import SectionTitle from "../../../Hooks/SectionTitle/SectionTitle";
import Story from "../../../Components/Story/Story";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Explore Elite | Home</title>
      </Helmet>
      <Banner></Banner>
      <TourismTravelGuide></TourismTravelGuide>
      <Grid>
        <SectionTitle title={"Tour Type"}></SectionTitle>
        <CategoryType></CategoryType>
      </Grid>
      <SectionTitle title={"Our Client Story"}></SectionTitle>
      <Story></Story>
    </Container>
  );
};

export default Home;
