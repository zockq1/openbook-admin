import { Button, Input, Menu, MenuProps, Modal, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setChapter } from "../store/slices/chapterSlice";
import getItem from "../services/getItem";
import Title from "antd/es/typography/Title";
import {
  useAddChapterMutation,
  useGetChaptersQuery,
} from "../store/api/chapterApi";

const ChpterContainer = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function ChapterList() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [chapterMap, setChapterMap] = useState<Map<number, string>>(new Map());
  // const [chapterList, setChapterList] = useState({
  //   titleList: [
  //     "동아시아 역사의 시작",
  //     "동아시아 세계의 성립과 변화",
  //     "동아시아의 사회 변동과 문화 교류",
  //   ],
  //   numberList: [1, 2, 3],
  // });

  const { data: chapterList, isError, error } = useGetChaptersQuery();
  console.log(chapterList, error);
  const [addChapter] = useAddChapterMutation();

  useEffect(() => {
    const newItems = chapterList?.numberList.map((number) =>
      getItem(number + "단원", number)
    );
    setItems(newItems);

    const newChapterMap = new Map();
    chapterList?.numberList.forEach((number, index) => {
      newChapterMap.set(number, chapterList?.titleList[index]);
    });
    setChapterMap(newChapterMap);
  }, [chapterList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const { chapterTitle, chapterNumber } = values;
      await addChapter({
        number: chapterNumber,
        title: chapterTitle,
      });
      console.log("챕터 추가 성공");
    } catch (error) {
      console.error(error);
    }
    // chapterList.numberList.push(Number(values.chapterNumber));
    // chapterList.titleList.push(values.chapterTitle);
    // setChapterList({
    //   titleList: chapterList.titleList,
    //   numberList: chapterList.numberList,
    // });
    setIsModalOpen(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    dispatch(
      setChapter({
        title: chapterMap.get(Number(e.key)) || "",
        number: Number(e.key),
      })
    );
  };

  return (
    <ChpterContainer>
      <Title level={5}>단원{}</Title>
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        style={{ borderInlineEnd: "unset" }}
      />

      <Button onClick={showModal} style={{ width: "90%" }}>
        +
      </Button>
      <Modal
        title="단원 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="chapter-form" onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="chapterTitle"
            label="단원명"
            rules={[
              {
                required: true,
                message: "단원명을 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="chapterNumber"
            label="단원 순서"
            rules={[
              {
                required: true,
                message: "단원 순서를 입력해주세요.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ChpterContainer>
  );
}

export default ChapterList;
