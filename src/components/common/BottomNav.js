import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import group162 from "../../assets/Group 162.png"; // home
import group163 from "../../assets/Group 163.png"; // map
import group161 from "../../assets/Group 161.png"; // friend
import group164 from "../../assets/Group 164.png"; // mypage

export default function BottomNav({ top = 710, left = 24 }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { key: "home", path: "/home", icon: group162 },
    { key: "map", path: "/map", icon: group163 },
    { key: "friend", path: "/friend", icon: group161 },
    { key: "mypage", path: "/mypage", icon: group164 },
  ];

  return (
    <NavWrap $top={top} $left={left}>
      {items.map((it) => (
        <NavBtn
          key={it.key}
          type="button"
          onClick={() => navigate(it.path)}
          aria-current={pathname === it.path ? "page" : undefined}
        >
          <NavIcon src={it.icon} alt={it.key} />
        </NavBtn>
      ))}
    </NavWrap>
  );
}

const NavWrap = styled.div`
  position: absolute;
  left: ${(p) => p.$left}px;
  top: ${(p) => p.$top}px;
  width: 331px;
  height: 73px;
  display: flex;
  gap: 6px;
  z-index: 999;
`;

const NavBtn = styled.button`
  width: 78px;
  height: 73px;
  border-radius: 10px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  position: relative;
`;

const NavIcon = styled.img`
  position: absolute;
  left: 15px;
  top: 19px;
  height: auto;
`;
