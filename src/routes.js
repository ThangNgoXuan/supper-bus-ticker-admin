import {
  HomeOutlined,
  ReconciliationOutlined,
  CarOutlined,
  PieChartOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import Dashboard from "./pages/Dashboard";
import Driver from "./pages/Driver";
import Coach from "./pages/Coach";
import Report from "./pages/Report";
import Recuit from "./pages/Recruit";
import NotFount from "./pages/NotFound";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Ticker from "./pages/Ticket";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeOutlined />,
    component: Dashboard,
  },
  {
    path: "/ticker",
    name: "Quản lí bán vé",
    icon: <HomeOutlined />,
    component: Ticker,
  },
  {
    name: "Quản lí xe",
    icon: <CarOutlined />,
    children: [
      {
        path: "/coach",
        name: "Quản lí loại xe",
        icon: <CaretRightOutlined />,
        component: Coach,
      },
      {
        path: "/coachqq",
        name: "Quản lí loại xe",
        icon: <CaretRightOutlined />,
        component: Dashboard,
      },
    ],
  },
  {
    path: "/driver",
    name: "Quản lí tài xế",
    icon: <HomeOutlined />,
    component: Driver,
  },
  {
    path: "/contact",
    name: "Liên hệ",
    icon: <HomeOutlined />,
    component: ContactUs,
  },
  {
    path: "/about",
    name: "Về chúng tôi",
    icon: <HomeOutlined />,
    component: AboutUs,
  },
  {
    path: "/news",
    name: "Tin tức",
    icon: <HomeOutlined />,
    component: News,
  },
  {
    path: "/recruit",
    name: "Tuyển dụng",
    icon: <ReconciliationOutlined />,
    component: Recuit,
  },
  {
    path: "/report",
    name: "Báo cáo",
    icon: <PieChartOutlined />,
    component: Report,
  },
  {
    path: "/404",
    name: "Báo cáo",
    icon: <PieChartOutlined />,
    component: NotFount,
  },
  {
    path: "/coach",
    component: Coach,
  },
  {
    path: "/coachqq",
    component: Dashboard,
  },
];

export default dashboardRoutes;
