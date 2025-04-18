import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/hook'
import { getUsers } from '../redux/slice/userSlice'
import { percentage } from '../ultils'

type DashBoardUser = {
  name: string,
  data: any[],
  percent?: number,
  sortname: string
}

const useSelectUser = () => {
  const [activeUser, setActiveUser] = useState<DashBoardUser>({ name: "", data: [], percent: 0, sortname: "" });
  const [inActiveUser, setInActiveUser] = useState<DashBoardUser>({ name: "", data: [], percent: 0, sortname: "" });
  const [closeUser, setCloseUser] = useState<DashBoardUser>({ name: "", data: [], percent: 0, sortname: "" });
  const [total, setTotal] = useState(0)
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getUsers());
      const inActive = payload.filter((item: any) => item.status == 0);
      const active = payload.filter((item: any) => item.status == 1);
      const closeUser = payload.filter((item: any) => item.status == 2);
      const len = payload.length;
      let a = percentage(len, active.length, inActive.length, closeUser.length);
      setActiveUser({ name: "Người dùng đang hoạt động", data: active, percent: a[0], sortname: "Active" });
      setInActiveUser({ name: "Người dùng  đã dừng hoạt động", data: closeUser, percent: a[1], sortname: "Close" });
      setCloseUser({ name: "Người dùng chưa xác thực", data: inActive, percent: a[2], sortname: "InActive" });
      setTotal(len)
    })();

  }, [dispatch]);

  const dayta = [{ ...activeUser }, { ...closeUser }, { ...inActiveUser }];
  return { activeUser, inActiveUser, closeUser, dayta, total }
}

export default useSelectUser;
