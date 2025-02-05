import React from 'react';

const AllCampaignSkeleton = ({ rows }) => {
    return (
        Array(rows).fill(0).map((_, i) => (
            <tr key={i} className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950 animate-pulse">
                <th scope="row" className="flex items-center px-6 py-4">
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                    <div className="ps-3">
                        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
                    </div>
                </th>

                <td className="px-6 py-4">
                    <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </td>

                <td className="px-6 py-4">
                    <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gray-400 dark:bg-gray-600 w-2/3"></div>
                    </div>
                </td>

                <td>
                    <div className='flex items-center justify-around'>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </td>
            </tr>
        ))

    );
};

export default AllCampaignSkeleton;
