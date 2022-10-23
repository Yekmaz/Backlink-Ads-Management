import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Fab,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import { useHttpClient } from "../hooks/http-hook";
import { useForm, Controller } from "react-hook-form";

import { useSnackbar } from 'notistack';

import { useNavigate } from "react-router-dom";

const Account = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const { enqueueSnackbar } = useSnackbar()

  const { sendRequest } = useHttpClient();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = async (inputs) => {
    const formData = new FormData();
    formData.append("email", inputs.email);
    formData.append("image", file);

    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/users/${auth.userData.userId}`,
        "POST",
        formData
      );
        if(file){
          auth.setUserData({
        ...auth.userData,
        userEmail: inputs.email,
        userImageUrl: responseData.image
      });}
      else{
        auth.setUserData({
          ...auth.userData,
          userEmail: inputs.email,
        });
      }
      enqueueSnackbar("User info edited successfully", {variant: 'success',})
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar("An error has occurred. Please try again", {variant: 'error',})
    }
  };

  

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(()=>{
    setValue("email", auth.userData.userEmail)
  },[auth.userData, setValue])

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
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
        <Card sx={{ width: 345, marginX: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardMedia
              component="div"
              height="140"
              sx={{ backgroundColor: "darkorange", paddingY: "1rem" }}
            >
              <Avatar
                sx={{
                  height: 250,
                  width: 250,
                  maxHeight: { xs: 233, md: 250 },
                  maxWidth: { xs: 350, md: 250 },
                  marginX: "auto",
                }}
                alt={auth.userData.userName}
                src={
                  previewUrl ||
                  `http://localhost:8000/${auth.userData.userImageUrl}`
                }
              />
              <Fab
                component="label"
                color="primary"
                sx={{
                  position: "absolute",
                  marginTop: "-60px",
                  marginLeft: "50px",
                }}
              >
                <EditIcon />

                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  hidden
                  onChange={pickedHandler}
                />
              </Fab>
            </CardMedia>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ validate: value => value !== '' }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      error={!!errors.email}
                      type="email"
                      label="Email"
                      value={value }
                      onChange={onChange}
                      variant="standard"
                      helperText={
                        errors.email ? "Enter Email" : null
                      }
                    />
                  )}
                />
                <Stack direction="row" spacing={2}>
              <Button color="error" type="submit" variant="contained" sx={{ width: "20ch" }}>
                ثبت
              </Button>
              <Button color="primary" variant="contained" sx={{ width: "20ch" }} onClick={()=>navigate("/dashboard")}>
                بازگشت
              </Button>
              </Stack>
              </Stack>
            </CardContent>
          </form>
        </Card>
      </Box>
    </>
  );
};
export default Account;
