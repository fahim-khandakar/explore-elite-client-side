import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../LayOut/Dashboard/Dashboard";
// import TouristProfile from "../Pages/TouristProfile/TouristProfile";
import TouristBookings from "../Pages/TouristBookings/TouristBookings";
import TouristWishlist from "../Pages/TouristWishlist/TouristWishlist";
import GuideAssignTour from "../Pages/GuideAssignTours/GuideAssignTour";
// import GuideProfile from "../Pages/GuideProfile/GuideProfile";
// import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AddPackage from "../Pages/AddPackage/AddPackage";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllPackages from "../Pages/AllPackages/AllPackages";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import GuideDetails from "../Pages/GuideDetails/GuideDetails";
import ShowByType from "../Pages/ShowByType/ShowByType";
import StoryDetails from "../Pages/StoryDetails/StoryDetails";
import AllStories from "../Pages/AllStories/AllStories";
import Profile from "../Pages/Profile/Profile";
import Community from "../Pages/Community/Community";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allPackages",
        element: <AllPackages></AllPackages>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/packageDetails/:id",
        element: <PackageDetails></PackageDetails>,
      },
      {
        path: "/guideDetails/:id",
        element: <GuideDetails></GuideDetails>,
      },
      {
        path: "/type/:type",
        element: <ShowByType></ShowByType>,
      },
      {
        path: "/storyDetails/:id",
        element: <StoryDetails></StoryDetails>,
      },
      {
        path: "/blogs",
        element: <AllStories></AllStories>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          // {
          //   path: "touristProfile",
          //   element: <TouristProfile></TouristProfile>,
          // },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "touristBookings",
            element: <TouristBookings></TouristBookings>,
          },
          {
            path: "touristWishlist",
            element: <TouristWishlist></TouristWishlist>,
          },
          {
            path: "guideAssignTours",
            element: <GuideAssignTour></GuideAssignTour>,
          },
          // {
          //   path: "guideProfile",
          //   element: <GuideProfile></GuideProfile>,
          // },
          // admin route
          // {
          //   path: "adminProfile",
          //   element: <AdminProfile></AdminProfile>,
          // },
          {
            path: "addPackage",
            element: <AddPackage></AddPackage>,
          },
          {
            path: "manageUsers",
            element: <ManageUsers></ManageUsers>,
          },
        ],
      },
    ],
  },
]);
