import { useParams } from "react-router-dom";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";

import OurPackage from "../../Components/OverView/OurPackage/OurPackage";
import { Container, Grid } from "@mui/material";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const ShowByType = () => {
  const { type } = useParams();
  const axiosPublic = userAxiosPublic();

  const { data: dataByType = [], isLoading } = useQuery({
    queryKey: ["type", type],
    queryFn: async () => {
      const res = await axiosPublic.get(`/byType/${type}`);
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
  console.log(dataByType);
  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Explore Elite | Category</title>
      </Helmet>
      <SectionTitle title={type.toUpperCase()}></SectionTitle>

      {!isLoading && dataByType && (
        <Grid container spacing={2}>
          {dataByType.map((data, index) => (
            <Grid key={index} item xs={12} md={4} lg={4}>
              <OurPackage item={data} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ShowByType;
