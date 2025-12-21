import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SupportWidget from '../components/supportWidget';

const ToolLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                {/* We skip the flex-grow and Footer here for a focused workspace */}
                <Outlet />
            </main>
            <SupportWidget />
        </div>
    );
};

export default ToolLayout;