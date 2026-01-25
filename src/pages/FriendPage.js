import styled from "styled-components";
import { useSelector } from "react-redux";
import BottomNav from "../components/common/BottomNav";

// assets (너 프로젝트에 맞게 경로/파일명만 맞추면 됨)
import logoImg from "../assets/logo.png"; // chat-gpt-image... 대체(상단 로고)
import group157 from "../assets/group-157.png"; // 유저 아이콘 (svg면 .svg로)
import rect254 from "../assets/Rectangle-254.png";
import unionSvg from "../assets/Union1.png"; // union0.svg를 png로 쓰는 중이면 그대로
import bgi1 from "../assets/bgi.png"; // bgi-10.png

import group168 from "../assets/Group-168.png"; // 친구 아이콘(좌측)
import group165 from "../assets/Group-165.png"; // 돋보기/추가 등(우측)

import upIcon from "../assets/upIcon.png";
import downIcon from "../assets/downIcon.png";
import listIcon from "../assets/listIcon.png";

import friendRowIcon from "../assets/Group-159.png"; // 왼쪽 작은 아이콘 (각 row)
import folderIcon from "../assets/folder.png"; // 폴더 아이콘

export default function FriendPage() {
  const rawUser = useSelector((state) => state.auth?.user);
  const user = rawUser?.found ?? rawUser;

  const displayName = user?.name || user?.id || "Admin";

  // ✅ 목업 친구 리스트 (나중에 API로 교체)
  const friends = [
    { id: "u1", name: "졸려", intro: "자기를 소개하는 칸.", folder: true },
    { id: "u2", name: "딸기맛있디", intro: "저는 졸려예요.", folder: true },
    { id: "u3", name: "초코가좋지", intro: "반가워요.", folder: true },
    { id: "u4", name: "당떨어져", intro: "환영합니다.", folder: true },
    { id: "u5", name: "반갑", intro: "내일이라고요?", folder: true },
  ];

  const limit = 40;

  return (
    <Root>
      <Border />
      <OuterFrame />
      <Rect253Img src={rect254} alt="" />
      <TopLogo src={logoImg} alt="" />
      <Brand>LUCKYVICKY</Brand>

      
      <Rect253 />

      <Panel>
        <Union src={unionSvg} alt="" />
        <Bgi src={bgi1} alt="" />

        <FriendTitle>
          <TitleIcon src={group168} alt="" />
          <TitleText>
            내 친구 ({friends.length}/{limit})
          </TitleText>
          <TitleAction src={group165} alt="" />
        </FriendTitle>

        {/* 오른쪽 세로바 */}
        <ScrollBar>
          <ScrollBtnTop src={upIcon} alt="" />
          <ScrollBtnBottom src={downIcon} alt="" />
          <ScrollThumb>
            <ThumbBg />
            <ThumbIcon src={listIcon} alt="" />
          </ScrollThumb>
        </ScrollBar>

        {/* 친구 리스트 */}
        <ListWrap>
          {friends.map((f, idx) => (
            <Row key={f.id} $top={rowTop(idx)}>
              <RowLeftIcon src={friendRowIcon} alt="" />
              <RowText>
                <Name>{f.name}</Name>
                <Intro>({f.intro})</Intro>
              </RowText>
              {f.folder && <RowFolder src={folderIcon} alt="" />}
            </Row>
          ))}
        </ListWrap>

        {/* ✅ 하단 네비 (FriendPage는 Panel 기준 top:605 느낌) */}
       
      </Panel>
      <BottomNav top={710} left={24} />
      <UserIcon src={group157} alt="" />
      <UserName>{displayName}</UserName>
    </Root>
  );
}

/** 디자인상 각 row top을 원본처럼 고정 배치 */
function rowTop(idx) {
  // 원본: 70 / 94.33 / 118.65 / 142.98 / 167.31
  const tops = [70, 94.33, 118.65, 142.98, 167.31];
  return tops[idx] ?? 70 + idx * 24.33;
}

/* =================== styles =================== */

const Root = styled.div`
  background: #ffffff;
  border: 0.5px solid #000000;
  height: 812px;
  width: 375px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  * {
    box-sizing: border-box;
  }
`;

const Border = styled.div`
  border-radius: 10px;
  border: 0.5px solid #000000;
  width: 375px;
  height: 812px;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const OuterFrame = styled.div`
  background: #acdb68;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid rgba(74, 103, 32, 0.5);
  width: 375px;
  height: 812px;
  position: absolute;
  left: 0px;
  top: 0px;
  box-shadow: inset 0px 5px 5px 0px rgba(208, 250, 148, 1),
    inset 0px -8px 15px 0px rgba(208, 250, 148, 0.5),
    inset 0px -4px 4px 0px rgba(140, 188, 71, 1),
    inset 4px 0px 6px 0px rgba(140, 188, 71, 0.5),
    inset -4px 0px 6px 0px rgba(140, 188, 71, 0.5);
`;

const TopLogo = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  top: 9px;
  object-fit: cover;
`;

const Brand = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 800;
  font-style: italic;
  position: absolute;
  left: 48px;
  top: 13px;
`;

const Rect253 = styled.div`
  border: 1px solid #4a6720;
  width: 375px;
  height: 764px;
  position: absolute;
  left: 0px;
  top: 50px;
  box-shadow: inset -4px 0px 6px 0px rgba(170, 170, 170, 0.5),
    inset 4px 0px 6px 0px rgba(170, 170, 170, 0.5);
`;

const Rect253Img = styled.img`
  width: 371px;
  height: 761px;
  position: absolute;
  left: 2px;
  top: 50px;
  object-fit: cover;
 
`;

const Panel = styled.div`
  background: #f7fbea;
  border-radius: 10px;
  border: 1.5px solid #919191;
  width: 350px;
  height: 691px;
  position: absolute;
  left: 13px;
  top: 105px;
  overflow: hidden;
`;

const Union = styled.img`
  width: 331px;
  height: 646px;
  position: absolute;
  left: 10px;
  top: 33px;
`;

const Bgi = styled.img`
  width: 331px;
  height: 583px;
  position: absolute;
  left: 10px;
  top: 30px;
  object-fit: cover;
`;

const FriendTitle = styled.div`
  position: absolute;
  left: 21px;
  top: 46px;
  height: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TitleIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const TitleText = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
`;

const TitleAction = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  object-fit: contain;
`;

const ScrollBar = styled.div`
  background: #fcfbf9;
  border: 0.5px solid rgba(172, 172, 172, 0.5);
  width: 22px;
  height: 427px;
  position: absolute;
  left: 319px;
  top: 55px;
`;

const ScrollBtnTop = styled.img`
  width: 29px;
  height: 29px;
  position: absolute;
  left: -4px;
  top: -4px;
`;

const ScrollBtnBottom = styled.img`
  width: 29px;
  height: 29px;
  position: absolute;
  left: -4px;
  top: 402px;
`;

const ScrollThumb = styled.div`
  width: 29px;
  height: 167px;
  position: absolute;
  left: -4px;
  top: 10px;
`;

const ThumbBg = styled.div`
  background: #c2d3f8;
  border-radius: 3px;
  border: 1.5px solid #000;
  width: 68.75%;
  height: 78.12%;
  position: absolute;
  right: 15.62%;
  left: 15.62%;
  bottom: 12.5%;
  top: 9.38%;
  box-shadow: 0.5px 0.5px 1px 0.5px rgba(0, 0, 0, 0.25);
`;

const ThumbIcon = styled.img`
  width: 11.34px;
  height: 11.34px;
  position: absolute;
  left: 10px;
  top: 75px;
`;

const ListWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const Row = styled.div`
  width: 215.47px;
  height: 19.69px;
  position: absolute;
  left: 42px;
  top: ${(p) => p.$top}px;
`;

const RowLeftIcon = styled.img`
  height: auto;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const RowText = styled.div`
  position: absolute;
  left: 24.33px;
  top: 2.32px;
  text-align: left;
`;

const Name = styled.span`
  color: #000000;
  font-family: "Inter", sans-serif;
  font-size: 13.9009895px;
  font-weight: 600;
`;

const Intro = styled.span`
  margin-left: 2px;
  color: #387eff;
  font-family: "Inter", sans-serif;
  font-size: 11.5841579px;
  font-weight: 400;
`;

const RowFolder = styled.img`
  width: 19.69px;
  height: 19.69px;
  position: absolute;
  left: 180px; /* 원본마다 다르긴 한데 일단 평균 */
  top: 0px;
`;

const UserIcon = styled.img`
  height: auto;
  position: absolute;
  left: 52.62px;
  top: 62.59px;
  transform: translate(-34.15px, -1.12px);
`;

const UserName = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  left: 69px;
  top: 60px;
`;
