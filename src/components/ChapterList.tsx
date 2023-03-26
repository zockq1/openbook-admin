import { Menu, MenuProps } from "antd";
import React from "react";
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
  getItem(
    "Group",
    "grp",
    null,
    [
      getItem("1단원", "1"),
      getItem("2단원", "2"),
      getItem("3단원", "3"),
      getItem("4단원", "4"),
      getItem("5단원", "5"),
    ],
    "group"
  ),
];

const ChpterMenu = styled(Menu)`
  height: 100vh;
  width: 90px;
`;

function ChapterList() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <ChpterMenu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
}

export default ChapterList;
