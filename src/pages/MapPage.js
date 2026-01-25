import { useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import BottomNav from "../components/common/BottomNav";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// assets
import unionSvg from "../assets/Union0.png"; 
import profileImg from "../assets/logo.png";
import group157 from "../assets/group-157.png";
import bg254 from "../assets/Rectangle-254.png";

// ✅ Leaflet 기본 마커 이미지가 CRA에서 종종 깨져서 직접 세팅
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
  getPosts,
  groupPostsByExactLatLng,
  formatKoreanDateTime,
} from "../mock/mockPostsDB";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  const rawUser = useSelector((state) => state.auth?.user);
  const user = rawUser?.found ?? rawUser;
  const displayName = user?.name || user?.username || user?.id || "Admin";

  // ✅ 게시글 로드
  const posts = useMemo(() => getPosts(), []);
  // ✅ 게시글 -> 핀 그룹 생성(동일 lat/lng 기준)
  const pinGroups = useMemo(() => groupPostsByExactLatLng(posts), [posts]);

  // ✅ 핀 선택 상태
  const [selectedPin, setSelectedPin] = useState(null);

  // ✅ 목업 핀 데이터 (좌표는 예시: 서울)
  const center = pinGroups.length
    ? [pinGroups[0].lat, pinGroups[0].lng]
    : [37.5665, 126.9780];

  return (
    <Root>
      <OuterFrame />
      <BgImg src={bg254} alt="" />
      <InnerBorder />

      {/* 상단 */}
      <TopLeftProfile src={profileImg} alt="" />
      <Brand>LUCKYVICKY</Brand>

      <UserIcon src={group157} alt="" />
      <UserName>{displayName}</UserName>

      {/* 메인 패널 */}
      <Panel>
        <UnionImg src={unionSvg} alt="" />

        <GuideText>{selectedPin ? "행운을 찾았습니다." : "핀을 선택하세요~"}</GuideText>

        <MapFrame>
          <MapContainer
            center={center}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              // ✅ 무료 OpenStreetMap 타일
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {pinGroups.map((g) => (
              <Marker
                key={g.pinId}
                position={[g.lat, g.lng]}
                eventHandlers={{
                  click: () => setSelectedPin(g),
                }}
              >
                <Popup>
                  {g.items.length}개 게시글<br />
                  {g.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </MapFrame>

        {/* 핀 클릭 시 리스트 패널 */}
        {selectedPin && (
          <LuckyPanel>
            <LuckyHeader>
              <LuckyHeaderTitle>행운을 찾았습니다</LuckyHeaderTitle>
              <LuckyCloseBtn type="button" onClick={() => setSelectedPin(null)}>
                ✕
              </LuckyCloseBtn>
            </LuckyHeader>

            <LuckyBody>
              <AddressBox>{selectedPin.address}</AddressBox>

              <LuckyList>
                {selectedPin.items.map((p) => (
                  <LuckyItem key={p.id}>
                    <LuckyTime>{formatKoreanDateTime(p.createdAt)}</LuckyTime>
                    <LuckyTitle>{p.title}</LuckyTitle>
                    <LuckyAuthor>작성자: {p.author}</LuckyAuthor>
                  </LuckyItem>
                ))}
              </LuckyList>
            </LuckyBody>
            <LuckyFooter />
          </LuckyPanel>
        )}
        
      </Panel>
      {/* 하단 네비 */}
      <BottomNav top={710} left={24} />
    </Root>
  );
}

/* ================= styles ================= */

const Root = styled.div`
  background: #ffffff;
  width: 375px;
  height: 812px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  * {
    box-sizing: border-box;
  }
`;

const OuterFrame = styled.div`
  background: #acdb68;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid rgba(74, 103, 32, 0.5);
  width: 375px;
  height: 812px;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: inset 0px 5px 5px 0px rgba(208, 250, 148, 1),
    inset 0px -8px 15px 0px rgba(208, 250, 148, 0.5),
    inset 0px -4px 4px 0px rgba(140, 188, 71, 1),
    inset 4px 0px 6px 0px rgba(140, 188, 71, 0.5),
    inset -4px 0px 6px 0px rgba(140, 188, 71, 0.5);
`;

const BgImg = styled.img`
  width: 371px;
  height: 761px;
  position: absolute;
  left: 2px;
  top: 50px;
  object-fit: cover;
 
`;

const InnerBorder = styled.div`
  border-radius: 10px;
  border: 0.5px solid #000000;
  width: 375px;
  height: 812px;
  position: absolute;
  left: 0;
  top: 0;
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

const UnionImg = styled.img`
  width: 331px;
  height: 645px;
  position: absolute;
  left: 10px;
  top: 33px;
  opacity: 0.25;
`;

const GuideText = styled.div`
  color: #304909;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
  left: 16px;
  top: 10px;
`;

const MapFrame = styled.div`
  position: absolute;
  left: 10px;
  top: 33px;
  width: 331px;
  height: 581px;
  border-radius: 10px;
  overflow: hidden;

  /* leaflet 내부 기본 배경 */
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

/* 상단 공통 */
const TopLeftProfile = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  top: 9px;
  object-fit: cover;
`;

const Brand = styled.div`
  color: #000000;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 800;
  font-style: italic;
  position: absolute;
  left: 48px;
  top: 13px;
`;

const UserIcon = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 18px;
  top: 62px;
  object-fit: cover;
`;

const UserName = styled.div`
  color: #000000;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  left: 69px;
  top: 60px;
`;

/* 핀 클릭 패널 */
const LuckyPanel = styled.div`
  position: absolute;
  left: 56px;
  top: 220px;
  width: 215px;
  height: 351px;
  background: #9bb5c5;
  padding: 2px 0;
  z-index: 999;
`;

const LuckyHeader = styled.div`
  position: absolute;
  left: 2px;
  top: 2px;
  width: 211px;
  height: 12px;
  background: linear-gradient(
    90deg,
    rgba(75, 118, 144, 1) 0%,
    rgba(3, 4, 126, 1) 100%
  );
`;

const LuckyHeaderTitle = styled.div`
  position: absolute;
  right: 16px;
  top: 0px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
`;

const LuckyCloseBtn = styled.button`
  position: absolute;
  right: 4px;
  top: -2px;
  height: 16px;
  width: 18px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
`;

const LuckyBody = styled.div`
  position: absolute;
  left: 2px;
  top: 28px;
  width: 211px;
  height: 305px;
  background: #fff;
  border-radius: 5px;
  border: 0.59px solid #60504a;
  overflow: hidden;
`;

const AddressBox = styled.div`
  background: #e4e6f5;
  border-bottom: 1px dashed #9bb5c5;
  padding: 6px 10px;
  font-size: 11px;
  line-height: 1.2;
`;

const LuckyList = styled.div`
  padding: 10px;
`;

const LuckyItem = styled.div`
  position: relative;
  padding: 6px 0 8px 0;
`;

const LuckyTime = styled.div`
  color: #727272;
  font-size: 10px;
`;

const LuckyTitle = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const LuckyAuthor = styled.div`
  margin-top: 6px;
  color: #727272;
  font-size: 10px;
  text-align: right;
`;

const Divider = styled.div`
  height: 1px;
  background: #ddd;
  margin: 10px 0;
`;

const LuckyFooter = styled.div`
  position: absolute;
  left: 2px;
  bottom: 3px;
  width: 195px;
  height: 14px;
  background: #9bb5c5;
  box-shadow: inset 1px 1px 1px rgba(0,0,0,0.25),
    1px 1px 1px rgba(255,255,255,0.25);
`;
