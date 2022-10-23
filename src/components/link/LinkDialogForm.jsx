import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";

export default function LinkDialogForm({
  editValue,
  onSubmit,
  cancelHandler,
  open,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("title", editValue.title);
    setValue("url", editValue.url);
    setValue("enabled", editValue.enabled);
  }, [setValue, editValue]);

  return (
    <Dialog open={open} onClose={cancelHandler}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {editValue.title === "" ? "Add" : "Edit"} link
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the following information</DialogContentText>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                error={!!errors.title}
                type="text"
                label="Title"
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={errors.title ? "Please enter title" : null}
                margin="dense"
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            defaultValue=""
            rules={{ required: "URL required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                error={!!errors.url}
                type="url"
                label="URL address"
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={errors.url ? "Please enter URL Address" : null}
                margin="dense"
              />
            )}
          />

          <Controller
            name="enabled"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                label="Enabled"
                control={
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                  />
                }
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" color="error" fullWidth>
            {editValue.title === "" ? "Register" : "Save"}
          </Button>
          <Button onClick={cancelHandler} variant="contained" fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
