import { Grid } from "@mui/material";
import SectionTitle from "../../../Hooks/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OverView from "../../../Components/OverView/OverView";

const TourismTravelGuide = () => {
  return (
    <Grid textAlign={"center"} my={10}>
      <SectionTitle title={"Tourism and Travel Guide"}></SectionTitle>
      <Tabs>
        <Grid fontSize={{ xs: "12px", md: "16px" }}>
          <TabList>
            <Tab>OverView</Tab>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>
        </Grid>

        <TabPanel>
          <OverView></OverView>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </Grid>
  );
};

export default TourismTravelGuide;
