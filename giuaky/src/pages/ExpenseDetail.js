import React from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import { formatMoney } from '../data';

export default function ExpenseDetail({
  expenses,
  onToggle
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = expenses.find(
    e => Number(e.id) === Number(id)
  );

  if (!item) {
    return (
      <section>
        <p>Không tìm thấy khoản chi.</p>

        <button onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>Chi tiết khoản chi</h1>

      <div className="detail">
        <p>
          <b>Tên khoản chi:</b> {item.title}
        </p>

        <p>
          <b>Số tiền:</b> {formatMoney(item.amount)}
        </p>

        <p>
          <b>Danh mục:</b> {item.category}
        </p>

        <p>
          <b>Ngày:</b> {item.date}
        </p>

        <p>
          <b>Trạng thái:</b>
          {item.paid
            ? 'Đã thanh toán'
            : 'Chưa thanh toán'}
        </p>
      </div>

      <button
        onClick={() =>
          onToggle(item.id, { paid: !item.paid })
        }
      >
        {item.paid
          ? 'Đánh dấu chưa trả'
          : 'Đánh dấu đã trả'}
      </button>

      {' '}

      <button onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  );
}