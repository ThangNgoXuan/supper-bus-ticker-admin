import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import BoardingPointApi from "../../api/boardingPoint";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";
import { hoursFormat } from "../../utils";

const dataType = [
  {
    key: "start",
    value: "Điểm đón",
  },
  {
    key: "middle",
    value: "Điểm dừng chân",
  },
  {
    key: "end",
    value: "Điểm trả",
  },
];


export default function TripPlan() {
  const { Title } = Typography;
  const { Option } = Select;
  const [formMain, formPlace] = Form.useForm();

  const [values, setValues] = useValues({
    open: false,
    setOpen: false,
    idUpdate: "",
    listPoint: [],
    time: "",
  });

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    BoardingPointApi.getAllBoardingPoint
  );

  useEffect(() => {
    //call api lấy data typecoach
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Tên lịch trinh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điểm đón",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Điểm nghỉ",
      dataIndex: "longtitude",
      key: "longtitude",
    },
    {
      title: "Điểm trả",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button type="primary">Xóa</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const columnsPlan = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      render: (index) => moment(index).format(hoursFormat),
    },
    {
      title: "Địa điểm",
      dataIndex: "place",
      key: "place",
      render: (index) => {
        <span>{index?.label}</span>;
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (index) => {
        <span>{index?.label}</span>;
      },
    },
  ];


  const handleOpen = () => {
    setValues({
      open: true,
    });
  };

  const handleClose = () => {
    setValues({
      open: false,
      idUpdate: "",
    });
  };

  const onSubmitPlace = (dataPlace) => {
    console.log("data place", dataPlace);
    notification.open({
      message: "Cập nhật thành công",
    });
    setValues({
      listPoint: [dataPlace, ...values.listPoint],
    });
  };

  const onSubmitMain = (dataMain) => {
    const data = { ...dataMain, listPoint: values.listPoint };
    console.log("main", data);

    notification.open({
      message: " thành công",
    });
    handleClose();
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Lịch trình</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button onClick={handleOpen} type="primary" size="large">
          <PlusOutlined />
          Thêm mới
        </Button>
      </div>
      <div className="p-place">
        <Table columns={columns} dataSource={data} loading={loading} />
      </div>
      <Modal
        width={"50%"}
        open={values.open}
        onCancel={handleClose}
        title="Tạo lịch trình mới"
        maskClosable={false}
        footer={[
          <>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#001c6b", color: "white" }}
            >
              Hủy
            </Button>
            <Button
              key="submit"
              htmlType="submit"
              form="formMain"
              style={{ backgroundColor: "#001c6b", color: "white" }}
            >
              Tạo
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          id="formMain"
          form={formMain}
          onFinish={onSubmitMain}
          initialValues={{
            name: "",
            listPoint: values.listPoint,
          }}
        >
          <Form.Item
            label="Tên lịch trình"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lớn",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          id="formTypeCoach"
          form={formPlace}
          onFinish={onSubmitPlace}
          layout="vertical"
          initialValues={{
            time: moment("12:08", hoursFormat),
            place: data[0]?._id,
            type: dataType[0].key,
          }}
        >
          <Row>
            <Col span={5}>
              <Form.Item label="Thời gian" name="time">
                <TimePicker name="time" format={hoursFormat} />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={12}>
              <Form.Item label="Địa điểm" name="place">
                <Select
                  labelInValue
                  name="place"
                  defaultValue={{ key: data[0]?._id, label: data[0]?.name }}
                >
                  {data &&
                    data.map((item) => (
                      <Option value={item?._id} key={item?._id}>
                        {item?.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={5}>
              <Form.Item name="type" label="Loại">
                <Select
                  labelInValue
                  name="type"
                  defaultValue={{
                    key: dataType[0].key,
                    label: dataType[0]?.value,
                  }}
                >
                  {dataType.map((item) => (
                    <Option value={item?.key} key={item?.key}>
                      {item?.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button
            size="large"
            style={{ backgroundColor: "#001c6b", color: "white" }}
            form="formTypeCoach"
            htmlType="submit"
          >
            <PlusOutlined />
          </Button>
        </Form>
        <Table
          style={{ marginTop: "20px" }}
          pagination={false}
          columns={columnsPlan}
          dataSource={values.listPoint}
        />
      </Modal>
    </div>
  );
}
