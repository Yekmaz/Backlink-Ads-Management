import {
  Box,
  Button,
  TextField,
  Stack,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";
import { useHttpClient } from "../hooks/http-hook";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { sendRequest } = useHttpClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (inputs) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/users/changepass/${auth.userData.userId}`,
        "POST",
        JSON.stringify({
          oldPassword: inputs.oldPassword,
          newPassword: inputs.newPassword,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      enqueueSnackbar(responseData, { variant: "success" });
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar("An error has occurred. Please try again", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="90vh"
        flexDirection="column"
      >
        <Container
          component={Paper}
          sx={{
            width: "40ch",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingY: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5">Change password</Typography>

              <Controller
                name="oldPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Old password requiered" }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={!!errors.oldPassword}
                    type="password"
                    label="Old password"
                    variant="outlined"
                    value={value}
                    autoComplete="current-password"
                    onChange={onChange}
                    helperText={
                      errors.oldPassword ? "Enter old password" : null
                    }
                    margin="dense"
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Enter password" }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={!!errors.newPassword}
                    type="password"
                    label="New password"
                    variant="outlined"
                    value={value}
                    autoComplete="new-password"
                    onChange={onChange}
                    helperText={
                      errors.newPassword ? "Enter new password" : null
                    }
                    margin="dense"
                  />
                )}
              />
              <Controller
                name="repeatNewPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Enter new password repeat",
                  validate: (value) => {
                    const { newPassword } = getValues();
                    return newPassword === value;
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={!!errors.repeatNewPassword}
                    type="password"
                    label="New password repeat"
                    variant="outlined"
                    value={value}
                    autoComplete="new-password"
                    onChange={onChange}
                    helperText={
                      errors.repeatNewPassword
                        ? "Passwords doesn`t match"
                        : null
                    }
                    margin="dense"
                  />
                )}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  color="error"
                  type="submit"
                  variant="contained"
                  sx={{ width: "20ch" }}
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ width: "20ch" }}
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Container>
      </Box>
    </>
  );
}
