import { useNavigate } from "react-router-dom";
import SignupModal from "../components/auth/SignupModal";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <SignupModal
      onClose={() => navigate(-1)}   // 이전 페이지로
      onCheckDuplicate={() => {}}
      onSubmit={() => {}}
    />
  );
};

export default RegisterPage;
