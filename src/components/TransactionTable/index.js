import { Table, Select, Radio } from "antd";
import React, { useState } from "react";
import "./style.css";
import { parse } from "papaparse";
import { toast } from "react-toastify";
const { Option } = Select;

function TransactionTable({
  transactions,
  exportToCsv,
  addTransaction,
  fetchTransaction,
}) {
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
      dataIndex: "Date",
      key: "Date",
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
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [importedFile, setImportedFile] = useState(null);

  const filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.Date) - new Date(b.Date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  function importFromCsv(event) {
    event.preventDefault();
    setImportedFile(event.target.files[0]);
    try {
      parse(importedFile, {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transactions", transaction);
            const newImpotedTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };

            await addTransaction(newImpotedTransaction, true);
          }
          console.log("Parsing complete:", results);
          toast.success("All Transactions Added");
          event.target.files = null;
          fetchTransaction();
        },
      });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <div style={{ justifyContent: "space-between" }} className="d-flex my-2 ">
        <input
          className="select-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="search By name"
        />

        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>

        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "400px",
          }}
        >
          <button className="btn" onClick={exportToCsv}>
            Export to CSV
          </button>
          <label for="file-csv" className="btn btn-blue">
            Import from CSV
          </label>
          <input
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={column} />
    </>
  );
}

export default TransactionTable;
