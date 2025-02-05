import React from 'react';
import SideBar from '../../../Components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='bg-gradient-to-tr from-cyan-50 via-cyan-100 to-cyan-50 dark:bg-gradient-to-br dark:from-[#111827] dark:via-[#111827]/80 dark:to-[#111827] py-6 overflow-x-hidden'>
            <div className='container mx-auto flex flex-col xl:flex-row gap-10'>
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;