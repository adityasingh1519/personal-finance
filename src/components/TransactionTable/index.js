import { Table } from "antd";
import React, { useState } from "react";
import "./style.css";

function TransactionTable({ transactions }) {
  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("this is ", filteredTransactions);

  return (
    <>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search By name"
      />

      <Table dataSource={filteredTransactions} columns={column} />
    </>
  );
}

export default TransactionTable;
