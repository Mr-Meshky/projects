import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import sanitize from "sanitize-html";

import AuthorLoader from "../components/AuthorLoader";
import NotFoundPage from "./NotFoundPage";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

import { GET_BLOG_INFO } from "../graphql/queries";

function BlogDetailsPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { loading, data, errors } = useQuery(GET_BLOG_INFO, {
    variables: {
      slug,
    },
  });

  if (loading) return <AuthorLoader />;
  if (errors) return <h4>Something went wrong</h4>;

  if (data.post == null) return <NotFoundPage />;

  const { title, coverPhoto, author, content } = data.post;

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          item
          xs={12}
          mt={9}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            fontWeight="700"
          >
            {title}
          </Typography>
          <ArrowBackRounded
            onClick={() => navigate(-1)}
            cursor="pointer"
            sx={{ width: "35px", height: "35px" }}
          />
        </Grid>
        <Grid item xs={12} mt={6}>
          <img
            src={coverPhoto.url}
            alt={title}
            width="100%"
            style={{ borderRadius: 15 }}
          />
        </Grid>
        <Grid item xs={12} mt={7} display="flex" alignItems="center">
          <Avatar
            src={author.avatar.url}
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <Box component="div">
            <Typography component="p" variant="h5" fontWeight="700">
              {author.name}
            </Typography>
            <Typography
              component="p"
              variant="p"
              fontWeight="700"
              color="text.secondary"
            >
              {author.field}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(content.html) }}
          ></div>
        </Grid>
        <Grid item xs={12}>
          <CommentForm slug={slug}></CommentForm>
        </Grid>
        <Grid item xs={12}>
          <Comments slug={slug}></Comments>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogDetailsPage;
