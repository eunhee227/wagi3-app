import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import group162 from "../../assets/Group 162.png"; // home
import group163 from "../../assets/Group 163.png"; // map
import group161 from "../../assets/Group 161.png"; // friend
import group164 from "../../assets/Group 164.png"; // mypage

export default function BottomNav({
  left = 8,
  top = 648,
  width = 331,
  height = 73,
}) {
    console.log("icons:", group162, group163, group161, group164);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { key: "home", path: "/home", icon: group162, label: "home" },
    { key: "map", path: "/map", icon: group163, label: "map" },
    { key: "friend", path: "/friend", icon: group161, label: "friend" },
    { key: "mypage", path: "/mypage", icon: group164, label: "mypage" },
  ];

  return (
    <NavWrap $left={left} $top={top} $width={width} $height={height}>
      {items.map((it) => (
        <NavBtn
          key={it.key}
          type="button"
          onClick={() => navigate(it.path)}
          aria-label={it.label}
          $active={pathname === it.path}
        >
          <NavIcon src={it.icon} alt="" />
        </NavBtn>
      ))}
    </NavWrap>
  );
}

const NavWrap = styled.div`
  position: absolute;
  left: ${(p) => p.$left}px;
  top: ${(p) => p.$top}px;
  width: ${(p) => p.$width}px;
  height: ${(p) => p.$height}px;
  display: flex;
  gap: 6px;
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

  opacity: ${(p) => (p.$active ? 1 : 0.92)};
  transform: ${(p) => (p.$active ? "translateY(0px)" : "translateY(1px)")};
`;

const NavIcon = styled.img`
  position: absolute;
  left: 15px;
  top: 15px;
  height: auto;
`;
