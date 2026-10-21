import React, {
  useMemo,
  useState,
  useEffect
} from 'react';

import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

export default function ExpenseList({
  expenses,
  onDelete,
  onToggle
}) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filtered = useMemo(() => {
    return expenses.filter(expense =>
      expense.title
        .toLowerCase()
        .includes(keyword.trim().toLowerCase()) &&
      (
        category === 'Tất cả' ||
        expense.category === category
      )
    );
  }, [expenses, keyword, category]);

  return (
    <section>
      <h1>Danh sách khoản chi</h1>

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
      />

      <p className="count">
        Tìm thấy {filtered.length} khoản chi
      </p>

      <ExpenseTable
        expenses={filtered}
        onToggle={onToggle}
        onDelete={onDelete}
        width={width}
      />
    </section>
  );
}