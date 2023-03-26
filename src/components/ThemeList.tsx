import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("1번 주제", "1"),
  getItem("2번 주제", "2"),
  getItem("3번 주제", "3"),
  getItem("4번 주제", "4"),
  getItem("5번 주제", "5"),
  getItem("6번 주제", "6"),
  getItem("7번 주제", "7"),
  getItem("8번 주제", "8"),
  getItem("9번 주제", "9"),
  getItem("10번 주제", "10"),
];

const ThemeMenu = styled(Menu)`
  height: 100vh;
  width: 240px;
`;

function ThemeList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <ThemeMenu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
}

export default ThemeList;
