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
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";

export default function App() {
  const { Content } = Layout;

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider router={dashboardRoutes} />
        <Layout>
          <Header />
          <Content>
            {/* <Routes>{getRouter(dashboardRoutes)}</Routes> */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/ticker" element={<Ticket />}/>
              <Route path="/coach" element={<Coach />}/>
              <Route path="/coach-type" element={<Coach />}/>
              <Route path="/driver" element={<Driver />}/>
              <Route path="/contact" element={<ContactUs />}/>
              <Route path="/about" element={<AboutUs />}/>
              <Route path="/news" element={<News />}/>
              <Route path="/recruit" element={<Recruit />}/>
              <Route path="/report" element={<Report />}/>
              <Route path="*" element={<NotFound />}/>
              <Route path="/recruit" element={<Recruit />}/>
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}
