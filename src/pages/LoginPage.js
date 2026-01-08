import AuthTemplate from "../components/auth/AuthTemplate";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
  
    return <AuthTemplate onSignupClick={() => navigate("/register")} />;
  }