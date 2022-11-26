import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";
import TripApi from "../../api/tripApi";
import { dateFormat } from "../../utils";
import moment from "moment";
import routerApi from "../../api/routerApi";
import CoachApi from "../../api/coachApi";

export default function Trips() {
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
  });

  const [form] = Form.useForm();
  const { Option } = Select;
  const { Title } = Typography;

  /* eslint-disable-next-line */
  const [loadingRoute, dataRoute, _Route, fetchRoute, refetchRoute] = useFetch(
    {},
    routerApi.getAllRoute
  );

  /* eslint-disable-next-line */
  const [loadingTrip, dataTrip, _Trip, fetchTrip, refetchTrip] = useFetch(
    {},
    TripApi.getAllTrip
  );

  /* eslint-disable-next-line */
  const [loadingVehicle, dataVehicle, _Vehicle, fetchVehicle, refetchVehicle] =
    useFetch({}, CoachApi.getAllCoach);

  useEffect(() => {
    //call api lấy data typecoach
    fetchRoute({}, true);
    fetchTrip({}, true);
    fetchVehicle({}, true);
    /* eslint-disable-next-line */
  }, []);

  console.log("trip", dataTrip);
  console.log("route", dataRoute);

  // function addHours(numOfHours, date = new Date()) {
  //   date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  //   return date;
  // }

  const columnsTrip = [
    {
      title: "STT",
      dataIndex: "_id",
      width: 80,
      render: (index) => (
        <span>{(index = dataTrip.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      width: 200,
      title: "Mã chuyến xe",
      dataIndex: "code",
      key: "code",
    },
    {
      width: 200,
      title: "Tuyến đường",
      dataIndex: "route",
      key: "route",
      render: (index) => <span>{index?.name}</span>,
    },
    {
      width: 200,
      title: "Xe",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (index) => <span>{index?.name}</span>,
    },
    {
      width: 250,
      title: "Xuất bến",
      dataIndex: "accept_start",
      key: "accept_start",
      render: (index) => <span>{index ? "Đã xuất bến" : "Chưa xuất bến"}</span>,
    },
    {
      width: 600,
      title: "Thời gian khởi hành",
      dataIndex: "start",
      key: "start",
      render: (index) => (
        // <span>{index.intend_time}</span>
        <span>{moment(index.intend_time).format("HH:mm DD-MM-YYYY")}</span>
      ),
    },
    {
      width: 600,
      title: "Thời gian kết thúc",
      dataIndex: "end",
      key: "end",
      render: (index) => (
        // <span>{index.intend_time}</span>
        <span>{moment(index.intend_time).format("HH:mm DD-MM-YYYY")}</span>
      ),
    },
    {
      width: 250,
      title: "Tài xế",
      dataIndex: "start",
      key: "start",
    },
    {
      width: 250,
      title: "Phụ xe",
      dataIndex: "start",
      key: "start",
    },
    {
      width: 250,
      title: "Giá vé",
      dataIndex: "price",
      render: (index) => {
        return <span>{index} VNĐ</span>;
      },
    },
    {
      width: 300,
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button type="primary">Xuất bến</Button>
          <Button
            type="primary"
            onClick={() => {
              handleOpenUpdate(record);
            }}
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleClose = () => {
    setValues({
      open: false,
      idUpdate: "",
    });

    form.resetFields();
  };

  const handleOpen = () => {
    setValues({
      open: true,
    });
  };

  const handleOpenUpdate = (data) => {
    console.log('cap nhat',moment(data.start.intend_time));
    setValues({
      open: true,
      idUpdate: data._id,
    });
    // const t = moment(data?.start?.intend_time).format(dateFormat);
    console.log('datA',  moment(new Date(), dateFormat))

    form.setFieldsValue({
      route: data.route._id,
      vehicle: data.vehicle._id,
      price: data.price,
      accept_start: data.accept_start,
      start: moment(data.start.intend_time),
    });
  };

  const handleSubmit = (data) => {
    console.log("create", data);
    if (values.idUpdate) {
      console.log(data);
      data.start = { intend_time: data.start };
      const xu = dataVehicle.filter((x) => x._id === data.vehicle);
      data.seat_diagram = xu[0].category_id.seat_diagram;
      const yu = dataRoute.filter((x) => x._id === data.route);
      const bu = data.start.intend_time;
      data.end = {
        intend_time: moment(bu).add(Math.round(yu[0].duration / 60), "hours"),
      };
      TripApi.updateTrip(values.idUpdate,data)
        .then((res) => {
          refetchTrip();
          notification.open({
            message: "Cập nhật thành công",
          });
          form.resetFields();
        })
        .catch((err) => {
          notification.open({
            message: "Cập nhật thất bại",
          });
        });
    } else {
      data.start = { intend_time: data.start };
      const x = dataVehicle.filter((x) => x._id === data.vehicle);
      data.seat_diagram = x[0].category_id.seat_diagram;
      const y = dataRoute.filter((x) => x._id === data.route);
      const b = data.start.intend_time;
      data.end = {
        intend_time: moment(b).add(Math.round(y[0].duration / 60), "hours"),
      };
      TripApi.createTrip(data)
        .then((res) => {
          refetchTrip();
          notification.open({
            message: "Tạo mới thành công",
          });
          form.resetFields();
        })
        .catch((err) => {
          notification.open({
            message: "Tạo mới thất bại",
          });
        });
    }
    handleClose();
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí chuyến xe</Title>
      </div>
      <div className="p-typeCoach_type">
        <div className="p-typeCoach_typeCoach_header">
          <Button size="large" type="primary" onClick={handleOpen}>
            <PlusOutlined />
            Tạo mới
          </Button>
        </div>
        <Table
          columns={columnsTrip}
          dataSource={dataTrip}
          loading={loadingTrip}
          scroll={{ x: 1500 }}
        ></Table>
      </div>
      <Modal
        open={values.open}
        title="Tạo chuyến xe"
        onCancel={handleClose}
        footer={[
          <>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#001c6b", color: "white" }}
            >
              Hủy
            </Button>
            <Button
              htmlType="submit"
              form="form"
              style={{ backgroundColor: "#001c6b", color: "white" }}
            >
              Tạo
            </Button>
          </>,
        ]}
      >
        <Form
          id="form"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            route: dataRoute[0]?._id,
            vehicle: dataVehicle[0]?._id,
            price: 0,
            accept_start: false,
            start: moment(new Date(), dateFormat),
          }}
        >
          <Form.Item label="Chọn tuyến xe" name="route">
            <Select>
              {dataRoute &&
                dataRoute.map((ele) => (
                  <Option values={ele?._id} key={ele?._id}>
                    {ele?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Row>
            <Col span={10}>
              <Form.Item label="Chọn xe" name="vehicle">
                <Select>
                  {dataVehicle &&
                    dataVehicle.map((ele) => (
                      <Option values={ele?._id} key={ele?._id}>
                        {ele?.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={12}>
              <Form.Item name="start" label="Thời gian khởi hành">
                <DatePicker
                  format="DD-MM-YYYY HH:mm"
                  showTime={{
                    defaultValue: moment("00:00", "HH:mm"),
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item label="Chọn tài xế">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={12}>
              <Form.Item label="Chọn phụ xe">
                <Select></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item label="Giá vé" name="price">
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nhập giá vé"
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <Form.Item label="Xuất bến" name="accept_start">
                <Radio.Group>
                  <Radio value={true}>Đã xuất bến</Radio>
                  <Radio value={false}>Chưa xuất bến</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
