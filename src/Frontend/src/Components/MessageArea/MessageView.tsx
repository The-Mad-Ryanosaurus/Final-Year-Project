import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import MessageList from "./MessageList";

function MessageView() {
  return (
    <Grid item xs={12} md={9} pr={2}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Paper sx={{ height: "100%" }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "left",
              backgroundColor: "transparent",
              height: "100%",
            }}
          >
            <Box sx={{ borderBottom: 1, display: "flex", alignItems: "center" }}>
              <Typography sx={{ alignSelf: "center" }} variant="h5">
                Channel Name Here
              </Typography>
            </Box>
            {/* Channel History */}
            <Box sx={{ flexGrow: 1 }}>
              <MessageList />
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ height: "10%" }}>
          <TextField
            size="medium"
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Stack>
    </Grid>
  );
}

export default MessageView;
