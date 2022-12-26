import {
  Avatar,
  Button,
  Calendar,
  Card,
  Col,
  Image,
  Input,
  List,
  Menu,
  MenuProps,
  Row,
  Space,
  Tabs,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  FieldTimeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import RankingSurface from "@/components/RankingSurface";

const Article: FC = () => {
  const articleTypeItems: MenuProps["items"] = [
    { label: "推荐", key: "recommend" },
    { label: "最新", key: "news" },
    { label: "热门", key: "popular" },
    { label: "前端", key: "font_end" },
    { label: "后端", key: "back_end" },
    {
      label: "小程序",
      key: "small_app",
    },
    { label: "IOS", key: "ios" },
    { label: "Android", key: "android" },
    { label: "工具", key: "tools" },
    { label: "云计算", key: "compute_cloud" },
  ];

  const articleData = Array.from({ length: 23 }).map((_, i) => ({
    userId: 1,
    id: i,
    title: `乾坤道长 ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "云计算再爆新热点，SnapStart解决Serverless冷启动问题",
    startCount: 156,
    likeCount: 154,
    messageCount: 3,
    createTime: "2015-09-01 18:00:00 ",
  }));

  const [selectArticleType, setSelectArticleType] = useState("recommend");
  const [selectTime] = useState("");
  const [selectPage, setSelectPage] = useState({
    per_page: 10,
    max_count: 23,
    page: 1,
  });
  const [inputSearch, setInputSearch] = useState("");

  // const navigate = useNavigate();

  const onTimeChange = (date: Dayjs) => {
    console.log(date);
    // navigate(`?time=${date.toString()}`);
  };
  const onSelectArticleType: MenuProps["onSelect"] = ({ key }) => {
    setSelectArticleType(key);
    // navigate(`?type=${key}`);
  };

  useEffect(() => {
    (async () => {})();
  }, [selectArticleType, selectTime]);

  return (
    <div className={styles["article-view"]}>
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <Menu
            selectedKeys={[selectArticleType]}
            theme="light"
            items={articleTypeItems}
            onSelect={onSelectArticleType}
          />
          <div className={styles["publish-article"]}>
            <Button type="primary" size="large">
              发布文章
            </Button>
          </div>
        </Col>
        <Col span={14}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                setSelectPage((prevPage) => ({ ...prevPage, page }));
                // console.log(page);
              },
              pageSize: selectPage.per_page,
              current: selectPage.page,
              total: selectPage.max_count,
            }}
            dataSource={articleData}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <Space key="startCount">
                    <StarOutlined />
                    {item.startCount}
                  </Space>,
                  <Space key="likeCount">
                    <LikeOutlined />
                    {item.likeCount}
                  </Space>,
                  <Space key="messageCount">
                    <MessageOutlined />
                    {item.messageCount}
                  </Space>,
                  <Space key="time">
                    <FieldTimeOutlined />
                    {item.createTime}
                  </Space>,
                ]}
                extra={
                  <Image
                    width={200}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <Link to={`article/${item.id}`}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <Link to={`user?id=${item.userId}`}>{item.title}</Link>
                    }
                    description={item.description}
                  />
                </Link>
              </List.Item>
            )}
          />
        </Col>
        <Col span={6}>
          <Space direction="vertical" size="large">
            <Calendar fullscreen={false} onChange={onTimeChange} />
            <Input.Search
              enterButton
              value={inputSearch}
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <Card title="文章发布活跃用户">
              <Tabs
                defaultActiveKey="day"
                items={[
                  {
                    label: "周文章数",
                    key: "day",
                    children: (
                      <RankingSurface
                        numbers={[4215, 123, 12, 3, 2, 1]}
                        names={[
                          "乾坤道长1",
                          "乾坤道长2",
                          "乾坤道长3",
                          "乾坤道长4",
                          "乾坤道长5",
                          "乾坤道长6",
                        ]}
                      />
                    ),
                  },
                  {
                    label: "月文章数",
                    key: "moth",
                    children: (
                      <RankingSurface
                        numbers={[4215, 123, 12, 3, 2, 1]}
                        names={[
                          "乾坤道长1",
                          "乾坤道长2",
                          "乾坤道长3",
                          "乾坤道长4",
                          "乾坤道长5",
                          "乾坤道长6",
                        ]}
                      />
                    ),
                  },
                ]}
              />
            </Card>
            <Card title="点赞数最多用户">
              <RankingSurface
                names={["乾坤道长1", "乾坤道长2", "乾坤道长3", "乾坤道长4"]}
                numbers={[64241, 523, 124, 123]}
              />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Article;
