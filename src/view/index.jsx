import { useContext, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContex";
import { checkAuth } from "../auth/auth";

export default function PostIndex() {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      checkAuth();
      if (!isLogin) {
          navigate("/login");
        }
  }, [isLogin]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">HALAMAN POSTS INDEX</div>
          </div>
        </div>
      </div>
    </div>
  );
}


