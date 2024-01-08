import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { Typography, Grid, Box, Avatar } from "@mui/material";

import { GET_POST_COMMENTS } from "../graphql/queries";
import ReplayComment from "./ReplayComment";

function Comments({ slug }) {
  const { loading, data } = useQuery(GET_POST_COMMENTS, {
    variables: { slug },
  });

  if (loading) return null;

  return (
    <Grid
      container
      sx={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
        borderRadius: 4,
        py: 1,
        mt: 8,
      }}
    >
      <Grid item xs={12} m={2}>
        <Typography component="p" variant="h6" fontWeight={700} color="primary">
          کامنت ها
        </Typography>
        {!data.comments.length && (
          <Typography
            component="p"
            variant="h6"
            fontWeight="700"
            textAlign="center"
            color="text.secondary"
          >
            کامنتی یافت نشد
          </Typography>
        )}
        {data.comments.map((comment) => (
          <Fragment key={comment.id}>
            <Grid
              item
              xs={12}
              m={2}
              p={2}
              border="1px solid silver"
              borderRadius={1}
            >
              <Box component="div" display="flex" alignItems="center" mb={3}>
                <Avatar>{comment.name[0]}</Avatar>
                <Typography
                  component="span"
                  variant="p"
                  fontWeight={700}
                  mr={1}
                >
                  {comment.name}
                </Typography>
              </Box>
              <Typography component="p" variant="p">
                {comment.text}
              </Typography>
            </Grid>

            {!!comment.replayComments.length &&
              comment.replayComments.map((repComment) => (
                <ReplayComment
                  key={repComment.id}
                  text={repComment.text}
                  avatar={repComment.author.avatar.url}
                  name={repComment.author.name}
                />
              ))}
          </Fragment>
        ))}
      </Grid>
    </Grid>
  );
}

export default Comments;
