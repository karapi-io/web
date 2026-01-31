import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import KarapiLoader from "./KarapiLoader";

export default function AuthGate() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <KarapiLoader variant="invoice" message="Loading..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}
