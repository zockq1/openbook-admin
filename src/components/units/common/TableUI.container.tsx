import styled, { css } from "styled-components";
import ContentBox from "../../commons/ContentBox";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  & th {
    position: sticky;
    top: 0px;
    padding: 6px;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

interface TableRowProps {
  $isCurrent: boolean;
}

const TableRow = styled.tr<TableRowProps>`
  border-bottom: 1pt solid ${({ theme }) => theme.colors.border};
  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
          background-color: ${({ theme }) => theme.colors.blue};
          color: ${({ theme }) => theme.colors.white};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.white};
        `}

  &:hover {
    background-color: ${({ theme, $isCurrent }) =>
      !$isCurrent && theme.colors.bg};
  }

  & > td {
    padding: 6px;
  }
`;

interface TableItemListModel {
  data: Record<string, any>;
  key: string;
  onClick: () => void;
}

interface TableUIProps {
  tableHead: { name: string; title: string }[];
  itemList: TableItemListModel[];
  currentItemKey: string;
  title: React.ReactNode;
  option: React.ReactNode;
}

function TableUI({
  itemList,
  currentItemKey,
  title,
  option,
  tableHead,
}: TableUIProps) {
  return (
    <ContentBox title={title} option={option} height={300}>
      <div></div>
      <Table>
        <thead>
          <tr>
            {tableHead.map((columnName) => (
              <th key={columnName.name}>{columnName.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <TableRow
                key={item.key}
                onClick={item.onClick}
                $isCurrent={currentItemKey === item.key}
              >
                {tableHead.map((columnName) => (
                  <td key={columnName.name}>{item.data[columnName.name]}</td>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </ContentBox>
  );
}

export default TableUI;
