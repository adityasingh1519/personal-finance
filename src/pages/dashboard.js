import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import { Modal } from "antd";

function Dashboard() {
  const [isExpenseModalVisisble, setisExpenseModalVisisble] = useState(false);
  const [isIncomeModalVisisble, setisIncomeModalVisisble] = useState(false);

  const showExpenseModal = () => {
    setisExpenseModalVisisble(true);
  };

  const hideExpenseModal = () => {
    setisExpenseModalVisisble(false);
  };

  const showIncomeModal = () => {
    setisIncomeModalVisisble(true);
  };

  const hideIncomeModal = () => {
    setisIncomeModalVisisble(false);
  };

  return (
    <>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <Modal
        title="Expense Modal"
        open={isExpenseModalVisisble}
        onCancel={hideExpenseModal}
      >
        <p>Expense</p>
      </Modal>

      <Modal
        title="Income Modal"
        open={isIncomeModalVisisble}
        onCancel={hideIncomeModal}
      >
        <p>Income</p>
      </Modal>
    </>
  );
}

export default Dashboard;
