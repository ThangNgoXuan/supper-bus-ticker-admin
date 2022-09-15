import { Button, DatePicker, Table, Tabs, Typography } from "antd";
import moment from "moment";
import React from "react";
import { dateFormat } from "../../utils";

export default function Schedule() {
  const { Title } = Typography;
  const listSchedule = [
    {
      name: "Bình Định => Bình Dương",
      key: "1",
      content: "content 1",
      list: [
        {
          time: "08:00 -> 17:00",
          listCoach: [
            {
              date: "20/09",
              coach: "77A.1 24359",
            },
            {
              date: "20/09",
              coach: "77A.1 24359",
            },
          ],
        },
        {
          time: "07:00 -> 16:00",
          listCoach: [
            {
              date: "20/09",
              coach: "77A.1 24359",
            },
            {
              date: "20/09",
              coach: "77A.1 24359",
            },
          ],
        },
      ],
    },
    {
      name: "Bình Định => Đồng Nai",
      key: "2",
      content: "content 2",
    },
    {
      name: "Bình Định => Sài gòn",
      key: "3",
      content: "content 3",
    },
  ];

  const columns = [
    {
      title: "Ca",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "20/11",
      key: "20/11",
      dataIndex: "coach",
    },
    {
      title: "21/11",
      key: "21/11",
      dataIndex: "coach",
    },
    {
      title: "22/11",
      key: "22/11",
      dataIndex: "coach",
    },
  ];

  const { RangePicker } = DatePicker;

  return (
    <div className="p-schedule">
      <Title level={2}>Đăng kí lịch chạy</Title>
      <div className="p-schedule_content">
        <Tabs tabPosition="left">
          {listSchedule.map((item, index) => (
            <Tabs.TabPane
              tab={item.name}
              key={`${item.key}-${index.toString()}`}
            >
              <RangePicker
                defaultValue={[
                  moment("2015/01/01", dateFormat),
                  moment("2015/01/01", dateFormat),
                ]}
                format={dateFormat}
              />
              <div className="p-schedule_content_div">
                {item.list && (
                  <>
                    <Table columns={columns} dataSource={item.list} />
                    <Button>Cập nhật</Button>
                  </>
                )}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <div className="p-schedule_right"></div>
    </div>
  );
}
