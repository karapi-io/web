import LandingPage from "../pages/LandingPage";
import MainLayout from "../layouts/MainLayout";
import WorkspaceLayout from "../invoice-workflow/layouts/WorkspaceLayout";
import DashboardPage from "../invoice-workflow/pages/DashboardPage";
import KarapiLoader from "./KarapiLoader";
import { useAuth } from "../hook/useAuth";

export default function RootRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <KarapiLoader variant="minimal" message="Loading..." />;
    }

    if (isAuthenticated) {
        return (
            <WorkspaceLayout>
                <DashboardPage />
            </WorkspaceLayout>
        );
    }

    return (
        <MainLayout>
            <LandingPage />
        </MainLayout>
    );
}
