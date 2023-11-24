import { Outlet } from "react-router-dom";
import Navbar from "../Shared/NavBar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
  // const location = useLocation();

  // const noHeaderFooter =
  //   location.pathname.includes("/login") ||
  //   location.pathname.includes("/register");
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
