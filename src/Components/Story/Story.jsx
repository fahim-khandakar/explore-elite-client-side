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

const Story = () => {
  const axiosPublic = userAxiosPublic();

  const { data: allStoryData = [], isLoading } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allStory");
      return res.data;
    },
  });

  return (
    <Grid container spacing={2}>
      {!isLoading &&
        allStoryData.slice(0, 4).map((data, index) => (
          <Grid item xs={12} lg={6} key={index}>
            <Card
              sx={{ textDecoration: "none" }}
              component={RouterLink}
              to={`/storyDetails/${data._id}`}
            >
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

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.story.slice(0, 180)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Story;
