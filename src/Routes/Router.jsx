import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../LayOut/Dashboard/Dashboard";
import TouristProfile from "../Pages/TouristProfile/TouristProfile";
import TouristBookings from "../Pages/TouristBookings/TouristBookings";
import TouristWishlist from "../Pages/TouristWishlist/TouristWishlist";
import GuideAssignTour from "../Pages/GuideAssignTours/GuideAssignTour";
import GuideProfile from "../Pages/GuideProfile/GuideProfile";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AddPackage from "../Pages/AddPackage/AddPackage";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

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
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "touristProfile",
            element: <TouristProfile></TouristProfile>,
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
          {
            path: "guideProfile",
            element: <GuideProfile></GuideProfile>,
          },
          // admin route
          {
            path: "adminProfile",
            element: <AdminProfile></AdminProfile>,
          },
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
