import {
  HomeOutlined,
  ReconciliationOutlined,
  CarOutlined,
  PieChartOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import { IoTicketOutline } from "react-icons/io5";

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    path: "/ticker",
    name: "Quản lí vé xe",
    icon: <IoTicketOutline />,
  },
  {
    name: "Quản lí xe",
    icon: <CarOutlined />,
    children: [
      {
        path: "/coach",
        name: "Quản lí loại xe",
        icon: <CaretRightOutlined />,
      },
    ],
  },
  {
    path: "/driver",
    name: "Quản lí tài xế",
    icon: <HomeOutlined />,
  },
  {
    path: "/user",
    name: "Quản lí người dùng",
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
];

export default dashboardRoutes;
