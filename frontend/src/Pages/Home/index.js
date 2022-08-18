import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionList from "../../Components/TransactionList/TransactionList";
import Loader from "../../Components/Loader/Loader";
import { getAllTransactionAction } from "../../Redux/Slices/Transaction/getTransactionSlice";

function Home() {
  const dispatch = useDispatch();
  const { loader, data } = useSelector((state) => state.getAllTransactions);
  const [transactionData, setTransactionData] = useState();

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setTransactionData(data);
    }
  }, [data]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        !!transactionData && <TransactionList data={transactionData} />
      )}
    </>
  );
}

export default Home;
