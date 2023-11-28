import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import { HashLoader } from "react-spinners";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Story = () => {
  const axiosPublic = userAxiosPublic();

  const { data: allStoryData = [], isLoading } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allStory");
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
    <Grid container spacing={2}>
      {!isLoading && (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {allStoryData.slice(0, 4).map((data, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} lg={12}>
                <Card
                  sx={{ textDecoration: "none" }}
                  component={RouterLink}
                  to={`/storyDetails/${data._id}`}
                >
                  <Grid display={"flex"} justifyContent={"center"}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={data.photo}
                          sx={{ bgcolor: red[500] }}
                          aria-label="recipe"
                        ></Avatar>
                      }
                      title={data.userName}
                      subheader={format(new Date(data.startDate), "yyyy-MM-dd")}
                    />
                  </Grid>

                  <CardContent
                    sx={{
                      textAlign: "center",
                      px: { lg: 20, xs: 10 },
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {data.story.slice(0, 180)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Grid>
  );
};

export default Story;
