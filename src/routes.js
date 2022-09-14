import {
  HomeOutlined,
  ReconciliationOutlined,
  CarOutlined,
  PieChartOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import { IoTicketOutline } from "react-icons/io5";
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import { BiNews, BiBorderOuter } from "react-icons/bi";
import { GiMassDriver } from "react-icons/gi";

const dashboardRoutes = [
  {
    path: "/dashboard",
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
    name: "Quản lí chuyến xe",
    icon: <BiBorderOuter />,
    children: [
      {
        path: "/route",
        name: "Quản lí chuyến xe",
        icon: <CaretRightOutlined />,
      },
    ],
  },
  {
    path: "/driver",
    name: "Quản lí tài xế",
    icon: <GiMassDriver />,
  },
  {
    path: "/user",
    name: "Quản lí người dùng",
    icon: <AiOutlineUser />,
  },
  {
    path: "/news",
    name: "Tin tức",
    icon: <BiNews />,
  },
  {
    path: "/recruit",
    name: "Tuyển dụng",
    icon: <ReconciliationOutlined />,
  },
  {
    path: "/contact",
    name: "Liên hệ",
    icon: <RiContactsBook2Line />,
  },
  {
    path: "/about",
    name: "Về chúng tôi",
    icon: <AiOutlineInfoCircle />,
  },
  {
    path: "/report",
    name: "Báo cáo",
    icon: <PieChartOutlined />,
  },
];

export default dashboardRoutes;
