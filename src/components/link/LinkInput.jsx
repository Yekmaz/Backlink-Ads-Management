import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import LinksList from "./LinksList";
import LinkDialogForm from "./LinkDialogForm";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";
import { useHttpClient } from "../hooks/http-hook";
import AddLink from "@mui/icons-material/AddLink";
import AlertDialog from "../formelement/AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const LinkInput = () => {
  const auth = useAuth();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showAdd, setShowAdd] = useState(false);
  const [links, setLinks] = useState([]);
  const [editValue, setEditValue] = useState({
    id: "",
    title: "",
    url: "",
    enabled: false,
  });

  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: "",
    text: "",
  });

  const { sendRequest } = useHttpClient();

  const action = (snackbarId) => (
    <IconButton
      color="inherit"
      aria-label="upload picture"
      component="label"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      <CloseIcon />
    </IconButton>
  );

  const handleDelete = async (id) => {
    setAlertDialog({
      open: true,
      id,
      title: "Warning",
      text: "Are you sure?",
    });
  };

  useEffect(() => {
    const getLinks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/links"
        );
        setLinks(responseData.Links);
      } catch (err) {
        console.log(err);
      }
    };
    getLinks();
  }, [sendRequest,editValue]);

  //----------------------Post Data-----------------------------------

  const handleAlertClose = async (result) => {
    setAlertDialog({ ...alertDialog, open: false });

    if (result) {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/links/${alertDialog.id}`,
          "DELETE",
          undefined,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.userData.token,
          }
        );
        setLinks((prevLinks) =>
          prevLinks.filter((link) => link.id !== alertDialog.id)
        );

        enqueueSnackbar(responseData.message, { variant: "success", action });
      } catch (err) {
        enqueueSnackbar("An error has occurred. Please try again", {
          variant: "error",
        });
      }
    }
  };

  const addFormHandler = () => {
    setShowAdd(true);
    setEditValue({ id: "", title: "", url: "", enabled: true });
  };

  const editFormHandler = (id, title, url, enabled) => {
    setShowAdd(true);
    setEditValue({ id, title, url, enabled });
  };

  const onSubmit = async (formData) => {
    if (editValue.id !== "") {
      try {
        await sendRequest(
          `http://localhost:8000/api/links/${editValue.id}`,
          "POST",
          JSON.stringify({
            title: formData.title,
            url: formData.url,
            enabled: formData.enabled,
            editor: auth.userData.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.userData.token,
          }
        );
        setLinks((current) =>
          current.map((link) => {
            if (link.id === editValue.id) {
              return {
                ...link,
                title: formData.title,
                url: formData.url,
                enabled: formData.enabled,
              };
            }
            return link;
          })
        );
        setShowAdd(false);
        setEditValue({ id: "", title: "", url: "", enabled: false });
        enqueueSnackbar("Link edited successfully", {
          variant: "success",
          action,
        });
      } catch (err) {
        enqueueSnackbar("An error has occurred. Please try again", {
          variant: "error",
          action,
        });
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/links",
          "POST",
          JSON.stringify({
            title: formData.title,
            url: formData.url,
            enabled: formData.enabled,
            creator: auth.userData.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.userData.token,
          }
        );

        setShowAdd(false);
        setLinks((current) => [...current, responseData.link]);
        enqueueSnackbar("Link added successfully", {
          variant: "success",
          action,
        });
      } catch (err) {
        enqueueSnackbar("An error has occurred. Please try again", {
          variant: "error",
          action,
        });
      }
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
        <Button
          sx={{
            marginX: "auto",
          }}
          variant="contained"
          onClick={addFormHandler}
        >
          <AddLink />
          &nbsp;Add new link
        </Button>

        <LinksList
          links={links}
          handleDelete={handleDelete}
          handleEdit={editFormHandler}
        />
      </Box>
      <LinkDialogForm
        editValue={editValue}
        onSubmit={onSubmit}
        cancelHandler={()=>setShowAdd(false)}
        open={showAdd}
      />
      <AlertDialog alert={alertDialog} handleClose={handleAlertClose} />
    </>
  );
};

export default LinkInput;
