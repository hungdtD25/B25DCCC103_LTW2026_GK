import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

export default function ExpenseRow({
  expense,
  onToggle,
  onDelete
}) {
  return (
    <tr>
      <td>
        <Link to={`/expenses/${expense.id}`}>
          {expense.title}
        </Link>
      </td>

      <td className="col-category">
        {expense.category}
      </td>

      <td>{formatMoney(expense.amount)}</td>

      <td className="col-date">
        {expense.date}
      </td>

      <td>
        {expense.paid
          ? 'Đã thanh toán'
          : 'Chưa thanh toán'}
      </td>

      <td>
        <button
          onClick={() =>
            onToggle(expense.id, {
              paid: !expense.paid
            })
          }
        >
          {expense.paid
            ? 'Đánh dấu chưa trả'
            : 'Đánh dấu đã trả'}
        </button>

        {' '}

        <button
          className="danger"
          onClick={() => onDelete(expense.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}