import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

export default function AddExpense({ expenses, onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    if (!title.trim() || amount === '' || !category || !date) {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const n = Number(amount);

    if (
      !Number.isInteger(n) ||
      n < 1000 ||
      n > 100000000
    ) {
      setMessage(
        'Số tiền phải từ 1.000 đến 100.000.000'
      );
      return;
    }

    const newExpense = {
      id: Math.max(
        0,
        ...expenses.map(x => Number(x.id))
      ) + 1,
      title: title.trim(),
      amount: n,
      category,
      date,
      paid: false
    };

    onAdd(newExpense);
    navigate('/expenses');
  }

  return (
    <section>
      <h1>Thêm khoản chi</h1>

      <form onSubmit={submit} className="expense-form">
        <label>
          Tên khoản chi
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>

        <label>
          Số tiền
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </label>

        <label>
          Danh mục
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Ngày chi
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>

        {message && <p className="error">{message}</p>}

        <button type="submit">Thêm</button>
      </form>
    </section>
  );
}