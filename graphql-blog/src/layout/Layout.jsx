import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "/logo.png";

function Layout({ children }) {
  return (
    <>
      <header>
        <AppBar position="sticky">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography
                component="h1"
                variant="h5"
                fontWeight="bold"
                flex={1}
              >
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  APX وبلاگ
                </Link>
              </Typography>

              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <img src={logo} alt="APX" width="50px" height="50px" />
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      {children}
      <footer>
        <Typography
          component="p"
          variant="p"
          bgcolor="#f7f7f7"
          color="primary"
          padding="10px"
          textAlign="center"
          mt={10}
        >
          پروژه وبلاگ با GraphQl | مسترمشکی
        </Typography>
      </footer>
    </>
  );
}

export default Layout;
