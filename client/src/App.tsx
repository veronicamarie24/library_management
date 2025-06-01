import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { CLIENT_ROUTES } from "./routes/clientRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path={CLIENT_ROUTES.LOGIN} element={<Login />} />
          <Route
            path={CLIENT_ROUTES.ADMIN_DASHBOARD}
            element={<AdminDashboard />}
          />
          <Route
            path={CLIENT_ROUTES.USER_DASHBOARD}
            element={<UserDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
