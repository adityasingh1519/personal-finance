import { Card, Row } from "antd";
import "./style.css";
import React from "react";

function Cards({ showExpenseModal, showIncomeModal }) {
  return (
    <>
      <Row className="my-row">
        <Card className="my-card" title="Current balance">
          <p>Current balance is 0$</p>
          <div className="btn btn-blue"> Reset Balance </div>
        </Card>
        <Card className="my-card" title="Total ">
          <p>Income 0$</p>
          <div className="btn btn-blue" onClick={showIncomeModal}>
            Add Income
          </div>
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p>Expenses is 0$</p>
          <div className="btn btn-blue" onClick={showExpenseModal}>
            Add Expenses
          </div>
        </Card>
      </Row>
    </>
  );
}

export default Cards;
