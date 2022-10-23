import { Box, Typography } from "@mui/material";
import Announcement from "@mui/icons-material/Announcement"


const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      flexDirection="column"
    >
    <Announcement fontSize="large" sx={{ color: "#e70c0c" }} />
      <Typography variant="h5" sx={{paddingTop: "10px"}}>صفحه مورد نظر یافت نشد</Typography>
    </Box>
  );
};
export default NotFound;
