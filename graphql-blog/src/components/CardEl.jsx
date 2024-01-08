import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function CardEl({ author, coverPhoto, slug, title }) {
  return (
    <Card sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", borderRadius: 4 }}>
      {!!author && (
        <CardHeader
          avatar={<Avatar src={author.avatar.url} />}
          title={
            <Typography
              component="p"
              variant="p"
              color="text.secondary"
              sx={{ marginRight: 2 }}
            >
              {author.name}
            </Typography>
          }
          subheader={author.felid}
        />
      )}

      <CardMedia
        component="img"
        height="194"
        image={coverPhoto.url}
        alt={slug}
      />
      <CardContent>
        <Typography
          component="h3"
          variant="h6"
          color="text.primary"
          fontWeight="700"
        >
          {title}
        </Typography>
      </CardContent>
      <Divider variant="middle" sx={{ margin: "10px" }} />
      <CardActions>
        <Link
          to={`/blogs/${slug}`}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{ width: "100%", borderRadius: 2.5 }}
          >
            مطالعه مقاله
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CardEl;
