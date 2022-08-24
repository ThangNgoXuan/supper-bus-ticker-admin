import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Sider from "./components/Sider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import dashboardRoutes from "./routes";
import "./App.scss";

export default function App() {
  const { Content } = Layout;

  const getRouter = (router) => {
    // eslint-disable-next-line
    return router.map((item, index) => {
      if (item.children) {
        item.children.map((ele, idex) => {
          return (
            <>
              <Route
                path={ele.path}
                element={<ele.component />}
                key={`component-${idex}`}
              />
            </>
          );
        });
      } else {
        return (
          <Route
            path={item.path}
            element={<item.component />}
            key={`component-${index}`}
          />
        );
      }
    });
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider router={dashboardRoutes} />
        <Layout>
          <Header />
          <Content>
            <Routes>{getRouter(dashboardRoutes)}</Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}
