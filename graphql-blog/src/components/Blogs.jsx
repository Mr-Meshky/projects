import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";

import CardEL from "./CardEl";
import HomeLoader from "./HomeLoader";
import { GET_BLOGS_INFO } from "../graphql/queries";

function Blogs() {
  const { loading, data, errors } = useQuery(GET_BLOGS_INFO);

  if (loading) return <HomeLoader />;
  if (errors) return <h4>Something went wrong</h4>;

  return (
    <Grid container spacing={2}>
      {data.posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <CardEL {...post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;
