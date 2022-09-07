import {
  HomeOutlined,
  ReconciliationOutlined,
  CarOutlined,
  PieChartOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    path: "/ticker",
    name: "Quản lí bán vé",
    icon: <HomeOutlined />,
  },
  {
    name: "Quản lí xe",
    icon: <CarOutlined />,
    children: [
      {
        path: "/coach",
        name: "Quản lí loại xe",
        icon: <CaretRightOutlined />,
      }
    ],
  },
  {
    path: "/driver",
    name: "Quản lí tài xế",
    icon: <HomeOutlined />,
  },
  {
    path: "/contact",
    name: "Liên hệ",
    icon: <HomeOutlined />,
  },
  {
    path: "/about",
    name: "Về chúng tôi",
    icon: <HomeOutlined />,
  },
  {
    path: "/news",
    name: "Tin tức",
    icon: <HomeOutlined />,
  },
  {
    path: "/recruit",
    name: "Tuyển dụng",
    icon: <ReconciliationOutlined />,
  },
  {
    path: "/report",
    name: "Báo cáo",
    icon: <PieChartOutlined />,
  },
];

export default dashboardRoutes;
