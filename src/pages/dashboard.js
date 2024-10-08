import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import AddExpence from "../components/Modals/addExpence";
import AddIncomeModal from "../components/Modals/addIncome";
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { unparse } from "papaparse";

function Dashboard() {
  const [isExpenseModalVisisble, setisExpenseModalVisisble] = useState(false);
  const [isIncomeModalVisisble, setisIncomeModalVisisble] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);

  const [loading, setloading] = useState([]);

  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

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

  const onFinish = (values, type) => {
    console.log("on finish ", values, type);
    const newTransaction = {
      type: type,
      Date: values.date.format("YYYY-MM-DD"),
      name: values.name,
      tag: values.tag,
      amount: parseFloat(values.amount),
    };

    setTransactions([...transactions, newTransaction]);
    addTransaction(newTransaction);
  };

  useEffect(() => {
    fetchTransaction();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransaction() {
    setloading(true);
    if (user) {
      const q = query(collection(db, `user/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setloading(false);
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
    } catch (e) {
      toast.error("Couldn't add transaction");
      console.log(e.message);
    }
  }

  function exportToCsv() {
    const csv = unparse({
      fields: ["name", "type", "tag", "Date", "amount"],
      transactions,
    });

    const blob = new Blob([csv], { type: "text/csv; charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
  }

  return (
    <>
      <Header />

      {loading ? (
        <p> loading </p>
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
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

          <div style={{ margin: "2rem" }}>
            <TransactionTable transactions={transactions} />
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
