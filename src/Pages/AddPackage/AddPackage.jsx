import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";
import { useState } from "react";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const details = form.details.value;
    const price = form.price.value;
    const packageInfo = { name, photoURL, details, price, type };

    const res = axiosSecure.post("/addPackage", packageInfo);
    res
      .then((res) => {
        swal("Success!", "You Are Successfully Added this package", "success");
        form.reset();
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });

    console.log(name, photoURL, details, price);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth>
          <InputLabel id="select-label">Select a Type</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={type}
            label="Select an Option"
            onChange={handleChange}
          >
            <MenuItem value="cultural">Cultural</MenuItem>
            <MenuItem value="adventure">Adventure</MenuItem>
            <MenuItem value="walking">Walking</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="PhotoURL"
          name="photoURL"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />

        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />

        <TextField
          label="Details"
          name="details"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Add Package
        </Button>
      </form>
    </Grid>
  );
};

export default AddPackage;
