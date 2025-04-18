import React, { useState } from "react";
import { Empty, Table } from "antd";
import styled from "styled-components";
import { PAGE_SIZE } from "../../../ultils/data";
interface DataTableProps {
  column: any[];
  data?: any[];
  scrollWidth?: any;
  size?: "small" | "middle" | "large";
  loading?: boolean;
}

const DataTable = ({
  data,
  column,
  scrollWidth,
  size = "small",
  loading,
}: DataTableProps) => {
  return (
    <>
      <TableWrapper>
        <Table
          dataSource={data?.map((item, index) => {
            return { ...item, key: index + 1 };
          })}
          columns={[
            {
              title: "#",
              dataIndex: "key",
              width: 30,
              fixed: "left",
            },
            ...column,
          ]}
          scroll={scrollWidth ? scrollWidth : {}}
          size={size}
          locale={{
            emptyText: (
              <div style={{ padding: "16px 0 0" }}>
                <Empty
                  description="Không tìm thấy dữ liệu"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            ),
          }}
          loading={loading}
          pagination={data && data?.length > PAGE_SIZE && {
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30"]
          }}
        />
      </TableWrapper>
    </>
  );
};

export default DataTable;

const TableWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;

  & .ant-table-content {
    min-height: 165px;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--ant-primary-color);
    }

    & .ant-table-thead > tr > th {
      background-color: #f2f2f2;
    }
  }

  & .ant-table-row td:first-child {
    text-align: center;
  }

  & .ant-table-empty {
    & .ant-table-tbody > tr > td {
      border-bottom: 0;
    }

    & table {
      min-height: 430px;
    }
  }
  & .ant-pagination {
    margin-right: 16px;
    margin-left: 16px;
  }

  & .ant-table.ant-table-small .ant-table-thead > tr > th,
  .ant-table.ant-table-small .ant-table-tbody > tr > td {
    /* padding: 8px 16px; */
  }

  & .ant-pagination.mini .ant-pagination-item,
  & .ant-pagination.mini .ant-pagination-prev,
  & .ant-pagination.mini .ant-pagination-next {
    min-width: 0;
    height: 0px;
    line-height: 0px;
  }
`;
