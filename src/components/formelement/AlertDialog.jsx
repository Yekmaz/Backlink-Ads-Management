import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import Typography from "@mui/material/Typography";

export default function AlertDialog({ alert, handleClose }) {
  return (
    <Dialog
      open={alert.open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box display="flex" alignItems="center">
          <WarningTwoToneIcon fontSize="large" />
          <Typography sx={{ marginLeft: "10px", marginTop: "5px" }}>
            {alert.title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alert.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)} sx={{color:"red"}}>OK</Button>
        <Button onClick={() => handleClose(false)} sx={{color:"black"}} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
