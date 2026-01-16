import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { isDuplicatedId, addUser } from "../../mock/mockUserDB";
import { setUser } from "../../modules/auth"; // 등록 후 바로 로그인 처리


import logo from "../../assets/logo.png";
import cancelImg from "../../assets/cancel.png";
import group157 from "../../assets/group-157.png";
import bgImage from "../../assets/rectangle-253.png";
import arrow from "../../assets/arrow-up-bold.png";
import { setField, resetForm } from "../../modules/auth";

/**
 * 신규가입 창(모달/패널)
 */


export default function SignupModal({onClose, onCheckDuplicate, onSubmit,}) {
  const [idCheckResult, setIdCheckResult] = useState(null);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const dispatch = useDispatch();
  const form =
  useSelector((state) => state.auth?.register) ?? {
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    intro: "",
  };
  const [submitResult, setSubmitResult] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [checkedId, setCheckedId] = useState(""); 
  const navigate = useNavigate();
  const currentId = (form.id || "").trim();
  const isIdCheckOK = idCheckResult === "ok" && checkedId === currentId;


  const onChange = (key) => (e) => {
    dispatch(setField({ form: "register", key, value: e.target.value }));
  };

  const validateRegisterForm = () => {
    const id = (form.id || "").trim();
    const email = (form.email || "").trim();
    const pw = form.password || "";
    const pw2 = form.passwordConfirm || "";
    const intro = (form.intro || "").trim();

    // 중복확인 여부
    if (!isIdCheckOK) {
      return { ok: false, message: "아이디 중복확인을 먼저 해주세요." };
    }

    // 필수값
    if (!id) return { ok: false, message: "아이디를 입력해주세요." };
    if (!email) return { ok: false, message: "이메일을 입력해주세요." };
    if (!pw) return { ok: false, message: "비밀번호를 입력해주세요." };
    if (!pw2) return { ok: false, message: "비밀번호 확인을 입력해주세요." };

    // 이메일 형식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { ok: false, message: "이메일 형식이 올바르지 않습니다." };
    }

    // 비밀번호 정책
    if (pw.length < 6) {
      return { ok: false, message: "비밀번호는 6자 이상이어야 합니다." };
    }

    // 비밀번호 확인
    if (pw !== pw2) {
      return { ok: false, message: "비밀번호가 일치하지 않습니다." };
    }

    // 한줄소개(선택)
    if (intro.length > 30) {
      return { ok: false, message: "한줄소개는 30자 이내로 입력해주세요." };
    }

    return { ok: true };
  };

  return (
    <Root>
      <OuterFrame />
      <InnerFrame />
      <Border />

      <LogoImg src={logo} alt="" />
      <TopTitle>신규가입</TopTitle>

      <CancelBtn type="button" onClick={() => onClose?.()}>
        <CancelImg src={cancelImg} alt="close" />
      </CancelBtn>

      <Group157Img src={group157} alt="" />
      <SectionTitle>가입자 정보</SectionTitle>

      <Arrow135 src={arrow} alt="" />
      <Arrow182 src={arrow} alt="" />
      <Arrow229 src={arrow} alt="" />
      <Arrow276 src={arrow} alt="" />
      <Arrow347 src={arrow} alt="" />

      <Line1 />
      <Line2 />
      <Line3 />
      <Line4 />

      <IdLabel>아이디:</IdLabel>
      <IdInput value={form.id} onChange={ (e) => { 
        onChange("id")(e); 
        setIdCheckResult(null);
        setIdCheckMessage("");
        setCheckedId("");

        setSubmitResult(null);
        setSubmitMessage("");
        }} />

      <EmailLabel>이메일:</EmailLabel>
      <EmailInput value={form.email} onChange={(e) => {
        onChange("email")(e);
        setSubmitResult(null);
        setSubmitMessage("");
        }} />

      <PwLabel>비밀번호:</PwLabel>
      <PwInput type="password" value={form.password} onChange={(e) => {
          onChange("password")(e);
          setSubmitResult(null);
          setSubmitMessage("");
        }} />

      <Pw2Label>비밀번호 확인:</Pw2Label>
      <Pw2Input
        type="password"
        value={form.passwordConfirm}
        onChange={(e) => {
          onChange("passwordConfirm")(e);
          setSubmitResult(null);
          setSubmitMessage("");
        }}
      />

      <IntroLabel>한줄소개:</IntroLabel>
      <IntroInput value={form.intro} onChange={(e) => {
          onChange("intro")(e);
          setSubmitResult(null);
          setSubmitMessage("");
        }} />

      <CheckDupBtn 
      type="button" 
      onClick={() => {
        const id = (form.id || "").trim();
        if (!id) {
          setIdCheckResult("fail");
          setIdCheckMessage("아이디를 입력해주세요.");
          setCheckedId("");
          return;
        }

        if (isDuplicatedId(id)) {            // ⬅️ 아래 에러2도 같이 해결
          setIdCheckResult("fail");
          setIdCheckMessage("사용 할 수 없는 아이디 입니다.");
          setCheckedId("");
        } else {
          setIdCheckResult("ok");
          setIdCheckMessage("사용 가능한 아이디 입니다.");
          setCheckedId(id);
    }
      }}>
        중복확인
      </CheckDupBtn>

      {idCheckResult && (
        <CheckResultText result={idCheckResult}>
          {idCheckMessage}
        </CheckResultText>
      )}
      {submitResult && (
        <SubmitResultText result={submitResult}>
          {submitMessage}
        </SubmitResultText>
      )}

      <SubmitBtn
        type="button"
        disabled={! isIdCheckOK}
        onClick={() => {
          // 이전 결과 초기화
          setSubmitResult(null);
          setSubmitMessage("");

          const v = validateRegisterForm();
          if (!v.ok) {
            setSubmitResult("fail");
            setSubmitMessage(v.message);
            return;
          }

          const newUser = {
            id: form.id.trim(),
            password: form.password,
            name: form.id.trim(),          // name = id (원하면 입력칸 추가)
            intro: (form.intro || "").trim() || "환영합니다.",
          };

          const res = addUser(newUser);
          if (!res.ok) {
            setSubmitResult("fail");
            setSubmitMessage(res.message);
            return;
          }

          setSubmitResult("ok");
          setSubmitMessage("등록 완료!");

          // ✅ (선택) 가입하자마자 로그인 상태로 만들기
          dispatch(setUser(newUser));
          navigate("/login");
        }}
      >
        등록
      </SubmitBtn>
    </Root>
  );
}

// 스타일 블럭들 css
const Root = styled.div`
  background: #ffffff;
  width: 375px;
  height: 505px;
  position: relative;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
`;

const OuterFrame = styled.div`
  background: #acdb68;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid rgba(74, 103, 32, 0.5);
  width: 375px;
  height: 505px;
  position: absolute;
  left: 0px;
  top: 0px;
  box-shadow: inset 0px 5px 5px 0px rgba(208, 250, 148, 1),
    inset 0px -8px 15px 0px rgba(208, 250, 148, 0.5),
    inset 0px -4px 4px 0px rgba(140, 188, 71, 1),
    inset 4px 0px 6px 0px rgba(140, 188, 71, 0.5),
    inset -4px 0px 6px 0px rgba(140, 188, 71, 0.5);
`;

const InnerFrame = styled.div`
  width: 375px;
  height: 457px;
  position: absolute;
  left: 0px;
  top: 48px;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;      /* 이미지 꽉 차게 */
  background-position: center; /* 중앙 정렬 */

  border: 1px solid #4a6720;

  box-shadow: inset -4px 0px 6px 0px rgba(170, 170, 170, 0.5),
    inset 4px 0px 6px 0px rgba(170, 170, 170, 0.5);
`;

const Border = styled.div`
  border-radius: 10px;
  border: 0.5px solid #000000;
  width: 375px;
  height: 505px;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const TopTitle = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 800;
  font-style: italic;
  position: absolute;
  left: 50px;
  top: 14px;
`;

const SectionTitle = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  left: 69px;
  top: 65px;
`;

const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  top: 9px;
  object-fit: cover;
`;

const Group157Img = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 18px;
  top: 61px;
  object-fit: cover;
`;

const CancelBtn = styled.button`
  position: absolute;
  right: 2.4%;
  top: 10px;

  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CancelImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled.img`
  border-radius: 100px;
  width: 21px;
  height: 21px;
  position: absolute;
  left: 41px;
  transform: translate(-21px, 0px);
  overflow: visible;
`;

// 원본에 mdi-arrow-up-bold가 여러 개라 위치만 다르게 분리
const Arrow135 = styled(Arrow)`
  top: 135px;
`;
const Arrow182 = styled(Arrow)`
  top: 182px;
`;
const Arrow229 = styled(Arrow)`
  top: 229px;
`;
const Arrow276 = styled(Arrow)`
  top: 276px;
`;
const Arrow347 = styled(Arrow)`
  top: 347px;
`;

const Line = styled.div`
  margin-top: -2px;
  border-top: 2px solid #aeaca0;
  width: 362px;
  height: 0px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* translate 대신 안전하게 */
  box-shadow: 0px 2px 2px 0px rgba(255, 255, 255, 1);
`;

const Line1 = styled(Line)`
  top: calc(50% - 296.5px);
`;
const Line2 = styled(Line)`
  top: calc(50% - 142.5px);
`;
const Line3 = styled(Line)`
  top: calc(50% + 77.5px);
`;
const Line4 = styled(Line)`
  top: calc(50% + 193.5px);
`;

const FieldLabel = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  letter-spacing: -0.1em;
  font-weight: 300;
  position: absolute;
`;

const IdLabel = styled(FieldLabel)`
  left: 48px;
  top: 134px;
  width: 91px;
  height: 31px;
`;
const EmailLabel = styled(FieldLabel)`
  left: 48px;
  top: 182px;
  width: 91px;
  height: 31px;
`;
const PwLabel = styled(FieldLabel)`
  left: 48px;
  top: 229px;
  width: 120px;
  height: 31px;
`;
const Pw2Label = styled(FieldLabel)`
  left: 48px;
  top: 277px;
  width: 120px;
  height: 31px;
`;
const IntroLabel = styled(FieldLabel)`
  left: 48px;
  top: 347px;
  width: 120px;
  height: 31px;
`;

const BoxInput = styled.input`
  background: #ffffff;
  border-radius: 1px;
  border: 2px solid rgba(200, 200, 200, 1);
  width: 177px;
  height: 38px;
  position: absolute;
  left: 178px;
  box-shadow: inset 1px 1px 0px 1px rgba(0, 0, 0, 0.5);

  padding: 0 10px;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
`;

const IdInput = styled(BoxInput)`
  top: 129px;
`;

const EmailInput = styled(BoxInput)`
  top: 175px;
`;

const PwInput = styled(BoxInput)`
  top: 221px;
`;

const Pw2Input = styled(BoxInput)`
  top: 267px;
`;

const IntroInput = styled.input`
  background: #ffffff;
  border-radius: 1px;
  border: 2px solid rgba(200, 200, 200, 1);
  width: 336px;
  height: 38px;
  position: absolute;
  left: 19px;
  top: 385px;
  box-shadow: inset 1px 1px 0px 1px rgba(0, 0, 0, 0.5);

  padding: 0 10px;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
`;

const ButtonBase = styled.button`
  background: #ffffff;
  border-radius: 5px;
  border: 2px solid #aeaca0;
  height: 38px;
  position: absolute;
  top: 455px;
  cursor: pointer;

  box-shadow: inset 0px -8px 15px 0px rgba(0, 0, 0, 0.25),
    inset 0px -5px 2px 0px rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #000;
`;

const CheckDupBtn = styled(ButtonBase)`
  width: 107px;
  left: 17px;
`;

const SubmitBtn = styled(ButtonBase)`
  width: 70px;
  left: 286px;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

`;

const CheckResultText = styled.div`
  position: absolute;
  left: 130px;
  top: 473px;

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.02em;

  color: ${(props) =>
    (props.result === "ok" ? "#005DBA" : "#A9383A")
  }
`;

const SubmitResultText = styled.div`
  position: absolute;
  left: 140px;  
  top: 455px;  

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;

  color: ${(props) =>
    props.result === "ok" ? "#005DBA" : "#A9383A"};
`;