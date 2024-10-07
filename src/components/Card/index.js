import { Card, Row } from "antd";
import "./style.css";
import React from "react";

function Cards({ showExpenseModal, showIncomeModal , currentBalance, income , expenses }) {
  return (
    <>
      <Row className="my-row">
        <Card className="my-card" title="Current balance">
          <p>Current balance is {currentBalance}₹</p>
          <div className="btn btn-blue"> Reset Balance </div>
        </Card>
        <Card className="my-card" title="Total Income ">
          <p>Income   {income}₹</p>
          <div className="btn btn-blue" onClick={showIncomeModal}>
            Add Income
          </div>
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p>Expenses is  {expenses}₹</p>
          <div className="btn btn-blue" onClick={showExpenseModal}>
            Add Expenses
          </div>
        </Card>
      </Row>
    </>
  );
}

export default Cards;
