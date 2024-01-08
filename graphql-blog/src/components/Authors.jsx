import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HomeLoader from "./HomeLoader";

import { GET_AUTHORS_INFO } from "../graphql/queries";

function Authors() {
  const { loading, data, errors } = useQuery(GET_AUTHORS_INFO);

  if (loading) return <HomeLoader />;
  if (errors) return <h4>Something went wrong</h4>;

  const { authors } = data;

  return (
    <Grid
      container
      sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", borderRadius: 4 }}
    >
      {authors.map((author, index) => (
        <Fragment key={author.id}>
          <Grid item xs={12} padding={1.5}>
            <Link
              to={`authors/${author.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={author.avatar.url} sx={{ marginLeft: 3 }} />
              <Typography component="p" variant="p" color="text.secondary">
                {author.name}
              </Typography>
            </Link>
          </Grid>
          {index !== authors.length - 1 ? (
            <Grid item xs={12}>
              <Divider variant="middle" sx={{ margin: "10px" }} />
            </Grid>
          ) : (
            ""
          )}
        </Fragment>
      ))}
    </Grid>
  );
}

export default Authors;
