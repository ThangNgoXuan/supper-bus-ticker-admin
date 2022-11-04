import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import React from "react";
import useFetch from "../../hooks/useFetch";
import routerApi from "../../api/routerApi";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import useValues from "../../hooks/useValues";
import BoardingPointApi from "../../api/boardingPoint";

export default function Routes() {
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [form, formPlace] = Form.useForm();
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
    listPoint: [],
  });

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    routerApi.getAllRoute
  );

  /* eslint-disable-next-line */
  const [loadingPoint, dataPoint, _Point, fetchPoint, refetchPoint] = useFetch(
    {},
    BoardingPointApi.getAllBoardingPoint
  );

  useEffect(() => {
    fetch({}, true);
    fetchPoint({}, true);
    /* eslint-disable-next-line */
  }, []);

  const dataType = [
    {
      key: "pick",
      value: "Điểm đón",
    },
    {
      key: "drop",
      value: "Điểm trả",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Tuyến đường",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điểm đầu",
      dataIndex: "from",
      key: "from",
      render: (index) => {
        return index?.name;
      },
    },
    {
      title: "Điểm cuối",
      dataIndex: "to",
      key: "to",
      render: (index) => {
        return index?.name;
      },
    },
    {
      title: "Các điểm dừng",
      dataIndex: "points",
      key: "points",
      render: (index) => {
        return index.map((ele) => {
          return <span key={ele?._id}>{ele?.point?.name},</span>;
        });
      },
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-news_table_button">
          <Button onClick={() => handleDelete(record)} type="primary">
            Xóa
          </Button>
          <Button
            onClick={() => {
              handleOpenUpdate(record);
            }}
            type="primary"
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const columnsPlan = [
    {
      title: "Địa điểm",
      dataIndex: "point",
      key: "point",
      render: (index) => {
        const b = dataPoint.find(ele => ele._id === index)
        return <span>{b?.name}</span>
      }
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (index) => {
        const b = dataType.find(ele => ele.key === index)
        return <span>{b?.value}</span>
      }
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
    },
  ];

  const onSubmitPlace = (dataPlace) => {
    setValues({
      listPoint: [dataPlace, ...values.listPoint],
    });
  };

  const handleDelete = (record) => {
    routerApi
      .deleteRoute(record._id)
      .then((res) => {
        refetch();
        notification.open({
          message: "Xóa thành công",
        });
      })
      .catch((err) => {
        notification.open({
          message: "Xóa thất bại!",
        });
      });
  };

  const handleOpen = () => {
    setValues({
      open: true,
    });
  };

  const handleOpenUpdate = (data) => {
    setValues({
      open: true,
      idUpdate: data._id,
      listPoint: [],
    });

    form.setFieldsValue({
      name: data.name,
      from: data.from._id,
      to: data.to._id,
      distance: data.distance,
      duration: data.duration,
    });
  };

  const handleClose = () => {
    setValues({
      open: false,
      listPoint: [],
      idUpdate: "",
    });
    form.resetFields();
  };

  const onFinish = (data) => {
    if (values.idUpdate) {
      data.points = values.listPoint;
      routerApi
        .updateRoute(data, values.idUpdate)
        .then((res) => {
          refetch();
          notification.open({
            message: "Cập nhật thành công",
          });
        })
        .catch((err) => {
          notification.open({
            message: "Cập nhật thất bại",
          });
        });
    } else {
      data.points = values.listPoint;
      routerApi
        .createRouter(data)
        .then((res) => {
          refetch();
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
        <Title level={4}>Quản lí tuyến đường</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button onClick={handleOpen} type="primary" size="large">
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <div className="p-routes_table">
        <Table columns={columns} dataSource={data} loading={loading} />
      </div>
      <div className="p-routes_modal">
        <Modal
          width={"50%"}
          title={values.idUpdate ? "Cập nhật chuyến xe" : "Tạo chuyến xe mới"}
          visible={values.open}
          onCancel={handleClose}
          maskClosable={false}
          footer={[
            <>
              <Button
                style={{ backgroundColor: "#001c6b", color: "white" }}
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button
                style={{ backgroundColor: "#001c6b", color: "white" }}
                form="formRouter"
                type="primary"
                htmlType="submit"
              >
                {values.idUpdate ? "Cập nhật" : "Tạo"}
              </Button>
            </>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            id="formRouter"
            onFinish={onFinish}
            initialValues={{
              name: "",
              from: dataPoint[0]?._id,
              to: dataPoint[1]?._id,
              distance: 0,
              duration: 0,
            }}
          >
            <Form.Item
              name="name"
              label="Tên tuyến"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tuyến!",
                },
              ]}
            >
              <Input placeholder="Nhập tên chuyến" />
            </Form.Item>
            <Row>
              <Col span={11}>
                <Form.Item name="from" label="Điểm đầu">
                  <Select>
                    {dataPoint &&
                      dataPoint.map((ele) => (
                        <Option key={ele?._id} values={ele?._id}>
                          {ele?.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <Form.Item name="to" label="Điểm cuối">
                  <Select>
                    {dataPoint &&
                      dataPoint.map((ele) => (
                        <Option key={ele?._id} values={ele?._id}>
                          {ele?.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Space>
                  <Form.Item
                    name="distance"
                    label="Khoảng cách:"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập khoảng cách!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      placeholder="Nhập giá vé"
                    />
                  </Form.Item>
                  <Text> KM</Text>
                </Space>
              </Col>
              <Col span={3} />
              <Col span={10}>
                <Space>
                  <Form.Item
                    name="duration"
                    label="Thời gian:"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thời gian!",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Text> Phút</Text>
                </Space>
              </Col>
            </Row>
          </Form>
          <Title level={5}>Thêm điểm dừng</Title>
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
              duration: 0,
              distance: 0,
              point: dataPoint[0]?._id,
              type: dataType[0].key,
            }}
          >
            <Row>
              <Col span={11}>
                <Form.Item label="Điểm dừng" name="point">
                  <Select
                    // labelInValue
                    name="point"
                    defaultValue={{
                      key: dataPoint[0]?._id,
                      // label: dataPoint[0]?.name,
                    }}
                  >
                    {dataPoint &&
                      dataPoint.map((item) => (
                        <Option value={item?._id} key={item?._id}>
                          {item?.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item name="type" label="Loại">
                  <Select
                    // labelInValue
                    name="type"
                    defaultValue={{
                      key: dataType[0].key,
                      // label: dataType[0]?.value,
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
            <Row>
              <Col span={11}>
                <Form.Item label="Thời gian đến điểm đầu" name="duration">
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item label="Khoảng cách đến điểm đầu" name="distance">
                  <InputNumber />
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
    </div>
  );
}
