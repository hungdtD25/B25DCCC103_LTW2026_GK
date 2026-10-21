import React from 'react';
import { CATEGORIES } from '../data';

export default function FilterBar({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange
}) {
  return (
    <div className="filters">
      <label htmlFor="expense-search">
        Tìm kiếm

        <input
          id="expense-search"
          value={keyword}
          onChange={e => onKeywordChange(e.target.value)}
          placeholder="Tên khoản chi"
        />
      </label>

      <label htmlFor="expense-category">
        Danh mục

        <select
          id="expense-category"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>

          {CATEGORIES.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}