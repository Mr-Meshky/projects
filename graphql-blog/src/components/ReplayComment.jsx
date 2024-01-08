import { Typography, Grid, Box, Avatar } from "@mui/material";

function ReplayComment({ text, avatar, name }) {
  return (
    <Grid
      item
      xs={12}
      m={2}
      p={2}
      mr={7}
      borderRadius={1}
      bgcolor="#545454"
      sx={{ transform: "translateY(-6px)" }}
    >
      <Box component="div" display="flex" alignItems="center" mb={3}>
        <Avatar src={avatar} />
        <Typography
          component="span"
          variant="p"
          fontWeight={700}
          mr={1}
          color="#fff"
        >
          {name}
        </Typography>
      </Box>
      <Typography component="p" variant="p" color="#f6f6f6">
        {text}
      </Typography>
    </Grid>
  );
}

export default ReplayComment;
