import { Container, Grid, Paper, Typography } from "@mui/material";
import { Outlet, NavLink as RouterLink } from "react-router-dom";
import "./Dashboard.css";
import useGuide from "../../Hooks/useGuide";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const { isGuide, isGuideLoading } = useGuide();
  const { isAdmin, isAdminLoading } = useAdmin();
  return (
    <Container maxWidth="xl">
      <Grid sx={{ display: "flex", gap: "40px", my: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: "250px",
            minHeight: "100vh",
          }}
        >
          {!isGuideLoading && isGuide ? (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "15px",
              }}
            >
              <Typography variant="h6">Dashboard Menu</Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/profile`}
                sx={{
                  textDecoration: "none",

                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Profile
              </Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/guideAssignTours`}
                sx={{
                  textDecoration: "none",
                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Assign Tours
              </Typography>
            </Grid>
          ) : !isAdminLoading && isAdmin ? (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "15px",
              }}
            >
              <Typography variant="h6">Dashboard Menu</Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/profile`}
                sx={{
                  textDecoration: "none",

                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Profile
              </Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/addPackage`}
                sx={{
                  textDecoration: "none",
                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                Add Package
              </Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/manageUsers`}
                sx={{
                  textDecoration: "none",
                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                Manage Users
              </Typography>
            </Grid>
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "15px",
              }}
            >
              <Typography variant="h6">Dashboard Menu</Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/profile`}
                sx={{
                  textDecoration: "none",

                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Profile
              </Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/touristBookings`}
                sx={{
                  textDecoration: "none",
                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Bookings
              </Typography>
              <Typography
                component={RouterLink}
                to={`/dashboard/touristWishlist`}
                sx={{
                  textDecoration: "none",
                  color: "#666666",
                  "&:hover": { color: "#e65728" },
                }}
              >
                My Wishlist
              </Typography>
            </Grid>
          )}
        </Paper>
        <Grid sx={{ flex: 1 }}>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
