import { Button, Grid, TextField } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURl = form.photoURL.value;
    const details = form.details.value;
    const price = form.price.value;
    const packageInfo = { name, photoURl, details, price };

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

    console.log(name, photoURl, details, price);
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
