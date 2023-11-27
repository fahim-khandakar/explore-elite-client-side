import { useParams } from "react-router-dom";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import OurPackage from "../../Components/OverView/OurPackage/OurPackage";
import { Container } from "@mui/material";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";

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
    return;
  }
  console.log(dataByType);
  return (
    <Container maxWidth={"lg"}>
      <SectionTitle title={type.toUpperCase()}></SectionTitle>
      {!isLoading &&
        dataByType &&
        dataByType?.map((data, index) => (
          <OurPackage item={data} key={index}></OurPackage>
        ))}
    </Container>
  );
};

export default ShowByType;
