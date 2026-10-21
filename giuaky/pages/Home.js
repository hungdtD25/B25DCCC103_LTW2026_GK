import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

export default function Home({ expenses }) {
  const paid = expenses
    .filter(e => e.paid)
    .reduce((s, e) => s + Number(e.amount), 0);

  const unpaid = expenses
    .filter(e => !e.paid)
    .reduce((s, e) => s + Number(e.amount), 0);

  return (
    <section>
      <h1>Chi tiêu cá nhân</h1>

      <div className="stats">
        <article>
          <b>Tổng số khoản chi</b>
          <strong>{expenses.length}</strong>
        </article>

        <article>
          <b>Tổng số tiền đã chi</b>
          <strong>{formatMoney(paid)}</strong>
        </article>

        <article>
          <b>Tổng số tiền chưa thanh toán</b>
          <strong>{formatMoney(unpaid)}</strong>
        </article>
      </div>

      <p>
        <Link className="button" to="/expenses">
          Xem danh sách khoản chi
        </Link>
      </p>
    </section>
  );
}