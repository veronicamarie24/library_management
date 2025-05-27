import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
