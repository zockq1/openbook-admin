import styled, { ThemeContext, css } from "styled-components";
import Icon from "../atoms/Icon";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

interface IsCurrent {
  $isCurrent: boolean;
}

const StyledSideMenuItem = styled(Link)<IsCurrent>`
  display: flex;
  align-items: center;
  width: 196px;
  height: 52px;
  padding: 16px;
  margin-top: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          font-weight: ${({ theme }) => theme.fontWeight.bold};
          background-color: ${({ theme }) => theme.colors.white};
          box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
        `
      : css`
          font-weight: ${({ theme }) => theme.fontWeight.regular};
          background-color: transparent;
        `}
`;

const IconBox = styled.div<IsCurrent>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};
  box-shadow: ${({ theme }) => theme.shadow.small};
  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          background-color: ${({ theme }) => theme.colors.blue};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.white};
        `}
`;

interface SideMenuItemProps {
  icon: string;
  title: string;
  to: string;
}

function SideMenuItem({ icon, title, to }: SideMenuItemProps) {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const isCurrent = location.pathname.startsWith(to);

  return (
    <li>
      <StyledSideMenuItem to={to} $isCurrent={isCurrent}>
        <IconBox $isCurrent={isCurrent}>
          <Icon
            category={icon}
            size={24}
            color={isCurrent ? theme.colors.white : theme.colors.lightGrey}
          />
        </IconBox>
        &nbsp;&nbsp;&nbsp;{title}
      </StyledSideMenuItem>
    </li>
  );
}

export default SideMenuItem;
