import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Trang chủ
      </NavLink>

      <NavLink to="/expenses">
        Danh sách
      </NavLink>

      <NavLink to="/expenses/new">
        Thêm mới
      </NavLink>
    </nav>
  );
}