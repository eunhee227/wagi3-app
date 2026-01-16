import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../modules/auth";
import BottomNav from "../components/common/BottomNav";

export default function MapPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      Map<br />
      user: {user ? `${user.name} (${user.id})` : "none"}
      <br />
      <button
        onClick={() => {
          dispatch(setUser(null)); // ✅ localStorage도 subscribe에서 같이 삭제됨
          navigate("/login");
        }}
      >
        로그아웃
      </button>
      <BottomNav />
    </div>
  );
}
