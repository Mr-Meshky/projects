import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import sanitize from "sanitize-html";

import CardEl from "../components/CardEl";
import AuthorLoader from "../components/AuthorLoader";
import NotFoundPage from "./NotFoundPage";

import { GET_AUTHOR_INFO } from "../graphql/queries";

function AuthorDetailsPage() {
  const { slug } = useParams();
  const { loading, data, errors } = useQuery(GET_AUTHOR_INFO, {
    variables: {
      slug,
    },
  });

  if (loading) return <AuthorLoader />;
  if (errors) return <h4>Something went wrong</h4>;

  if (data.author == null) return <NotFoundPage />;

  const { name, avatar, field, description, posts } = data.author;

  return (
    <Container maxWidth="lg">
      <Grid container mt={10}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            src={avatar.url}
            sx={{
              width: 225,
              height: 225,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          />
          <Typography
            component="h3"
            variant="h5"
            fontWeight="700"
            mt={4}
            mb={1.5}
          >
            {name}
          </Typography>
          <Typography component="p" variant="h5" color="text.secondary">
            {field}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(description.html) }}
          ></div>
        </Grid>
        <Grid item xs={12} mt={6}>
          <Typography component="h3" variant="h5" fontWeight="700">
            مقالات {name}
          </Typography>
          <Grid container spacing={2} mt={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <CardEl
                  slug={post.slug}
                  title={post.title}
                  coverPhoto={post.coverPhoto}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuthorDetailsPage;
