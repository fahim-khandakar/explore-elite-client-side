import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import swal from "sweetalert";
import { HashLoader } from "react-spinners";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import useBookingsData from "../../Hooks/useBookingsData";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const TouristBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { bookingsData, isBookingsLoading, refetch } = useBookingsData();
  const { width, height } = useWindowSize();

  const [discountSwalShown, setDiscountSwalShown] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const filter = bookingsData?.filter((booked) => booked.status !== "rejected");

  useEffect(() => {
    if (filter?.length === 4 && !isBookingsLoading) {
      swal(
        "Congratulations!",
        "You get 20% discount for your 3 times bookings.",
        "success"
      );

      // Set discountSwalShown to true
      setDiscountSwalShown(true);

      // Set Confetti to visible
      setConfettiVisible(true);

      // Hide the swal message after 3 seconds
      const timeoutId = setTimeout(() => {
        setDiscountSwalShown(false);
        setConfettiVisible(false); // Hide Confetti after 3 seconds
      }, 3000);

      // Clear the timeout on component unmount or when bookingsData changes
      return () => clearTimeout(timeoutId);
    }
  }, [filter?.length, isBookingsLoading]);

  function createData(packageName, guideName, date, price, status, id) {
    return { packageName, guideName, date, price, status, id };
  }

  const rows =
    !isBookingsLoading &&
    bookingsData?.map((booking) =>
      createData(
        booking.packageName,
        booking.guide.name,
        booking.date,
        booking.price,
        booking.status,
        booking._id
      )
    );

  const handleCancel = (id) => {
    axiosSecure
      .put(`/bookingCancel/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("success", "The Booking was successfully canceled", "success");
          refetch();
        }
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");
      });
  };

  if (isBookingsLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Explore Elite | Bookings</title>
      </Helmet>
      {confettiVisible && discountSwalShown && filter?.length === 4 && (
        <Confetti width={width} height={height} />
      )}

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package Name</TableCell>
            <TableCell>Guide Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>

            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isBookingsLoading &&
            rows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.packageName}</TableCell>
                <TableCell component="th" scope="row">
                  {row.guideName}
                </TableCell>
                <TableCell align="right">
                  {format(new Date(row.date), "yyyy-MM-dd")}
                </TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.status}</TableCell>

                {row.status === "review" ? (
                  <TableCell align="right">
                    <Button
                      onClick={() => handleCancel(row.id)}
                      variant="contained"
                    >
                      {row.status === "rejected" ? "Rejected" : "Cancel"}
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    <Button
                      disabled
                      // onClick={() => handleCancel(row.id)}
                      variant="contained"
                    >
                      {row.status === "rejected" ? "Rejected" : "Cancel"}
                    </Button>
                  </TableCell>
                )}
                <TableCell align="right">
                  <Button
                    disabled={filter?.length <= 3 || row.status === "rejected"}
                    variant="contained"
                  >
                    Apply
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    disabled={row.status !== "accepted"}
                    component={RouterLink}
                    to={`/guideDetails/${row.id}`}
                    variant="contained"
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TouristBookings;
