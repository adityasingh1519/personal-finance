import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import AddExpence from "../components/Modals/addExpence";
import AddIncomeModal from "../components/Modals/addIncome";
import moment from "moment";



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

   const  onFinish = (values, type) => {
    console.log("on finish ", values, type);
     const  newTransaction = {
      type: type,
      Date : moment(values.date).format('YYYY-MM-DD'),
      name: values.name,
      tag : values.tag,
      amount : parseFloat(values.amount)
     }


     addTransaction(newTransaction);

     async function addTransaction(transaction, many) {
      try {
       
      } catch (e) {
      
      }
    }
  };

  return (
    <>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <AddExpence
        isExpenseModalVisisble={isExpenseModalVisisble}
        hideExpenseModal={hideExpenseModal}
        onFinish={onFinish}
      ></AddExpence>

      <AddIncomeModal
        isIncomeModalVisisble={isIncomeModalVisisble}
        hideIncomeModal={hideIncomeModal}
        onFinish={onFinish}
      ></AddIncomeModal>
    </>
  );
}

export default Dashboard;
