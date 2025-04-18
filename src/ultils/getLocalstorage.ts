import { useState, useEffect } from "react";

// Custom hook để lấy dữ liệu từ localStorage
const useLocalStorage = (key: string) => {
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        setStoredData(JSON.parse(data)); // Giải mã dữ liệu từ JSON
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, [key]); // Dependency là `key`, sẽ cập nhật mỗi khi key thay đổi

  return storedData;
};

export default useLocalStorage;
