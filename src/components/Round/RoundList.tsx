import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getItem from "../../services/getItem";
import Title from "antd/es/typography/Title";
import { useNavigate, useParams } from "react-router-dom";
import { queryErrorNotification } from "../../services/errorNotification";
import { useGetRoundsQuery } from "../../store/api/roundApi";
import CreateRoundModal from "./CreateRoundModal";

const RoundContainer = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function RoundList() {
  const navigate = useNavigate();
  const { round } = useParams();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const { data: roundList, error: roundError } = useGetRoundsQuery();

  useEffect(() => {
    if (roundError) {
      queryErrorNotification(roundError, "회차 목록");
    }
  }, [roundError]);

  useEffect(() => {
    const newItems = roundList?.map((round) => {
      return getItem(round.number + "회차", round.number);
    });
    setItems(newItems);
  }, [roundList]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/question/${e.key}`);
  };

  return (
    <RoundContainer>
      <Title level={5}>회차</Title>
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        defaultSelectedKeys={[`${round}`]}
        style={{ borderInlineEnd: "unset" }}
      />
      <CreateRoundModal />
    </RoundContainer>
  );
}

export default RoundList;
