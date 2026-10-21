import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tải dữ liệu khi ứng dụng được mở
  useEffect(() => {
    let active = true;

    async function loadApi() {
      try {
        const saved = localStorage.getItem('gk_expenses');

        if (saved) {
          const parsed = JSON.parse(saved);

          if (active) {
            setExpenses(parsed);
          }
        } else {
          const res = await axios.get('/data/expenses.json');

          if (active) {
            setExpenses(res.data);
          }
        }

        if (active) setError(false);
      } catch (err) {
        try {
          const res = await axios.get('/data/expenses.json');

          if (active) {
            setExpenses(res.data);
            setError(false);
          }
        } catch (apiErr) {
          if (active) setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadApi();

    return () => {
      active = false;
    };
  }, []);

  // Lưu dữ liệu sau khi tải xong
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        'gk_expenses',
        JSON.stringify(expenses)
      );
    }
  }, [expenses, loading]);

  // Thêm khoản chi
  const addExpense = (item) => {
    setExpenses(prev => [...prev, item]);
  };

  // Cập nhật khoản chi
  const updateExpense = (id, changes) => {
    setExpenses(prev =>
      prev.map(e =>
        e.id === id ? { ...e, ...changes } : e
      )
    );
  };

  // Xóa khoản chi
  const deleteExpense = (id) => {
    setExpenses(prev =>
      prev.filter(e => e.id !== id)
    );
  };

  if (loading) {
    return <p className="loading">Đang tải...</p>;
  }

  if (error && expenses.length === 0) {
    return <p className="loading">Không tải được dữ liệu.</p>;
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home expenses={expenses} />}
        />

        <Route
          path="/expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onToggle={updateExpense}
            />
          }
        />

        <Route
          path="/expenses/new"
          element={
            <AddExpense
              expenses={expenses}
              onAdd={addExpense}
            />
          }
        />

        <Route
          path="/expenses/:id"
          element={
            <ExpenseDetail
              expenses={expenses}
              onToggle={updateExpense}
            />
          }
        />

        <Route
          path="*"
          element={<Home expenses={expenses} />}
        />
      </Routes>
    </Layout>
  );
}