import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import image from "./../assets/not-found-image.webp";

function NotFoundPage() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 190px)" }}>
      <Grid
        container
        padding={3}
        sx={{
          textAlign: "center",
          paddingTop: "10vh",
        }}
      >
        <Grid item xs={12} mb={2}>
          <img src={image} alt="PageNotFound" width="250px" height="250px" />
        </Grid>
        <Grid item xs={12} mb={1}>
          <Typography
            component="h4"
            variant="h4"
            fontWeight="700"
            color="text.secondary"
          >
            404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="h3" fontWeight="700">
            صفحه مد نظر یافت نشد!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/">
            <Button variant="outlined" sx={{ marginTop: 3, width: "150px" }}>
              برگشت به خانه
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFoundPage;
