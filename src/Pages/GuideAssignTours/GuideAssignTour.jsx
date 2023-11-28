import { useQuery } from "@tanstack/react-query";
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
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { format } from "date-fns";
import swal from "sweetalert";
import useBookingsData from "../../Hooks/useBookingsData";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const GuideAssignTour = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useBookingsData();

  const { user, loading } = useContext(AuthContext);
  const {
    data: assignTours = [],
    isLoading,
    refetch: rejectRefetch,
  } = useQuery({
    queryKey: ["assignTours", user],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignTours/?email=${user?.email}`);
      return res.data;
    },
  });

  const handleReject = (rejectId) => {
    axiosSecure
      .put(`/assignTourCancel/${rejectId}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("success", "The Booking was successfully canceled", "success");
          refetch();
          rejectRefetch();
        }
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");
      });
  };

  const handleAccept = (rejectId) => {
    axiosSecure
      .put(`/assignTourAccept/${rejectId}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("success", "The Booking was successfully accepted", "success");
          refetch();
          rejectRefetch();
        }
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");
      });
  };

  function createData(name, touristName, date, price, id, status) {
    return { name, touristName, date, price, id, status };
  }

  const rows = assignTours.map((booking) =>
    createData(
      booking.packageName,
      booking.name,
      booking.date,
      booking.price,
      booking._id,
      booking.status
    )
  );

  if (isLoading || loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Explore Elite | Assign Tours</title>
      </Helmet>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell component="th" scope="row">
                {row.touristName}
              </TableCell>
              <TableCell align="right">
                {format(new Date(row.date), "yyyy-MM-dd")}
              </TableCell>
              <TableCell align="right">${row.price}</TableCell>

              <TableCell align="right">
                <Button
                  onClick={() => handleReject(row.id)}
                  variant="contained"
                >
                  Reject
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => handleAccept(row.id)}
                  variant="contained"
                >
                  {row.status === "review" ? "Accept" : "Accepted"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GuideAssignTour;
