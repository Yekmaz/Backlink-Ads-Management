import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DoneIcon from "@mui/icons-material/Done";
import { useHttpClient } from "./hooks/http-hook";
const FirstPage = () => {
  const { sendRequest } = useHttpClient();
  const [linksInfo, setLinksInfo] = useState({totalLinks:0, activeLinks:0});
  useEffect(() => {
    const getLinks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/links"
        );
        var linksNumber = responseData.Links.length
        var activeLinksNumber= linksNumber
        responseData.Links.forEach(element => {
          if(element.enabled===false){activeLinksNumber--}
        });
        setLinksInfo({totalLinks:linksNumber, activeLinks:activeLinksNumber});
      } catch (err) {
        console.log(err);
      }
    };
    getLinks();
  }, [sendRequest]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <Paper
        elevation={2}
        sx={{ mx: 2, p: 2, fontSize: 25, textAlign: "center" }}
      >
        <LinkIcon sx={{ fontSize: 40 }} />
        <br />
        Total Links:
        <br />
        <Typography fontSize={60}><b>{linksInfo.totalLinks}</b></Typography>
      </Paper>
      <Paper
        elevation={2}
        sx={{ mx: 2, p: 2, fontSize: 25, textAlign: "center" }}
      >
        <LinkIcon sx={{ fontSize: 40 }} />
        <DoneIcon sx={{ fontSize: 40 }} />
        <br />
        Active Links:
        <br />
        <Typography fontSize={60}><b>{linksInfo.activeLinks}</b></Typography>
      </Paper>
    </Box>
  );
};
export default FirstPage;
