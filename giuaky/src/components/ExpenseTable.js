import React from 'react';
import ExpenseRow from './ExpenseRow';

export default function ExpenseTable({
  expenses,
  onToggle,
  onDelete,
  width
}) {
  if (expenses.length === 0) {
    return <p>Không có dữ liệu.</p>;
  }

  return (
    <div className="table-wrap">
      <table className={width < 768 ? 'mobile' : ''}>
        <thead>
          <tr>
            <th>Khoản chi</th>
            <th className="col-category">Danh mục</th>
            <th>Số tiền</th>
            <th className="col-date">Ngày</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(expense => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}