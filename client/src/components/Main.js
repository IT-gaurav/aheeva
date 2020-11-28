import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

const io = require("socket.io-client");
const socket = io("http://localhost:4000/", {
  withCredentials: true,
});

// let objects = [];

const Main = () => {
  // let data;
  // let objects = [];

  let [tableData, setTableData] = useState([]);
  let [data, setData] = useState([]);

  const fnConnect = () => {
    const objects = [];
    console.log("button clicked");
    socket.on("conn", (arr) => {
      let arr1 = arr.map((e) => {
        return e.split("-");
      });

      arr1.forEach((e) => {
        setTableData((prev) => [
          ...prev,
          {
            timestamp: Date.now(),
            id: e[0] + "__" + e[1],
            duration: +e[1],
          },
        ]);
      });
    });
  };

  useEffect(() => {
    setData(tableData);
    console.log("hello");
  }, [tableData]);

  console.log(data);

  const columns = ["timestamp", "id", "duration"];

  const options = {
    filterType: "checkbox",
    pagination: true,
    sortDescFirst: true,
  };

  return (
    <>
      <div className="wrapper">
        <button className="button" onClick={fnConnect}>
          Connect
        </button>
      </div>

      <MUIDataTable
        title={"List of Data"}
        data={data.sort((a, b) => +b.timestamp - +a.timestamp)}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default Main;
