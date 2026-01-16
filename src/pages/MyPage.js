import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import BottomNav from "../components/common/BottomNav";
import { setUser } from "../modules/auth";
import { useNavigate } from "react-router-dom";
import {
  updateUserIntro,
  updateUserPassword,
  verifyPassword,      
  deleteUser         
} from "../mock/mockUserDB";

// assets
import bg254 from "../assets/Rectangle-254.png";
import unionSvg from "../assets/Union.png";
import group169 from "../assets/Group-169.png";
import group157 from "../assets/group-157.png";
import profileImg from "../assets/logo.png";
import rect307 from "../assets/Rectangle-307.png";
import rect308 from "../assets/Rectangle-308.png";
import rect308_1 from "../assets/Rectangle-308 1.png";
import settingFilled from "../assets/setting-filled.png";
import cancelIcon from "../assets/symbols_cancel.png";
import rect311 from "../assets/Rectangle-311.png";


export default function MyPage() {
  const rawUser = useSelector((state) => state.auth?.user);
  const user = rawUser?.found ?? rawUser; // 네가 쓰던 구조 유지
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 패널 상태
  const [openPwd, setOpenPwd] = useState(false);
  const [openIntro, setOpenIntro] = useState(false);

  // 입력값 상태
  const [pwd, setPwd] = useState({ current: "", next: "", next2: "" });
  const [introDraft, setIntroDraft] = useState("");

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [withdrawPwd, setWithdrawPwd] = useState("");


  // user 바뀌면 introDraft 갱신
  useEffect(() => {
    setIntroDraft(user?.intro ?? "");
  }, [user?.intro]);

  // 화면 표시
  const displayName = user?.name || user?.username || user?.id ;
  const introText = user?.intro || "환영합니다.";

    const openWithdrawPanel = () => {
    setOpenPwd(false);
    setOpenIntro(false);
    setOpenWithdraw(true);
  };

  const closeWithdrawPanel = () => {
    setOpenWithdraw(false);
    setWithdrawPwd("");
  };

  // 패널 열기/닫기
  const openPwdPanel = () => {
    setOpenIntro(false);
    setOpenPwd(true);
  };
  const openIntroPanel = () => {
    setOpenPwd(false);
    setOpenIntro(true);
  };
  const closePwdPanel = () => {
    setOpenPwd(false);
    setPwd({ current: "", next: "", next2: "" });
  };
  const closeIntroPanel = () => {
    setOpenIntro(false);
    setIntroDraft(user?.intro ?? ""); // 닫으면 원래 intro로 되돌림
  };

  const onChangePwd = (key) => (e) => {
    setPwd((p) => ({ ...p, [key]: e.target.value }));
  };

  const onSubmitPwd = () => {
  // 1) 목업 유효성
  if (!pwd.current || !pwd.next || !pwd.next2) {
    alert("비밀번호를 모두 입력해주세요.");
    return;
  }
  if (pwd.next !== pwd.next2) {
    alert("새 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  // 2) 목업 비밀번호 변경 처리
  const res = updateUserPassword(user.id, pwd.current, pwd.next);

  if (!res.ok) {
    alert(res.message);
    return;
  }

  // 3) redux user 갱신
  dispatch(setUser(res.user)); // res.user는 기존 user 구조 유지해서 리턴해야 함

  // 4) 완료 처리
  alert("비밀번호 변경(목업) 완료!");
  closePwdPanel();
};


  const onSaveIntro = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    const v = introDraft.trim();
    if (!v) {
      alert("한줄소개를 입력해주세요.");
      return;
    }
    if (v.length > 30) {
      alert("한줄소개는 30자 이내로 입력해주세요.");
      return;
    }
    const res = updateUserIntro(user.id, v);
      if (!res.ok) {
        alert(res.message);
        return;
      }
      dispatch(setUser(res.user)); // ✅ DB 결과로 redux 동기화
      setOpenIntro(false);
      alert("한줄소개 변경 완료!(목업)");
  };

  return (
    <Root>
      <Border />
      <OuterFrame />
      <BgImg src={bg254} alt="" />
      console.log("bg254 =", bg254);

      <Panel>
        <Union src={unionSvg} alt="" />

        <Rect308 src={rect308} alt="" />
        <Rect307 src={rect307} alt="" />

        <IntroText>{introText}</IntroText>

        {/* 설정 아이콘도 비번 패널 토글 */}
        <SettingBtn type="button" onClick={openIntroPanel} aria-label="edit intro">
          <SettingIcon src={settingFilled} alt="" />
        </SettingBtn>

        {/* 비밀번호 변경 / 회원탈퇴 */}
        <PwdBtn type="button" onClick={openPwdPanel}>
          <BtnText>비밀번호 변경</BtnText>
          <BtnArrow src={group169} alt="" />
        </PwdBtn>

        <WithdrawBtn
          type="button"
          onClick={() => {
            if (!user?.id) {
              alert("로그인 정보가 없습니다.");
              return;
            }
            openWithdrawPanel();
          }}
        >
          <BtnText2>회원탈퇴</BtnText2>
          <BtnArrow2 src={group169} alt="" />
        </WithdrawBtn>

        {/* ✅ 하단 네비게이션 4개: home/map/friend/mypage */}
        <BottomNav />

        {/* 비밀번호 패널 */}
        {openPwd && (
          <PwdPanel>
            <PanelBg />
            <PanelTopBar src={rect308_1} alt="" />
            <PanelTitle>비밀번호 변경</PanelTitle>

            <PanelClose type="button" onClick={closePwdPanel} aria-label="close">
              <PanelCloseImg src={cancelIcon} alt="" />
            </PanelClose>

            <PanelFrameSvg src={rect311} alt="" />

            <SettingText>+설정+</SettingText>

            <PanelLabel1>현재 비밀번호 :</PanelLabel1>
            <PanelLabel2>새 비밀번호 :</PanelLabel2>
            <PanelLabel3>새 비밀번호 확인 :</PanelLabel3>

            <Input1 type="password" value={pwd.current} onChange={onChangePwd("current")} />
            <Input2 type="password" value={pwd.next} onChange={onChangePwd("next")} />
            <Input3 type="password" value={pwd.next2} onChange={onChangePwd("next2")} />

            <SubmitBtn type="button" onClick={onSubmitPwd}>
              변경하기
            </SubmitBtn>
          </PwdPanel>
        )}
        {/* ✅ 한줄소개 패널 */}
        {openIntro && (
          <PwdPanel>
            <PanelBg />
            <PanelTopBar src={rect308_1} alt="" />
            <PanelTitle>한줄소개 변경</PanelTitle>

            <PanelClose type="button" onClick={closeIntroPanel} aria-label="close">
              <PanelCloseImg src={cancelIcon} alt="" />
            </PanelClose>

            <PanelFrameSvg src={rect311} alt="" />
            <SettingText>+설정+</SettingText>

            <PanelLabel2>한줄소개 :</PanelLabel2>

            <Input2
              type="text"
              value={introDraft}
              onChange={(e) => setIntroDraft(e.target.value)}
              maxLength={30}
            />

            <SubmitBtn type="button" onClick={onSaveIntro}>
              저장하기
            </SubmitBtn>
          </PwdPanel>
        )}
        {openWithdraw && (
          <PwdPanel>
            <PanelBg />
            <PanelTopBar src={rect308_1} alt="" />
            <PanelTitle>회원탈퇴</PanelTitle>

            <PanelClose type="button" onClick={closeWithdrawPanel} aria-label="close">
              <PanelCloseImg src={cancelIcon} alt="" />
            </PanelClose>

            <PanelFrameSvg src={rect311} alt="" />
            <SettingText>+설정+</SettingText>

            <PanelLabel2>현재 비밀번호 :</PanelLabel2>

            <Input2
              type="password"
              value={withdrawPwd}
              onChange={(e) => setWithdrawPwd(e.target.value)}
            />

            <SubmitBtn
              type="button"
              onClick={() => {
                if (!withdrawPwd) {
                  alert("비밀번호를 입력해주세요.");
                  return;
                }
                const v = verifyPassword(user.id, withdrawPwd);
                if (!v.ok) { alert(v.message); return; }    

                const ok = window.confirm("정말 탈퇴하시겠어요? (목업)");
                if (!ok) return;

                const res = deleteUser(user.id);
                if (!res.ok) {
                  alert(res.message);
                  return;
                }

                dispatch(setUser(null));
                alert("회원탈퇴 완료(목업).");
                navigate("/login");
              }}
            >
              탈퇴하기
            </SubmitBtn>
          </PwdPanel>
        )}
      </Panel>

      {/* 상단 프로필/브랜드/유저 표시 */}
      <TopLeftProfile src={profileImg} alt="" />
      <Brand>LUCKYVICKY</Brand>

      <UserIcon src={group157} alt="" />
      <UserName>{displayName}</UserName>
    </Root>
  );
}

/* ===== styles ===== (기존 스타일 + Nav 추가) */

const Root = styled.div`
  background: #ffffff;
  height: 812px;
  width: 375px;
  position: relative;
  overflow: hidden;

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
  border-radius: 10px 10px 10px 10px;
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

const BgImg = styled.img`
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
  height: 733px;
  position: absolute;
  left: 13px;
  top: 63px;
  overflow: hidden;

`;

const Union = styled.img`
  width: 331px;
  height: 575px;
  position: absolute;
  left: 10px;
  top: 144px;
`;

const Rect308 = styled.img`
  width: 149px;
  height: 30px;
  position: absolute;
  left: 182px;
  top: 23px;
  object-fit: cover;
`;

const Rect307 = styled.img`
  width: 331px;
  height: 121px;
  position: absolute;
  left: 10px;
  top: 15px;
  object-fit: cover;
`;

const IntroText = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 300;
  position: absolute;
  left: 35px;
  top: 86px;
`;

const SettingBtn = styled.button`
  position: absolute;
  right: 6.29%;
  top: 82px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const SettingIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const PwdBtn = styled.button`
  background: #acdb68;
  border-radius: 10px;
  border: 1px solid #acdb68;
  width: 273px;
  height: 58px;
  position: absolute;
  left: 39px;
  top: 170px;
  box-shadow: inset 2px 2px 3px 0px rgba(255, 255, 255, 0.75),
    1px 1px 1px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const WithdrawBtn = styled.button`
  background: #acdb68;
  border-radius: 10px;
  border: 1px solid #acdb68;
  width: 273px;
  height: 58px;
  position: absolute;
  left: 39px;
  top: 241px;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5),
    inset 2px 2px 3px 0px rgba(255, 255, 255, 0.75);
  cursor: pointer;
`;

const BtnText = styled.div`
  color: #ffffff;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  letter-spacing: -0.05em;
  font-weight: 400;
  position: absolute;
  left: 14px;
  top: 16px;
`;

const BtnText2 = styled(BtnText)``;

const BtnArrow = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  left: 242px;
  top: 22px;
  object-fit: cover;
`;

const BtnArrow2 = styled(BtnArrow)``;

/* 비번 패널 */
const PwdPanel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const PanelBg = styled.div`
  background: #c0c0c0;
  width: 301px;
  height: 191px;
  position: absolute;
  left: 22px;
  top: 323px;
  box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, 0.75),
    inset -1px -1px 0px 0px rgba(0, 0, 0, 0.5), 0px 0px 0px 1px rgba(0, 0, 0, 1),
    -0.5px -0.5px 0px 0.5px rgba(192, 192, 192, 1);
`;

const PanelTopBar = styled.img`
  width: 299px;
  height: 21px;
  position: absolute;
  left: 23px;
  top: 324px;
  object-fit: cover;
`;

const PanelTitle = styled.div`
  color: #ffffff;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: -0.05em;
  font-weight: 600;
  position: absolute;
  left: 26.86px;
  top: 327px;
  width: 140.87px;
`;

const PanelClose = styled.button`
  width: 20px;
  height: 12px;
  position: absolute;
  left: 298px;
  top: 328px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const PanelCloseImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PanelFrameSvg = styled.img`
  width: 272px;
  height: 104px;
  position: absolute;
  left: 37px;
  top: 355px;
`;

const SettingText = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: 0.25em;
  font-weight: 300;
  position: absolute;
  left: 54px;
  top: 349px;

  white-space: nowrap;
  word-break: keep-all;
`;

const PanelLabelBase = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: -0.005em;
  font-weight: 300;
  position: absolute;
  left: 49px;

  white-space: nowrap;
  word-break: keep-all;
`;

const PanelLabel1 = styled(PanelLabelBase)`
  top: 370px;

  white-space: nowrap;
  word-break: keep-all;
`;
const PanelLabel2 = styled(PanelLabelBase)`
  top: 402px;

  white-space: nowrap;
  word-break: keep-all;
`;
const PanelLabel3 = styled(PanelLabelBase)`
  top: 433px;

  white-space: nowrap;
  word-break: keep-all;
`;

const InputBase = styled.input`
  background: #ffffff;
  width: 157px;
  height: 22px;
  position: absolute;
  left: 141px;

  box-shadow: inset 1px 1px 0px 0px rgba(0, 0, 0, 0.75),
    inset -1px -1px 0px 0px rgba(192, 192, 192, 1),
    0px 0px 0px 1px rgba(255, 255, 255, 1),
    -0.5px -0.5px 0px 0.5px rgba(0, 0, 0, 0.5);

  border: none;
  outline: none;
  padding: 0 8px;
  font-size: 11px;
`;

const Input1 = styled(InputBase)`
  top: 366px;
`;
const Input2 = styled(InputBase)`
  top: 398px;
`;
const Input3 = styled(InputBase)`
  top: 429px;
`;

const SubmitBtn = styled.button`
  background: #c0c0c0;
  width: 249px;
  height: 30px;
  position: absolute;
  left: 49px;
  top: 472px;

  box-shadow: inset -1px -1px 0px 0px rgba(0, 0, 0, 0.5),
    0px 0px 0px 1px rgba(0, 0, 0, 1),
    -0.5px -0.5px 0px 0.5px rgba(255, 255, 255, 1);

  border: none;
  cursor: pointer;

  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: -0.05em;
`;

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
  text-align: left;
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
  left: 47px;
  top: 98px;
  object-fit: cover;
`;

const UserName = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  left: 97.41px;
  top: 101.41px;
`;

const IntroPanel = styled.div`
  position: absolute;
  left: 22px;
  top: 140px;
  width: 301px;
  padding: 12px;
  background: #ffffff;
  z-index: 10;
`;

const IntroEditLabel = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`;

const IntroEditInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

const IntroSaveBtn = styled.button`
  margin-top: 8px;
  width: 100%;
  height: 32px;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;