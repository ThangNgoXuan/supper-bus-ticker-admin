import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
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
      dataIndex: "id",
      key: "id",
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
      key: "price",
    },
    {
      width: 300,
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button type="primary">Xuất bến</Button>
          <Button type="primary" onClick={() => handleOpenUpdate(record)}>
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
    console.log("Qq", data);
    setValues({
      open: true,
      idUpdate: data._id,
    });

    form.setFieldsValue({
      route: data.route,
      vehicle: data.vehicle,
      price: data.price,
      accept_start: data.accept_start,
      id: data.id,
      // start: data.start.intend_time,
    });
  };

  const handleSubmit = (data) => {
    console.log("create", data);
    if (values.idUpdate) {
    } else {
      data.start = { intend_time: data.start };
      data.seat_diagram = "n_bunk_34";
      data.end = { intend_time: new Date() };
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
            id: ""
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
          <Form.Item
            label="Mã chuyến"
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã chuyến",
              },
            ]}
          >
            <Input placeholder="Nhập mã chuyến" />
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
