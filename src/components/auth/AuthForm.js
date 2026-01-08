import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setField, setUser } from "../../modules/auth";

import signupImg from "../../assets/group-156.png"; 
import loginImg from "../../assets/group-158.png";  

/**
 * 로그인 폼
 */

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const Label = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  letter-spacing: -0.1em;
  font-weight: 200;
  position: absolute;
`;

const IdLabel = styled(Label)`
  left: 37px;
  top: 512px;
  width: 88px;
  height: 30px;
`;

const PwLabel = styled(Label)`
  left: 37px;
  top: 560px;
  width: 85px;
  height: 30px;
`;

const Hint = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  letter-spacing: -0.05em;
  font-weight: 200;
  position: absolute;
  left: 31px;
  top: 772px;

  white-space: nowrap;
  word-break: keep-all;
`;

const Input = styled.input`
  background: #ffffff;
  border-radius: 1px;
  border: 2px solid rgba(200, 200, 200, 1);
  width: 186px;
  height: 31px;
  position: absolute;
  left: 152px;
  box-shadow: inset 1px 1px 0px 1px rgba(0, 0, 0, 0.5);
  padding: 0 8px;
  outline: none;

  font-family: "Inter", sans-serif;
  font-size: 14px;

  ${(p) => p.error && `border-color:#A9383A;`}
`;

const IdInput = styled(Input)`
  top: 512px;
`;

const PwInput = styled(Input)`
  top: 560px;
`;

const SaveBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  -webkit-appearance: none;

  background: #ffffff;
  border-radius: 1px;
  border: 2px solid rgba(200, 200, 200, 1);
  width: 18px;
  height: 18px;
  position: absolute;
  left: 224px;
  top: 621px;
  box-shadow: inset 1px 1px 0px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:checked {
    background: #acdb68;
  }
`;

const SaveText = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  letter-spacing: -0.1em;
  font-weight: 200;
  position: absolute;
  left: 251px;
  top: 615px;

  white-space: nowrap;
  word-break: keep-all;
`;

const Line1 = styled.div`
  margin-top: -1px;
  border-top: 2px solid #aeaca0;
  width: 362px;
  height: 0px;
  position: absolute;
  left: 7px;
  top: 664px;
  box-shadow: 0px 2px 2px 0px rgba(255, 255, 255, 1);
`;

const Line2 = styled.div`
  margin-top: -1px;
  border-top: 2px solid #aeaca0;
  width: 362px;
  height: 0px;
  position: absolute;
  left: 7px;
  top: 766px;
  box-shadow: 0px 2px 2px 0px rgba(255, 255, 255, 1);
`;

/** 신규가입 버튼 블록(div4) */
const SignupBlock = styled.button`
  width: 68px;
  height: 63px;
  position: absolute;
  left: 21px;
  top: 684px;

  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const SignupText = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  letter-spacing: -0.1em;
  font-weight: 400;
  position: absolute;
  left: 0px;
  top: 39px;
`;

const SignupImage = styled.img`
  width: 60px;
  height: 40px;
  position: absolute;
  left: 5px;
  top: 0px;
  object-fit: cover;
`;

/** 접속 버튼 블록(div6) */
const LoginBlock = styled.button`
  width: 68px;
  height: 63px;
  position: absolute;
  left: 279px;
  top: 684px;

  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const LoginText = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  letter-spacing: -0.1em;
  font-weight: 400;
  position: absolute;
  left: 16px;
  top: 39px;
`;

const LoginImage = styled.img`
  width: 68px;
  height: 48px;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
`;

const ErrorText = styled.div`
  position: absolute;
  left: 127px;
  top: 597px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #A9383A;

  white-space: nowrap;
  word-break: keep-all;
`;

export default function AuthForm({onSignupClick}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginForm = useSelector((state) => state.auth?.login) || { id: "", password: "" };

  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({ id: false, password: false });

  const onChange = (key) => (e) => {
    dispatch(setField({ form: "login", key, value: e.target.value }));
    setError("");
    setFieldError({ id: false, password: false });
  };

  const mockLogin = () => {
    const id = (loginForm.id || "").trim();
    const password = loginForm.password || "";

    // 필수값 체크
    if (!id || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      setFieldError({ id: !id, password: !password });
      return;
    }

    // 목업 유저 데이터
    const mockUserDB = [
      { id: "test", password: "123456", name: "테스트유저" },
      { id: "yl", password: "123456", name: "YL" },
    ];

    const found = mockUserDB.find((u) => u.id === id && u.password === password);

    if (!found) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      setFieldError({ id: true, password: true });
      return;
    }

    // ✅ 성공: user 상태 저장 + home 이동
    dispatch(setUser({ id: found.id, name: found.name }));
    navigate("/home");
  };

  return (
    <Wrap>
      <IdLabel>이용자 ID</IdLabel>
      <PwLabel>비밀번호</PwLabel>

      <IdInput
        value={loginForm.id}
        onChange={onChange("id")}
        error={fieldError.id}
        placeholder=""
      />
      <PwInput
        type="password"
        value={loginForm.password}
        onChange={onChange("password")}
        error={fieldError.password}
        placeholder=""
      />
      {error && <ErrorText>{error}</ErrorText>}

      <SaveBox />
      <SaveText>암호저장</SaveText>

      <Line1 />
      <Line2 />

      <SignupBlock type="button" onClick={() => onSignupClick?.()}>
        <SignupText>신규가입</SignupText>
        <SignupImage src={signupImg} alt="" />
      </SignupBlock>

      <LoginBlock type="button" onClick={mockLogin}>
        <LoginText>접속</LoginText>
        <LoginImage src={loginImg} alt="" />
      </LoginBlock>

      <Hint>아이디와 비밀번호를 입력하세요~</Hint>
    </Wrap>
  );
}
