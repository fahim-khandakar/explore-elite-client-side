import { Grid, Typography } from "@mui/material";
import SectionTitle from "../../../Hooks/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OverView from "../../../Components/OverView/OverView";
import OurPackage from "../../../Components/OverView/OurPackage/OurPackage";
import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MeetOurTourGuides from "../../../Components/MeetOurTourGuides/MeetOurTourGuides";
import { HashLoader } from "react-spinners";

const TourismTravelGuide = () => {
  const axiosPublic = userAxiosPublic();

  const axiosSecure = useAxiosSecure();
  const {
    data: guides = [],
    isLoading: isUsersLoading,
    // refetch,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/guide");
      return res.data;
    },
  });
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
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
          <Typography
            sx={{
              textAlign: "center",
              color: "#e65728",
              variant: "h4",
              fontWeight: 600,
              my: [3, 4, 5],
              fontSize: ["1.2rem", "1.5rem", "2rem"], // Responsive font size
            }}
          >
            Our Most Valuable Packages
          </Typography>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            {!isLoading &&
              packages.slice(0, 3).map((item, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <OurPackage item={item}></OurPackage>
                </Grid>
              ))}
            <Button
              component={RouterLink}
              to="/allPackages"
              variant="contained"
              sx={{
                backgroundColor: "#e65728",
                color: "#ffffff",
                marginTop: "20px",
              }}
            >
              Show All
            </Button>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Typography
            sx={{
              textAlign: "center",
              color: "#e65728",
              variant: "h4",
              fontWeight: 600,
              my: [3, 4, 5],
              fontSize: ["1.2rem", "1.5rem", "2rem"], // Responsive font size
            }}
          >
            Our Guides
          </Typography>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            {!isUsersLoading &&
              guides.map((guide, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <MeetOurTourGuides guide={guide}></MeetOurTourGuides>
                </Grid>
              ))}
            {/* <Button
              component={RouterLink}
              to="/allPackages"
              variant="contained"
              sx={{
                backgroundColor: "#e65728",
                color: "#ffffff",
                marginTop: "20px",
              }}
            >
              Show All
            </Button> */}
          </Grid>
        </TabPanel>
      </Tabs>
    </Grid>
  );
};

export default TourismTravelGuide;
