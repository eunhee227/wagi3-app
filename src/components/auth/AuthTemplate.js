import styled from "styled-components";
import AuthForm from "./AuthForm";
import logoback from "../../assets/logoback.png"; 

/**
 * 로그인 페이지 레이아웃
 */

const Page = styled.div`
  background: #ffffff;
  height: 812px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

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
  left: 0px;
  top: 0px;
  box-shadow: inset 0px 5px 5px 0px rgba(208, 250, 148, 1),
    inset 0px -8px 15px 0px rgba(208, 250, 148, 0.5),
    inset 0px -4px 4px 0px rgba(140, 188, 71, 1),
    inset 4px 0px 6px 0px rgba(140, 188, 71, 0.5),
    inset -4px 0px 6px 0px rgba(140, 188, 71, 0.5);
`;

const InnerFrame = styled.div`
  background: #ece9d9;
  border: 1px solid #4a6720;
  width: 362px;
  height: 756px;
  position: absolute;
  left: 7px;
  top: 48px;
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

const Brand = styled.div`
  color: #000000;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 800;
  font-style: italic;
  position: absolute;
  left: 15px;
  top: 10px;
`;

const PreviewFrame = styled.div`
  border: 1.5px solid #000000;
  width: 343px;
  height: 425px;
  position: absolute;
  left: 16px;
  top: 63px;
  overflow: hidden;
`;

const LogoBackImg = styled.img`
  width: 343px;
  height: 425px;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
`;

export default function AuthTemplate({onSignupClick}) {
  return (
    <Page>
      <OuterFrame />
      <InnerFrame />
      <Border />
      <Brand>LUCKYVICKY</Brand>

      <PreviewFrame>
        <LogoBackImg src={logoback} alt="" />
      </PreviewFrame>

      <AuthForm onSignupClick={onSignupClick}/>
    </Page>
  );
}
