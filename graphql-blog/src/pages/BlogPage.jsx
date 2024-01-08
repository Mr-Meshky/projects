import { Container, Grid, Typography } from "@mui/material";

import Blogs from "../components/Blogs";

function BlogPage() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 190px)" }}>
      <Grid container padding={3}>
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h4"
            mb={3}
            fontWeight="700"
            color="info.dark"
            textAlign="center"
          >
            مقالات
          </Typography>
          <Blogs />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogPage;
