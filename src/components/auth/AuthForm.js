import styled from "styled-components";
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

export default function AuthForm({onSignupClick}) {
  return (
    <Wrap>
      <IdLabel>이용자 ID</IdLabel>
      <PwLabel>비밀번호</PwLabel>

      <IdInput />
      <PwInput type="password" />

      <SaveBox />
      <SaveText>암호저장</SaveText>

      <Line1 />
      <Line2 />

      <SignupBlock type="button" onClick={() => onSignupClick?.()}>
        <SignupText>신규가입</SignupText>
        <SignupImage src={signupImg} alt="" />
      </SignupBlock>

      <LoginBlock type="button" onClick={() => {}}>
        <LoginText>접속</LoginText>
        <LoginImage src={loginImg} alt="" />
      </LoginBlock>

      <Hint>아이디와 비밀번호를 입력하세요~</Hint>
    </Wrap>
  );
}
