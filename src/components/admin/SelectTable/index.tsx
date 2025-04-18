import React, { useEffect, useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import {
  Button,
  message,
  Table,
  } from 'antd';
import { compareDate, ConditionType } from '../../../ultils';
import { FaExchangeAlt } from 'react-icons/fa';
import { PAGE_SIZE } from '../../../ultils/data';
import { useAppDispatch } from './../../../redux/hook';
import type { TableRowSelection } from "antd/es/table/interface";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
type Props = {
  columns: any;
  data: any;
  loading?: boolean;
  statusUpdate?: any;
  currStatus?: any;
  type?: ConditionType;
  api?: {
    read: AsyncThunk<any, void, {}>;
    update: AsyncThunk<any, any, {}>
  } | any
};

const SelectTable = ({ columns, api, data, loading, statusUpdate, currStatus, type }: Props) => {
  const [selection, setSelection] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSelect, setDataSelect] = useState<any>([]);
  const [flagAll, setFlagAll] = useState<boolean>(false);
  const [overDate, setOverDate] = useState<any>({ status: false, dataOver: [], });
  const [overDateVC, setOverDateVC] = useState<any>({ status: false, dataOver: [], });
  const [allDataOverDate, setAllDataOverDate] = useState<any>([]);
  const [allDataOverDateVC, setAllDataOverDateVC] = useState<any>([]);

  const dispatch = useAppDispatch();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getInfoSelectFromTable = (input: any) => {
    if (input) {
      let dataSelect = data?.filter((_: any, index: any) =>
        input.includes(index + 1)
      );
      return dataSelect;
    }
  };

  useEffect(() => {
    let select = contructor();
    setSelection(select);
    singleClick();
    if (type == "releaseDate") {
      let detail = compareDate(data, "releaseDate");
      setAllDataOverDate(detail);
    } else if (type == "timeEnd") {
      let detail = compareDate(data, "timeEnd");
      setAllDataOverDateVC(detail);
    }
  }, [selectedRowKeys, data, type]);

  const contructor = () => {
    const selecttionsss = [
      {
        key: "selectTab",
        text: "All",
        onSelect: (changableRowKeys: any[]) => {
          let data = getInfoSelectFromTable(changableRowKeys);
          setSelectedRowKeys(changableRowKeys);
          setDataSelect(data);
        },
      },
      {
        key: "none",
        text: "None",
        onSelect: (_: any[]) => {
          clearAll();
        },
      },
    ];
    let releaseDate = {
      key: "releaseDate",
      text: "Release over a month",
      onSelect: (changableRowKeys: any[]) => {
        let data = getInfoSelectFromTable(changableRowKeys);
        let detail = compareDate(data, "releaseDate");
        if (detail?.length > 0 && typeof detail !== "string") {
          let mapKey = detail?.map((item: any) => item?.key);
          setSelectedRowKeys(mapKey);
          setDataSelect(detail);
          setFlagAll(false);
          setOverDate({
            status: true,
            dataOver: detail,
          });
        }
      },
    };
    let timeEnd = {
      key: "timeEnd",
      text: "voucherOverDate",
      onSelect: (changableRowKeys: any[]) => {
        let data2 = getInfoSelectFromTable(changableRowKeys);
        let detail: any = compareDate(data2, "timeEnd");
        let mapKey = detail?.map((item: any) => item?.key);
        setSelectedRowKeys(mapKey);
        setDataSelect(detail);
        setFlagAll(false);
        setOverDateVC({
          status: true,
          dataOver: detail,
        });
      },
    };
    if (type == "releaseDate") selecttionsss.push(releaseDate);
    else if (type == "timeEnd") selecttionsss.push(timeEnd);

    return selecttionsss;
  };

  const singleClick = async () => {
    if (selectedRowKeys) {
      let dataGet = await getInfoSelectFromTable(selectedRowKeys);
      if (selectedRowKeys?.length == data?.length) {
        setFlagAll(true);
        setDataSelect(data);
      } else {
        setDataSelect(dataGet);
      }
    }
  };

  const selectAll = () => {
    let keyAll = data?.map((item: any) => item?.key);
    setSelectedRowKeys(keyAll);
    setDataSelect(data);
    setFlagAll(true);
  };
  const selectAllOverDate = () => {
    if (type == "releaseDate") {
      let keyAll = allDataOverDate?.map((item: any) => item?.key);
      setSelectedRowKeys(keyAll);
      setDataSelect(allDataOverDate);
      setFlagAll(true);
      setOverDate({ status: false });
    } else {
      let keyAll = allDataOverDateVC?.map((item: any) => item?.key);
      setSelectedRowKeys(keyAll);
      setDataSelect(allDataOverDateVC);
      setFlagAll(true);
      setOverDateVC({ status: false });
    }
  };
  const clearAll = () => {
    setSelectedRowKeys([]);
    setDataSelect([]);
    setFlagAll(false);
    setOverDate({ status: false });
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: selection,
  };
  const handleChange = () => {
    let payload = {
      data: dataSelect,
      status: statusUpdate,
    };
    dispatch(api.update(payload))
      .unwrap()
      .then((_: any) => {
        message.success("update thành công");
        dispatch(api.read()).then(() => {
          clearAll()
        })
      })
      .catch(() => message.error("Lỗi"));
  };

  return (
    <>
      {selectedRowKeys?.length > 0 && (
        <div className="action w-full bg-gray-100 flex-wrap p-3 ">
          <div className="selector flex justify-center items-center">
            All
            <span className="font-bold px-1">{selectedRowKeys?.length}</span>
            items on this page are selected.
            {flagAll == false ? (
              <>
                {type == "releaseDate" ? (
                  <>
                    {overDate.status == false ? (
                      <Button type="link" onClick={selectAll}>
                        Select all {data?.length}
                      </Button>
                    ) : (
                      <>

                        <Button type="link" onClick={selectAllOverDate}>
                          Select all
                          <span className="font-bold px-1">
                            {allDataOverDate?.length}
                          </span>
                          {currStatus == 0 ? "in over-date" : "to active"}
                        </Button>

                      </>
                    )}
                  </>
                ) : (
                  <>
                    {overDateVC.status == false ? (
                      <Button type="link" onClick={selectAll}>
                        Select all {data?.length}
                      </Button>
                    ) : (
                      <>

                        <Button type="link" onClick={selectAllOverDate}>
                          Select all
                          <span className="font-bold px-1">
                            {allDataOverDateVC?.length}
                          </span>
                          {currStatus == 0 ? "in over-date" : "to active"}
                        </Button>

                      </>
                    )}


                  </>
                )}
              </>
            ) : (
              <Button type="link" onClick={clearAll}>
                Clear All
              </Button>
            )}
          </div>
          <div className="optional flex justify-center items-center">
            <div className="flex justify-center items-center">
              <Button type="text" style={{ cursor: "default" }}>
                {currStatus == 0 ? "Hoạt động" : "Dừng hoạt động"}
              </Button>
              <FaExchangeAlt />
              <Button type="link" onClick={handleChange}>
                {currStatus == 0 ? "Dừng hoạt động" : "Hoạt động "}
              </Button></div>
          </div>
        </div>
      )}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={data && data?.length > PAGE_SIZE && {
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"]
        }}
      />
    </>
  );
};

export default SelectTable;
