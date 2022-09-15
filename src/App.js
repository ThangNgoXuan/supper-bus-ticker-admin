import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Sider from "./components/Sider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import dashboardRoutes from "./routes";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/Ticket";
import Coach from "./pages/Coach";
import Driver from "./pages/Driver";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import Recruit from "./pages/Recruit";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import RoutesPage from "./pages/Routes";
import Login from "./pages/Login";
import Place from "./pages/Place";
import Schedule from "./pages/Schedule";
import Booking from "./pages/Booking";

export default function App() {
  const { Content } = Layout;

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider router={dashboardRoutes} />
        <Layout>
          <Header />
          <Content>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/ticker" element={<Ticket />} />
              <Route exact path="/coach" element={<Coach />} />
              <Route exact path="/coach-type" element={<Coach />} />
              <Route exact path="/driver" element={<Driver />} />
              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="/recruit" element={<Recruit />} />
              <Route path="*" element={<NotFound />} />
              <Route exact path="/recruit" element={<Recruit />} />
              <Route exact path="/user" element={<User />} />
              <Route exact path="/route" element={<RoutesPage />} />
              <Route exact path="/place" element={<Place />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/schedule" element={<Schedule />} />
              <Route exact path="/booking" element={<Booking />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}
