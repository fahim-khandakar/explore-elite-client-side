import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import {
  Button,
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

const TouristBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["bookingsData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/?email=${user?.email}`);
      return res.data;
    },
  });

  function createData(packageName, guideName, date, price, status, id) {
    return { packageName, guideName, date, price, status, id };
  }

  const rows =
    !isLoading &&
    bookingsData.map((booking) =>
      createData(
        booking.packageName,
        booking.guide.name,
        booking.date,
        booking.price,
        booking.status
      )
    );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package Name</TableCell>
            <TableCell>Guide Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
            {!isLoading &&
              rows.map((row, index) =>
                row.status === "review" ? (
                  <TableCell key={index} align="right">
                    Action
                  </TableCell>
                ) : (
                  ""
                )
              )}
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            rows?.map((row) => (
              <TableRow
                key={row.id}
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
                      component={RouterLink}
                      to={`/guideDetails/${row.id}`}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
                <TableCell align="right">
                  <Button
                    disabled={row.status === "accepted"}
                    component={RouterLink}
                    to={`/guideDetails/${row.id}`}
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
