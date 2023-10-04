import styled, { css } from "styled-components";
import ContentBox from "../../commons/ContentBox";

interface SmallItemType {
  name: string;
  key: string;
  onClick: () => void;
}

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface ItemProps {
  $isCurrent: boolean;
}
const Item = styled.li<ItemProps>`
  margin: 10px;
  padding: 5px;
  width: max-content;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
          font-weight: ${({ theme }) => theme.fontWeight.medium};
          background-color: ${({ theme }) => theme.colors.blue};
          color: ${({ theme }) => theme.colors.white};
        `
      : css`
          font-weight: ${({ theme }) => theme.fontWeight.bold};
          background-color: ${({ theme }) => theme.colors.white};
        `}
  cursor: pointer;
`;

interface SmallItemListProps {
  itemList: SmallItemType[];
  currentItemKey: string;
  title: React.ReactNode;
  option: React.ReactNode;
}

function SmallItemListUI({
  itemList,
  currentItemKey,
  title,
  option,
}: SmallItemListProps) {
  return (
    <ContentBox title={title} option={option}>
      <ItemList>
        {itemList.map((item) => {
          return (
            <Item
              key={item.key}
              onClick={item.onClick}
              $isCurrent={currentItemKey === item.key}
            >
              {item.name}
            </Item>
          );
        })}
      </ItemList>
    </ContentBox>
  );
}

export default SmallItemListUI;
