import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="authors" element={<Navigate to="/" />} />
        <Route path="blogs/:slug" element={<BlogDetailsPage />} />
        <Route path="authors/:slug" element={<AuthorDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
